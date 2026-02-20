export const uiLinkStyles = {
  nav: 'text-sm font-medium text-slate-700 hover:text-cyan-600 transition-colors dark:text-slate-200 dark:hover:text-cyan-400',
  navResume:
    'ml-4 px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase border border-cyan-600/50 text-cyan-700 rounded-full hover:bg-cyan-600/10 transition-colors dark:border-cyan-400/60 dark:text-cyan-300 dark:hover:bg-cyan-400/10',
  navResumeMobile:
    'text-sm font-medium text-cyan-700 hover:text-cyan-600 transition-colors dark:text-cyan-300 dark:hover:text-cyan-200',
  footer:
    'text-sm text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors',
  accent: 'text-cyan-400 hover:text-cyan-300 transition-colors',
} as const;

const markdownBody = 'text-[1.02rem] leading-8 text-gray-300';
const subpageTabBase =
  'inline-flex h-12 items-center px-4 whitespace-nowrap text-sm font-medium border-b-2 transition-colors';

export const uiTextStyles = {
  body: markdownBody,
  bodyParagraph: `${markdownBody} mb-4`,
  bodyList: `list-disc list-inside ${markdownBody} mb-4 space-y-1`,
  bodyListOrdered: `list-decimal list-inside ${markdownBody} mb-4 space-y-1`,
  bodyListItem: markdownBody,
  lead: 'text-lg leading-8 text-gray-300',
  insight: 'text-lg leading-8 font-semibold text-cyan-300',
  caption: 'text-sm text-gray-400 italic text-center',
  strong: 'font-semibold text-white',
  emphasis: 'text-cyan-200/80 italic',
  link: 'text-cyan-300 hover:text-cyan-200 underline underline-offset-2 transition-colors',
  blockquote: 'border-l-4 border-cyan-400/60 pl-4 my-6 italic text-gray-400',
} as const;

export const uiSubpageNavStyles = {
  wrapper:
    'relative z-40 border-b border-slate-200/80 dark:border-white/10 bg-white/85 dark:bg-dark/80 backdrop-blur',
  measureRow:
    'hidden lg:flex absolute inset-x-0 top-0 h-12 items-center gap-1 px-6 xl:px-10 whitespace-nowrap overflow-hidden invisible pointer-events-none',
  measureItem: `${subpageTabBase}`,
  tabsRow: 'hidden lg:flex w-full items-center justify-center gap-1 px-6 xl:px-10',
  tab: `${subpageTabBase} border-transparent text-slate-600 dark:text-gray-400 hover:text-slate-800 dark:hover:text-gray-200 hover:border-slate-300 dark:hover:border-white/20`,
  tabActive: `${subpageTabBase} text-cyan-700 dark:text-cyan-300 border-cyan-500 dark:border-cyan-400`,
  dropdownTrigger:
    'w-full inline-flex h-12 items-center justify-between px-4 text-sm font-medium border-b-2 border-cyan-500 text-cyan-700 dark:text-cyan-300 dark:border-cyan-400',
  dropdownPanel:
    'absolute top-full left-0 right-0 z-50 bg-white/95 dark:bg-darker/95 border-t border-slate-200/80 dark:border-white/10 backdrop-blur flex flex-col gap-4 p-6',
  dropdownLink:
    'text-sm font-medium text-slate-700 hover:text-cyan-600 transition-colors dark:text-slate-200 dark:hover:text-cyan-300',
  dropdownLinkActive: 'text-sm font-medium text-cyan-700 dark:text-cyan-300',
  mobileContainer: 'py-0 lg:hidden',
  desktopContainer: 'hidden lg:block py-0',
} as const;

const buttonBase =
  'inline-flex items-center justify-center rounded-lg font-semibold whitespace-nowrap transition-all duration-300';

export const uiButtonStyles = {
  primaryLg:
    `${buttonBase} h-12 px-12 border-2 border-transparent bg-cyan-500 text-dark hover:bg-cyan-400`,
  outlineLg:
    `${buttonBase} h-12 px-12 border-2 border-cyan-500/70 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400`,
  softLg:
    `${buttonBase} h-12 px-12 border border-cyan-400/40 bg-cyan-500/25 text-cyan-300 hover:bg-cyan-500/35 hover:shadow-glow hover:border-cyan-300/60`,
  primaryMd:
    `${buttonBase} px-6 py-3 bg-cyan-500 text-dark hover:bg-cyan-400`,
  outlineMd:
    `${buttonBase} px-6 py-3 border border-cyan-500/70 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400`,
  primarySm:
    'inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-cyan-500 text-dark text-xs font-semibold rounded-md hover:bg-cyan-400 transition-all duration-300',
  outlineSm:
    'inline-flex items-center justify-center gap-2 px-3 py-1.5 border border-cyan-500/70 text-cyan-300 text-xs font-semibold rounded-md hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300',
  writingPrimary:
    'inline-flex items-center justify-center gap-2 px-4 py-2 bg-cyan-500 text-dark text-xs font-semibold rounded-lg hover:bg-cyan-400 transition-all duration-300',
  writingOutline:
    'inline-flex items-center justify-center gap-2 px-4 py-2 border border-cyan-500/70 text-cyan-300 text-xs font-semibold rounded-lg hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300',
} as const;
