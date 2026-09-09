'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

type CurrentWeather = {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  cloudCover: number;
  precipitation: number;
  weatherCode: number;
  isDay: number;
};

type DailyWeather = {
  date: string;
  weatherCode: number;
  tMax: number;
  tMin: number;
  precipProb: number | null;
  precipSum: number;
  windMax: number;
  uvIndexMax: number;
};

type WeatherAlert = {
  title: string;
  description: string;
};

type WeatherPayload = {
  fetchedAt: string;
  current: CurrentWeather;
  daily: DailyWeather[];
  alerts: WeatherAlert[];
};

type WeatherClass =
  | 'clear'
  | 'partly'
  | 'overcast'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'heavy'
  | 'thunder';

type Advice = {
  outfit: string[];
  play: string[];
  gear: string[];
  risk: string[];
};

type Translate = (key: string, values?: Record<string, string | number>) => string;

const CODE_GROUPS = [
  { min: 0, max: 0, icon: '☀️', key: 'clear' },
  { min: 1, max: 2, icon: '⛅', key: 'partly' },
  { min: 3, max: 3, icon: '☁️', key: 'overcast' },
  { min: 45, max: 48, icon: '🌫️', key: 'fog' },
  { min: 51, max: 57, icon: '🌦️', key: 'drizzle' },
  { min: 61, max: 67, icon: '🌧️', key: 'rain' },
  { min: 71, max: 77, icon: '❄️', key: 'snow' },
  { min: 80, max: 82, icon: '🌦️', key: 'shower' },
  { min: 85, max: 86, icon: '🌨️', key: 'snowShower' },
  { min: 95, max: 99, icon: '⛈️', key: 'thunder' },
];

function codeInfo(code: number) {
  return CODE_GROUPS.find((g) => code >= g.min && code <= g.max) || CODE_GROUPS[0];
}

function classify(code: number): WeatherClass {
  if (code >= 95) return 'thunder';
  if ([63, 65, 66, 67, 82].includes(code)) return 'heavy';
  if ([61, 62, 64, 80, 81].includes(code)) return 'rain';
  if (code >= 51 && code <= 57) return 'drizzle';
  if (code >= 45 && code <= 48) return 'fog';
  if (code === 3) return 'overcast';
  if (code >= 1 && code <= 2) return 'partly';
  return 'clear';
}

function uvLevel(uv: number): 'low' | 'moderate' | 'high' | 'veryHigh' {
  if (uv >= 8) return 'veryHigh';
  if (uv >= 6) return 'high';
  if (uv >= 3) return 'moderate';
  return 'low';
}

function buildSourceUrl() {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', '6.236384');
  url.searchParams.set('longitude', '-75.5790979');
  url.searchParams.set(
    'current',
    'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,wind_speed_10m'
  );
  url.searchParams.set(
    'daily',
    'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,uv_index_max'
  );
  url.searchParams.set('timezone', 'America/Bogota');
  url.searchParams.set('forecast_days', '7');
  url.searchParams.set('temperature_unit', 'celsius');
  url.searchParams.set('wind_speed_unit', 'kmh');
  url.searchParams.set('precipitation_unit', 'mm');
  url.searchParams.set('alerts', 'true');
  return url.toString();
}

