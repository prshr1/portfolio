import { SPECULATION_ROUTES } from '@/lib/site';

const rules = {
  prefetch: [
    {
      source: 'list',
      urls: SPECULATION_ROUTES,
    },
  ],
};

export function SpeculationRules() {
  return (
    <script
      type="speculationrules"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(rules) }}
    />
  );
}
