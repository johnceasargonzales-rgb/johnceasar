'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { destinations, createMapUrl } from '@/lib/destinations';
import { Icon } from './icon';
import { Visual } from './visual';

const STORAGE_KEY = 'sinta-trip-plan-v1';
type Pace = 'weekend' | 'single';
const coastalSlugs = ['hundred-islands', 'cape-bolinao-lighthouse'];

export function TripPlanner() {
  const [chosen, setChosen] = useState<string[]>(['hundred-islands', 'cape-bolinao-lighthouse']);
  const [pace, setPace] = useState<Pace>('weekend');
  const [showPlan, setShowPlan] = useState(false);
  const [savedNotice, setSavedNotice] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const entry: unknown = JSON.parse(raw);
      if (entry && typeof entry === 'object') {
        const value = entry as { selected?: unknown; pace?: unknown };
        if (Array.isArray(value.selected)) setChosen(value.selected.filter((slug): slug is string => typeof slug === 'string' && destinations.some((d) => d.slug === slug)));
        if (value.pace === 'single' || value.pace === 'weekend') setPace(value.pace);
      }
    } catch { /* Ignore damaged preference data. */ }
  }, []);

  const ordered = useMemo(() => destinations.filter((item) => chosen.includes(item.slug)).sort((a, b) => {
    return [...coastalSlugs, 'balungao-hot-springs'].indexOf(a.slug) - [...coastalSlugs, 'balungao-hot-springs'].indexOf(b.slug);
  }), [chosen]);
  const coastal = ordered.filter((item) => coastalSlugs.includes(item.slug));
  const inland = ordered.filter((item) => !coastalSlugs.includes(item.slug));
  const days = pace === 'weekend' && coastal.length > 0 && inland.length > 0
    ? [{ title: 'Day 01 — The coast', places: coastal }, { title: 'Day 02 — The countryside', places: inland }]
    : pace === 'weekend' && ordered.length > 1
      ? [{ title: 'Day 01 — First discoveries', places: ordered.slice(0, Math.ceil(ordered.length / 2)) }, { title: 'Day 02 — Take it slowly', places: ordered.slice(Math.ceil(ordered.length / 2)) }]
      : [{ title: 'Your chosen stops', places: ordered }];

  function changeChoice(slug: string) {
    setChosen((old) => old.includes(slug) ? old.filter((item) => item !== slug) : [...old, slug]);
    setShowPlan(false);
    setSavedNotice('');
  }
  function changePace(value: Pace) { setPace(value); setShowPlan(false); setSavedNotice(''); }
  function build() {
    if (!chosen.length) return;
    setShowPlan(true);
    setSavedNotice('');
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ selected: chosen, pace }));
      setSavedNotice('Your choices are saved in this browser.');
    } catch {
      setSavedNotice('Your plan is ready, but this browser did not allow local saving.');
    }
  }
  return <div className="planner">
    <div className="planner__left">
      <div className="planner__section-head"><span className="mini-number">01</span><div><h2>Choose your places</h2><p>Pick one or more stops to add to your inspiration itinerary.</p></div></div>
      <div className="planner__places">
        {destinations.map((item) => <label key={item.slug} className={`planner-option ${chosen.includes(item.slug) ? 'planner-option--selected' : ''}`}>
          <input type="checkbox" checked={chosen.includes(item.slug)} onChange={() => changeChoice(item.slug)} />
          <Visual scene={item.scene} decorative description="" className="planner-option__image"/>
          <span className="planner-option__text"><strong>{item.title}</strong><small>{item.place} · {item.category}</small></span>
          <span className="planner-option__tick" aria-hidden="true"><Icon name="check" size={15}/></span>
        </label>)}
      </div>
      <div className="planner__section-head planner__section-head--second"><span className="mini-number">02</span><div><h2>Set your pace</h2><p>How would you like to discover these places?</p></div></div>
      <fieldset className="pace-options"><legend className="sr-only">Choose itinerary duration</legend>
        <label className={`pace-option ${pace === 'single' ? 'pace-option--selected' : ''}`}><input name="pace" type="radio" checked={pace === 'single'} onChange={() => changePace('single')}/><Icon name="sun" size={22}/><strong>Day inspiration</strong><small>A shortlist for a single-day outing</small></label>
        <label className={`pace-option ${pace === 'weekend' ? 'pace-option--selected' : ''}`}><input name="pace" type="radio" checked={pace === 'weekend'} onChange={() => changePace('weekend')}/><Icon name="coffee" size={22}/><strong>A slower weekend</strong><small>Ideas divided across two days</small></label>
      </fieldset>
      <button type="button" disabled={chosen.length === 0} className="button button--dark planner__submit" onClick={build}><Icon name="sparkle" size={19}/> Create my itinerary <Icon name="arrow" size={19}/></button>
      {chosen.length === 0 && <p role="status" className="form-hint">Select at least one destination to continue.</p>}
    </div>
    <aside className="planner__right" aria-live="polite" aria-atomic="false">
      {showPlan ? <div className="itinerary" id="itinerary-result">
        <div className="itinerary__top"><span className="eyebrow eyebrow--light"><Icon name="sparkle" size={15}/> YOUR ITINERARY</span><span className="itinerary__badge">{ordered.length} {ordered.length === 1 ? 'place' : 'places'}</span></div>
        <h2>Here’s to <em>new memories.</em></h2>
        <p className="itinerary__intro">A flexible starting point for your Pangasinan journey.</p>
        <div className="itinerary__days">
          {days.map((day, index) => <section key={index} className="itinerary__day"><h3>{day.title}</h3>{day.places.map((item) => <div key={item.slug} className="itinerary__item"><span className="itinerary__dot"/><div><strong>{item.title}</strong><small>{item.place}</small><Link prefetch={false} href={`/destinations/${item.slug}`}>Visitor tips <Icon name="arrow-up" size={13}/></Link></div><a href={createMapUrl(item.mapQuery)} target="_blank" rel="noopener noreferrer" aria-label={`Open map of ${item.title}`} className="itinerary__map"><Icon name="map-pin" size={19}/></a></div>)}</section>)}
        </div>
        {(pace === 'single' && ordered.length > 1) && <p className="itinerary__advice"><Icon name="info" size={17}/> Some destinations are in different municipalities and may require substantial travel time. Fewer stops—or a longer trip—will be more comfortable.</p>}
        <p className="itinerary__advice"><Icon name="info" size={17}/> This is an inspiration plan, not a live routing or booking service. Confirm local transport, admission, and operating schedules before travel.</p>
        <div className="itinerary__actions"><button type="button" className="button button--cream" onClick={() => window.print()}><Icon name="printer" size={18}/> Print plan</button><button className="itinerary__edit" onClick={() => setShowPlan(false)} type="button">Edit choices</button></div>
        {savedNotice && <span className="itinerary__saved" role="status"><Icon name="check" size={15}/>{savedNotice}</span>}
      </div> : <div className="planner-placeholder"><div className="planner-placeholder__sun">✺</div><div className="planner-placeholder__path" aria-hidden="true"><span/><span/><span/></div><span className="eyebrow eyebrow--light">A JOURNEY MADE FOR YOU</span><h2>Your next favorite <em>story</em> starts here.</h2><p>Choose your places and we’ll put together a simple itinerary to inspire your trip.</p><div className="planner-placeholder__bottom"><Icon name="compass" size={27}/> Explore with purpose, travel with care.</div></div>}
    </aside>
  </div>;
}
