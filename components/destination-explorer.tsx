'use client';

import { useMemo, useState } from 'react';
import { categories, destinations, type Category } from '@/lib/destinations';
import { DestinationCard } from './destination-card';
import { Icon } from './icon';

export function DestinationExplorer() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'All places' | Category>('All places');
  const filtered = useMemo(() => destinations.filter((place) => {
    const matchCategory = category === 'All places' || place.category === category;
    const matchSearch = `${place.title} ${place.place} ${place.category} ${place.short}`.toLowerCase().includes(search.toLowerCase().trim());
    return matchCategory && matchSearch;
  }), [search, category]);
  return (
    <section className="explorer" aria-label="Filter destinations">
      <div className="explorer__controls">
        <label className="explorer__search"><Icon name="search" size={20}/><span className="sr-only">Search destinations</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search places or experiences..."/></label>
        <div className="explorer__filters" role="group" aria-label="Destination categories">
          {categories.map((item) => <button key={item} type="button" className={category === item ? 'filter-pill filter-pill--active' : 'filter-pill'} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
      </div>
      <p className="explorer__count" role="status">Showing {filtered.length} {filtered.length === 1 ? 'destination' : 'destinations'}</p>
      {filtered.length ? <div className="cards-grid">{filtered.map((item) => <DestinationCard key={item.slug} destination={item}/>)}</div> : <div className="empty-state"><Icon name="compass" size={35}/><h2>No places found</h2><p>Try another search or browse all destinations.</p><button type="button" className="button button--dark" onClick={() => {setSearch(''); setCategory('All places');}}>Clear filters</button></div>}
    </section>
  );
}
