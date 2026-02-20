// Mapping of tag names to emoji/Unicode symbols for visual distinction
export const tagIconMap: Record<string, string> = {
  // Engineering
  'rocket-propulsion': '🚀',
  'propulsion': '🚀',
  'rocketry': '🚀',
  'systems-engineering': '⚙️',
  'hardware': '🔧',
  'fabrication': '🔨',
  'manufacturing': '🏭',
  'cnc': '🏭',
  'cnc-machining': '🏭',
  
  // Science & Analysis
  'astrophysics': '🌌',
  'orbital-dynamics': '🛸',
  'orbital-mechanics': '🛸',
  'numerical-simulation': '📊',
  'research': '🔬',
  'data-analysis': '📈',
  'bayesian-methods': '📊',
  'astrostatistics': '📊',
  'chaos': '🌀',
  
  // Programming & Software
  'python': '🐍',
  'machine-learning': '🤖',
  'ai': '🤖',
  'thermal-analysis': '🔥',
  'heat-transfer': '🔥',
  'fea': '📐',
  
  // Infrastructure & Networking
  'networking': '🌐',
  'infrastructure': '🌉',
  'homelab': '🖥️',
  'security': '🔐',
  
  // Teaching & Outreach
  'teaching': '📚',
  'education': '🎓',
  'science-communication': '📢',
  'outreach': '📣',
  'media': '📹',
  'first-principles': '⚛️',
  'leadership': '👥',
  'mentorship': '🤝',
  'operations': '📋',
  
  // Operations & Hardware
  'safety-engineering': '⚠️',
  'flight-hardware': '🛰️',
  'instrumentation': '🎛️',
  
  // Software/Tools
  'cam': '📐',
  'tooling': '🔧',
  'early-work': '🌱',
  
  // Default
  'default': '📌',
};

export function getTagIcon(tag: string): string {
  return tagIconMap[tag.toLowerCase()] || tagIconMap['default'];
}
