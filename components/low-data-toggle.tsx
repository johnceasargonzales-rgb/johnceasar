'use client';

import { useEffect, useState } from 'react';
import { Icon } from './icon';

const KEY = 'sinta-low-data';

export function LowDataToggle() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    try { setEnabled(localStorage.getItem(KEY) === 'true'); } catch { /* Storage may be blocked. */ }
  }, []);

  function toggle() {
    const value = !enabled;
    setEnabled(value);
    document.documentElement.dataset.dataMode = value ? 'low' : 'full';
    try { localStorage.setItem(KEY, String(value)); } catch { /* Visual preference still works. */ }
  }

  return (
    <button type="button" className={`data-toggle ${enabled ? 'data-toggle--on' : ''}`} aria-pressed={enabled} aria-label={`Low-data mode ${enabled ? 'on' : 'off'}. Toggle scenic images`} onClick={toggle} title="Show simple color artwork instead of images to save data">
      <Icon name="leaf" size={16} />
      <span>Low-data <span className="data-toggle__mode">{enabled ? 'on' : 'off'}</span></span>
      <span className="data-toggle__switch" aria-hidden="true" />
    </button>
  );
}