/** Translates live weather into short, visitor-friendly advice. */
function buildAdvice(w: WeatherPayload, adv: Translate): Advice {
  const result: Advice = { outfit: [], play: [], gear: [], risk: [] };
  const today = w.daily[0];
  if (!today) return result;

  const a = (key: string, values?: Record<string, string | number>) => adv(`advice.${key}`, values);
  const dayClass = classify(today.weatherCode);
  const nowClass = classify(w.current.weatherCode);
  const prob = Math.round(today.precipProb ?? w.current.precipitation ?? 0);
  const wetCode = dayClass === 'rain' || dayClass === 'drizzle' || dayClass === 'heavy' || dayClass === 'thunder';
  const maxT = today.tMax;
  const minT = today.tMin;
  const uv = today.uvIndexMax ?? 0;
  const wind = Math.round(w.current.windSpeed ?? 0);

  // 1) Official alerts have the highest priority and appear first.
  (w.alerts || []).forEach((alert) => {
    const title = alert.title || a('alertGeneric');
    result.risk.push(a('alertRisk', { title }));
  });

  // 2) Severe weather warnings.
  if (dayClass === 'thunder' || nowClass === 'thunder') {
    result.risk.push(a('thunderRisk'));
    result.play.push(a('thunderPlay'));
  } else if (dayClass === 'heavy' || nowClass === 'heavy') {
    result.risk.push(a('heavyRainRisk'));
    result.play.push(a('heavyRainPlay'));
    result.gear.push(a('heavyRainGear'));
  } else if (wetCode) {
    result.outfit.push(a('rainOutfit'));
    result.play.push(a('rainPlay'));
    result.gear.push(a('rainGear'));
  } else if (prob >= 60) {
    // Rain is not coded yet, but the chance is high.
    result.outfit.push(a('rainOutfit'));
    result.play.push(a('rainHighPlay', { p: prob }));
    result.gear.push(a('rainGear'));
  }

  // 3) Fog affects mountain views and walking safety.
  if (dayClass === 'fog' || nowClass === 'fog') {
    result.risk.push(a('fogRisk'));
    result.play.push(a('fogPlay'));
  }

  // 4) Wind on the open summit.
  if (wind >= 50) {
    result.risk.push(a('strongWindRisk'));
  } else if (wind >= 26) {
    result.play.push(a('windyPlay'));
    result.gear.push(a('windyGear'));
  }

  // 5) Heat and strong sun.
  const hot = maxT >= 31;
  if (hot) {
    result.outfit.push(a('hotOutfit'));
    result.play.push(a('hotPlay'));
    result.gear.push(a('hotGear'));
  } else if (!wetCode) {
    // Sunny/overcast: sunscreen gear applies unless rain already covers the advice.
    if (uv >= 6) {
      result.outfit.push(a('uvOutfit'));
    }
    if (uv >= 3) {
      result.gear.push(a('uvGear'));
    }
  }

  // 6) Big temperature swing between day and night.
  if (maxT - minT > 8) {
    result.outfit.push(a('tempGapOutfit'));
  }

  // 7) General day feel for pleasant weather.
  if (!wetCode && result.play.length === 0) {
    if (dayClass === 'overcast') {
      result.play.push(a('cloudyPlay'));
    } else if (dayClass === 'clear' || dayClass === 'partly') {
      result.play.push(a('clearPlay'));
    }
  }

  if (
    result.outfit.length === 0 &&
    result.play.length === 0 &&
    result.gear.length === 0 &&
    result.risk.length === 0
  ) {
    result.play.push(a('noAdvice'));
  }

  return result;
}

