/**
 * Cloudflare Worker for nutibarasculpturepark.com
 *
 * Responsibilities:
 *  1. Serve the statically exported Next.js site from the `out/` folder
 *     (assets binding), including clean URLs such as `/es` or `/en/privacy-policy`.
 *  2. Expose a lightweight `/api/weather` endpoint so the page can show live
 *     weather + 7-day forecast without putting any third-party service names
 *     in front of visitors. Results are cached for 15 minutes on the edge.
 *
 * All times are handled in the local timezone of the location shown.
 */

const WEATHER_PARAMS = new URLSearchParams({
  latitude: '6.236384',
  longitude: '-75.5790979',
  current:
    'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,wind_speed_10m',
  daily:
    'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,uv_index_max',
  timezone: 'America/Bogota',
  forecast_days: '7',
  temperature_unit: 'celsius',
  wind_speed_unit: 'kmh',
  precipitation_unit: 'mm',
  alerts: 'true',
});

const WEATHER_SRC = `https://api.open-meteo.com/v1/forecast?${WEATHER_PARAMS.toString()}`;
const CACHE_TTL_MS = 15 * 60 * 1000;

// In-isolate cache (Cloudflare may spin new isolates, this only makes things fresher)
let weatherCache = null;

function mapWeather(payload) {
  const c = payload.current;
  const current = {
    temperature: c.temperature_2m,
    apparentTemperature: c.apparent_temperature,
    humidity: c.relative_humidity_2m,
    windSpeed: c.wind_speed_10m,
    cloudCover: c.cloud_cover,
    precipitation: c.precipitation,
    weatherCode: c.weather_code,
    isDay: c.is_day,
  };

  const daily = payload.daily.time.map((date, i) => ({
    date,
    weatherCode: payload.daily.weather_code[i],
    tMax: payload.daily.temperature_2m_max[i],
    tMin: payload.daily.temperature_2m_min[i],
    precipProb: payload.daily.precipitation_probability_max[i],
    precipSum: payload.daily.precipitation_sum[i],
    windMax: payload.daily.wind_speed_10m_max[i],
    uvIndexMax: payload.daily.uv_index_max[i] ?? 0,
  }));

  const rawAlerts = Array.isArray(payload.alerts) ? payload.alerts : [];
  const alerts = rawAlerts.slice(0, 4).map((alert) => ({
    title: String(alert.event || alert.headline || '').trim(),
    description: String(alert.description || '').trim(),
  }));

  return {
    fetchedAt: new Date().toISOString(),
    location: {
      name: 'Medellín',
      altitudeM: 1500,
      timezone: payload.timezone,
    },
    current,
    daily,
    alerts,
  };
}

async function handleWeather(request) {
  const now = Date.now();
  if (weatherCache && now - weatherCache.at < CACHE_TTL_MS) {
    return json(weatherCache.data, request);
  }

  const upstream = await fetch(WEATHER_SRC, {
    headers: { accept: 'application/json' },
    cf: { cacheTtl: 900, cacheEverything: true },
  });

  if (!upstream.ok) {
    return json(
      { ok: false, message: 'weather_unavailable' },
      request,
      upstream.status || 502
    );
  }

  const payload = await upstream.json();
  const data = mapWeather(payload);
  weatherCache = { at: now, data };

  return json(data, request);
}

function json(data, request, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=900',
      'Access-Control-Allow-Origin': '*',
      Vary: 'Origin',
    },
  });
}

function withCacheHeaders(pathname, response) {
  const headers = new Headers(response.headers);
  if (
    pathname.startsWith('/_next/static/') ||
    pathname.startsWith('/icons/') ||
    pathname.startsWith('/gallery/') ||
    pathname.startsWith('/images/')
  ) {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (pathname === '/manifest.webmanifest') {
    headers.set('Cache-Control', 'public, max-age=3600');
  } else {
    headers.set('Cache-Control', 'no-cache');
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function serveAsset(env, request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  const first = await env.ASSETS.fetch(request);
  if (first && first.status !== 404) {
    return withCacheHeaders(pathname, first);
  }

  // Clean-URL fallback for the exported site:
  //   /en            -> /en.html
  //   /es/           -> /es.html
  //   /en/privacy    -> /en/privacy.html
  const candidates = [];
  const base = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  if (!pathname.endsWith('/') && base !== '') {
    candidates.push(new URL(`${pathname}/`, url.origin));
  }
  if (!/\.\w+$/.test(base) && base !== '') {
    candidates.push(new URL(`${base}.html`, url.origin));
  }

  for (const candidate of candidates) {
    const attempt = await env.ASSETS.fetch(new Request(candidate.toString(), request));
    if (attempt && attempt.status !== 404) {
      return withCacheHeaders(pathname, attempt);
    }
  }

  return first; // 404.html will be handled by the assets binding
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;
    const method = request.method;

    if (method === 'GET' && pathname === '/api/weather') {
      return handleWeather(request);
    }

    // Root always resolves to the English homepage (site default language).
    if (method === 'GET' && pathname === '/') {
      return Response.redirect(new URL('/en/', url.origin), 301);
    }

    return serveAsset(env, request);
  },
};
