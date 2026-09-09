'use client';

import { useMessages, useTranslations } from 'next-intl';

type Plan = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  route: string;
  tip: string;
};

type Step = { time: string; label: string };

export default function VisitPlans() {
  const t = useTranslations('plans');
  const messages = useMessages() as any;
  const plans = (messages?.plans?.plans || []) as Plan[];
  const halfSteps = (messages?.plans?.halfSteps || []) as Step[];
  const fullSteps = (messages?.plans?.fullSteps || []) as Step[];

  return (
    <section id="visit-plans" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
        <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>

        <h3 className="font-display text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
          {t('plansTitle')}
        </h3>
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className="rounded-2xl p-6 flex flex-col transition-transform hover:-translate-y-1 hover:shadow-md"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <span className="text-4xl mb-3" aria-hidden>
                {plan.icon}
              </span>
              <h4 className="font-display text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {plan.title}
              </h4>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {plan.desc}
              </p>
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  📍
                </span>{' '}
                {plan.route}
              </p>
              <div
                className="mt-4 rounded-lg px-3 py-2 text-sm"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--accent)' }}
              >
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  💡
                </span>{' '}
                {plan.tip}
              </div>
            </article>
          ))}
        </div>

        <h3 className="font-display text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
          {t('itineraryTitle')}
        </h3>
        <div className="grid gap-6 lg:grid-cols-2">
          <ItineraryCard
            title={t('halfTitle')}
            desc={t('halfDesc')}
            steps={halfSteps}
          />
          <ItineraryCard
            title={t('fullTitle')}
            desc={t('fullDesc')}
            steps={fullSteps}
          />
        </div>
      </div>
    </section>
  );
}

function ItineraryCard({
  title,
  desc,
  steps,
}: {
  title: string;
  desc: string;
  steps: Step[];
}) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
    >
      <h4 className="font-display text-xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h4>
      <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
        {desc}
      </p>
      <ol className="space-y-3">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className="mt-0.5 flex-shrink-0 rounded-md px-2 py-0.5 text-xs font-semibold"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--accent)' }}
            >
              {step.time}
            </span>
            <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {step.label}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