export default function WeatherSection() {
  const t = useTranslations('weather');
  const locale = useLocale();
  const [weather, setWeather] = useState<WeatherPayload | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch('/api/weather', { cache: 'no-store' });
        if (!res.ok) throw new Error('proxy unavailable');
        const json = (await res.json()) as WeatherPayload;
        if (!cancelled) setWeather(json);
      } catch {
        try {
          const res = await fetch(buildSourceUrl());
          if (!res.ok) throw new Error('source unavailable');
          const json = (await res.json()) as WeatherPayload;
          if (!cancelled) setWeather(json);
        } catch {
          if (!cancelled) setFailed(true);
        }
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const intlTag = useMemo(() => {
    const map: Record<string, string> = { zh: 'zh-CN', en: 'en-US', es: 'es-CO' };
    return map[locale] || 'es-CO';
  }, [locale]);

  const adv = useMemo<Translate>(
    () => (key: string, values?: Record<string, string | number>) => t(key, values),
    [t]
  );

  const advice = useMemo(() => (weather ? buildAdvice(weather, adv) : null), [weather, adv]);

  const updatedTime = weather
    ? new Date(weather.fetchedAt).toLocaleTimeString(intlTag, {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  const dayName = (date: string) => {
    try {
      return new Date(`${date}T00:00:00`).toLocaleDateString(intlTag, { weekday: 'short' });
    } catch {
      return date;
    }
  };

  return (
    <section id="weather" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title={t('title')} />
        <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>

        {failed ? (
          <StatusCard text={t('unavailable')} />
        ) : !weather ? (
          <StatusCard text={t('loading')} />
        ) : (
          <WeatherContent
            weather={weather}
            t={t}
            dayName={dayName}
            advice={advice}
            updatedTime={updatedTime}
          />
        )}
      </div>
    </section>
  );
}

function WeatherContent({
  weather,
  t,
  dayName,
  advice,
  updatedTime,
}: {
  weather: WeatherPayload;
  t: Translate;
  dayName: (date: string) => string;
  advice: Advice | null;
  updatedTime: string;
}) {
  const current = weather.current;
  const today = weather.daily[0];
  const currentCode = codeInfo(current.weatherCode);
  const todayProb = Math.round(today?.precipProb ?? current.precipitation ?? 0);
  const wind = Math.round(current.windSpeed);
  const uvKey = uvLevel(today?.uvIndexMax ?? 0);
  const uvLabel = t(`uvWords.${uvKey}`);

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-5 mb-6">
        {/* Current conditions */}
        <div
          className="lg:col-span-2 rounded-2xl p-6 flex flex-col"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
        >
          <p className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: 'var(--text-secondary)' }}>
            {t('currentLabel')}
          </p>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-6xl leading-none" aria-hidden>
              {current.isDay ? currentCode.icon : '🌙'}
            </span>
            <div>
              <p className="font-display text-5xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                {Math.round(current.temperature)}°
              </p>
              <p style={{ color: 'var(--text-secondary)' }}>{t(`codes.${currentCode.key}`)}</p>
            </div>
          </div>
          <div className="space-y-2 mt-auto">
            <MiniStat icon="🌧" label={t('stats.rain')} value={`${todayProb}%`} />
            <MiniStat icon="💨" label={t('stats.wind')} value={`${wind} km/h`} />
            <MiniStat icon="☀️" label={t('stats.uv')} value={uvLabel} />
          </div>
        </div>

        {/* 7-day forecast */}
        <div
          className="lg:col-span-3 rounded-2xl p-6"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
        >
          <p className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: 'var(--text-secondary)' }}>
            {t('dailyTitle')}
          </p>
          <div className="overflow-x-auto -mx-1 px-1 pb-1">
            <div className="flex gap-2 min-w-[520px]">
              {weather.daily.map((day, i) => {
                const info = codeInfo(day.weatherCode);
                const isToday = i === 0;
                return (
                  <div
                    key={day.date}
                    className="flex-1 min-w-0 rounded-xl p-3 text-center"
                    style={{
                      background: isToday ? 'var(--accent)' : 'var(--bg-secondary)',
                      border: isToday ? 'none' : '1px solid var(--border-color)',
                    }}
                  >
                    <p
                      className="text-xs font-semibold mb-2"
                      style={{ color: isToday ? 'white' : 'var(--text-primary)' }}
                    >
                      {dayName(day.date)}
                    </p>
                    <p className="text-2xl mb-1" aria-hidden>
                      {info.icon}
                    </p>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: isToday ? 'white' : 'var(--text-primary)' }}
                    >
                      {t('maxMin', { max: Math.round(day.tMax), min: Math.round(day.tMin) })}
                    </p>
                    {day.precipProb != null && (
                      <p
                        className="text-xs mt-1"
                        style={{ color: isToday ? 'rgba(255,255,255,0.85)' : 'var(--text-secondary)' }}
                      >
                        🌧 {t('precipProb', { prob: Math.round(day.precipProb) })}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {advice && <AdviceView advice={advice} t={t} />}

      <p className="text-xs mt-3" style={{ color: 'var(--text-secondary)' }}>
        {t('updatedAt', { time: updatedTime })}
      </p>
    </>
  );
}

function AdviceView({ advice, t }: { advice: Advice; t: Translate }) {
  const hasAny =
    advice.outfit.length > 0 || advice.play.length > 0 || advice.gear.length > 0;

  return (
    <div
      className="rounded-2xl p-6 mb-6"
      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
    >
      <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
        {t('advice.disclaimer')}
      </p>

      {advice.risk.length > 0 && (
        <div
          className="rounded-xl p-4 mb-5"
          style={{
            background: 'rgba(220, 38, 38, 0.08)',
            border: '1px solid rgba(220, 38, 38, 0.4)',
          }}
        >
          <p className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <span className="text-base" aria-hidden>
              ⚠️
            </span>
            {t('advice.blockRisk')}
          </p>
          <ul className="space-y-2">
            {advice.risk.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm leading-relaxed">
                <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#e5484d' }} />
                <span style={{ color: 'var(--text-primary)' }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasAny && (
        <div className="grid gap-6 md:grid-cols-3">
          <AdviceBlock
            icon="🧥"
            title={t('advice.blockOutfit')}
            items={advice.outfit}
          />
          <AdviceBlock icon="🧭" title={t('advice.blockPlay')} items={advice.play} />
          <AdviceBlock icon="🎒" title={t('advice.blockGear')} items={advice.gear} />
        </div>
      )}
    </div>
  );
}

function AdviceBlock({
  icon,
  title,
  items,
}: {
  icon: string;
  title: string;
  items: string[];
}) {
  if (items.length === 0) return null;
  return (
    <div className="rounded-xl p-4" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
      <p className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <span aria-hidden>{icon}</span>
        {title}
      </p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm leading-relaxed">
            <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
            <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatusCard({ text }: { text: string }) {
  return (
    <div
      className="rounded-xl p-6 text-center"
      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
    >
      <p style={{ color: 'var(--text-secondary)' }}>{text}</p>
    </div>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <>
      <h2
        className="font-display text-3xl sm:text-4xl font-semibold mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
      </h2>
      <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
    </>
  );
}

function MiniStat({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div
      className="flex items-center justify-between rounded-lg px-3 py-2 text-sm"
      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
    >
      <span className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
        <span aria-hidden>{icon}</span>
        {label}
      </span>
      <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
        {value}
      </span>
    </div>
  );
}
