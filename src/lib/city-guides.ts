import guides from './city-guides.json';

export {guides};
export type GuideLocale = keyof (typeof guides)[number]['locales'];
export const locales: GuideLocale[] = ['es', 'en', 'zh'];
export const labels = {
  es: {nearby: 'Lugares cercanos', history: 'Historia y detalles que observar', route: 'Recorrido a pie', manager: 'Gestión y acceso', map: 'Abrir este lugar en Google Maps', source: 'Información y fotografía de Medellín.Travel', faq: 'Preguntas frecuentes', arrival: '¿Cómo organizo la visita a pie?', access: '¿Quién atiende el lugar y qué acceso tiene?', next: 'Continuar por Medellín'},
  en: {nearby: 'Nearby places', history: 'History and things to notice', route: 'Walking route', manager: 'Management and access', map: 'Open this location in Google Maps', source: 'Local information and photograph from Medellín.Travel', faq: 'Visitor questions', arrival: 'How should I approach on foot?', access: 'Who manages the site and its visitor access?', next: 'Continue exploring Medellín'},
  zh: {nearby: '周边景点', history: '历史与现场看点', route: '步行游线', manager: '管理与参观范围', map: '在 Google 地图查看此地点', source: '资料与实景图片来自麦德林市旅游指南', faq: '游客常见问题', arrival: '怎样安排步行游览？', access: '由谁管理，哪些区域可以参观？', next: '继续游览麦德林'},
};
