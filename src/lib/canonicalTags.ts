export interface CanonicalTagGroup {
  label: string;
  matchTags: string[];
}

export const canonicalTags: CanonicalTagGroup[] = [
  {
    label: 'astrophysics',
    matchTags: [
      'astrophysics',
      'orbital-dynamics',
      'observational-astronomy',
      'numerical-methods',
      'numerical-simulation',
      'research',
      'chaos',
    ],
  },
  {
    label: 'propulsion',
    matchTags: ['rocket-propulsion', 'rocketry', 'propulsion', 'flight-hardware'],
  },
  {
    label: 'mechanical engineering',
    matchTags: [
      'mechanical',
      'heat-transfer',
      'fabrication',
      'hardware',
      'tooling',
      'manufacturing',
      'cnc',
      'cnc-machining',
      'cam',
      'first-principles',
    ],
  },
  {
    label: 'systems & infrastructure',
    matchTags: ['systems-engineering', 'infrastructure', 'networking', 'security', 'homelab', 'operations'],
  },
  {
    label: 'education & mentorship',
    matchTags: ['teaching', 'education', 'mentorship', 'leadership'],
  },
  {
    label: 'media & outreach',
    matchTags: ['science-communication', 'outreach', 'media'],
  },
];

export function getCanonicalLabels(tags: string[]): string[] {
  return canonicalTags
    .filter((canonical) => tags.some((tag) => canonical.matchTags.includes(tag)))
    .map((canonical) => canonical.label);
}
