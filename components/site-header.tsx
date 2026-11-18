'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from './icon';
import { LowDataToggle } from './low-data-toggle';

const menu = [
  { href: '/explore', label: 'Explore' },
  { href: '/culture', label: 'Our stories' },
  { href: '/plan', label: 'Trip planner' },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setIsOpen(false), [pathname]);
  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <Link className="brand" href="/" aria-label="Sinta Pangasinan home" prefetch={false}>
          <span className="brand__mark" aria-hidden="true"><Icon name="waves" size={25} /></span>
          <span className="brand__text"><strong>sinta.</strong><small>PANGASINAN</small></span>
        </Link>
        <nav className={`main-nav ${isOpen ? 'main-nav--open' : ''}`} id="primary-navigation" aria-label="Primary navigation">
          {menu.map((item) => (
            <Link key={item.href} href={item.href} prefetch={false} className={pathname === item.href || pathname.startsWith(item.href + '/') ? 'main-nav__active' : ''} aria-current={pathname === item.href ? 'page' : undefined}>
              {item.label}
            </Link>
          ))}
          <div className="main-nav__mobile-utility"><LowDataToggle /></div>
        </nav>
        <div className="site-header__actions">
          <div className="site-header__desktop-utility"><LowDataToggle /></div>
          <Link prefetch={false} href="/explore" className="header-cta">Discover places <Icon name="arrow-up" size={16}/></Link>
          <button className="menu-toggle" type="button" aria-expanded={isOpen} aria-controls="primary-navigation" aria-label={isOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setIsOpen(!isOpen)}>
            <Icon name={isOpen ? 'x' : 'menu'} size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
