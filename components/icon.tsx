import type { SVGProps, ReactNode } from 'react';

type IconName = 'arrow' | 'arrow-up' | 'compass' | 'map-pin' | 'menu' | 'x' | 'waves' | 'sun' | 'heart' | 'leaf' | 'book' | 'bookmark' | 'check' | 'external' | 'search' | 'sparkle' | 'clock' | 'sliders' | 'printer' | 'info' | 'mountain' | 'coffee' | 'shield' | 'chevron' | 'globe';
type Props = SVGProps<SVGSVGElement> & { name: IconName; size?: number };

export function Icon({ name, size = 20, ...rest }: Props) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M4 12h16" /><path d="m13 5 7 7-7 7" /></>,
    'arrow-up': <><path d="M6 18 18 6M8 6h10v10" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m16 8-2.5 5.5L8 16l2.5-5.5L16 8Z" /></>,
    'map-pin': <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    x: <><path d="M5 5 19 19M19 5 5 19" /></>,
    waves: <><path d="M2 8c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 14c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 20c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></>,
    heart: <path d="M20.8 8.5c0 4.5-8.8 10.5-8.8 10.5S3.2 13 3.2 8.5a4.5 4.5 0 0 1 8.8-1.2 4.5 4.5 0 0 1 8.8 1.2Z" />,
    leaf: <><path d="M20.5 3.5C9 2.5 4 8 4 14a6 6 0 0 0 6 6c6 0 11.5-5 10.5-16.5Z" /><path d="M4 20c2.5-5.5 6-8 12-11" /></>,
    book: <><path d="M12 6C8 3 4 4 2 5v14c4-2 7-1 10 1 3-2 6-3 10-1V5c-2-1-6-2-10 1Z" /><path d="M12 6v14" /></>,
    bookmark: <path d="M6 4.5h12V21l-6-4-6 4V4.5Z" />,
    check: <path d="m4 12 5.5 5.5L20 6" />,
    external: <><path d="M12 4h8v8M20 4 9 15" /><path d="M19 14v5H5V5h5" /></>,
    search: <><circle cx="10.7" cy="10.7" r="7" /><path d="m16 16 5 5" /></>,
    sparkle: <><path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v6l4 2" /></>,
    sliders: <><path d="M4 6h16M4 12h16M4 18h16" /><circle cx="9" cy="6" r="2" fill="currentColor" stroke="none"/><circle cx="16" cy="12" r="2" fill="currentColor" stroke="none"/><circle cx="7" cy="18" r="2" fill="currentColor" stroke="none"/></>,
    printer: <><path d="M6 9V3h12v6M6 18H4V9h16v9h-2M6 15h12v6H6z" /><path d="M17 12h.01" /></>,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7h.01" /></>,
    mountain: <><path d="m2 20 7-12 4 6 3-4 6 10H2Z" /><path d="m7 11 2 2 2-2" /></>,
    coffee: <><path d="M4 6h13v8a6.5 6.5 0 0 1-13 0V6ZM17 7h1a4 4 0 0 1 0 8h-1M3 21h17" /></>,
    shield: <><path d="m12 2 8 4v6c0 5-3 8-8 10-5-2-8-5-8-10V6l8-4Z" /><path d="m8 12 3 3 5-6" /></>,
    chevron: <path d="m9 6 6 6-6 6" />,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-3 3-3 15 0 18M12 3c3 3 3 15 0 18"/></>
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...rest}>{paths[name]}</svg>;
}
