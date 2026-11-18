'use client';

import { useEffect, useState } from 'react';
import { Icon } from './icon';

export const SAVED_KEY = 'sinta-saved-places-v1';

function readSaved(): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(SAVED_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : [];
  } catch { return []; }
}

export function SaveButton({ slug, label = 'Save for later' }: { slug: string; label?: string }) {
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    const update = () => setSaved(readSaved().includes(slug));
    update();
    window.addEventListener('sinta:saved-changed', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('sinta:saved-changed', update);
      window.removeEventListener('storage', update);
    };
  }, [slug]);
  function toggle() {
    const next = new Set(readSaved());
    if (next.has(slug)) next.delete(slug); else next.add(slug);
    try { localStorage.setItem(SAVED_KEY, JSON.stringify([...next])); } catch { /* No persistent storage available. */ }
    setSaved(next.has(slug));
    window.dispatchEvent(new Event('sinta:saved-changed'));
  }
  return <button className={`button button--soft save-button ${saved ? 'save-button--saved' : ''}`} aria-pressed={saved} type="button" onClick={toggle}>
    <Icon name={saved ? 'check' : 'bookmark'} size={18} /> {saved ? 'Saved to your places' : label}
  </button>;
}
