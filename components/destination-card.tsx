import Link from 'next/link';
import type { Destination } from '@/lib/destinations';
import { Icon } from './icon';
import { Visual } from './visual';

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <article className="place-card">
      <Link href={`/destinations/${destination.slug}`} prefetch={false} className="place-card__image-link" aria-label={`Read about ${destination.title}`}>
        <Visual scene={destination.scene} description={`Scenic illustrative image inspired by ${destination.title}`} className="place-card__visual"/>
        <span className="place-card__count">{destination.number} / 03</span>
        <span className="place-card__go" aria-hidden="true"><Icon name="arrow-up" size={22}/></span>
      </Link>
      <div className="place-card__meta"><span><Icon name="map-pin" size={14}/> {destination.place}</span><span>{destination.category}</span></div>
      <h3><Link prefetch={false} href={`/destinations/${destination.slug}`}>{destination.title}</Link></h3>
      <p>{destination.short}</p>
      <Link prefetch={false} href={`/destinations/${destination.slug}`} className="text-link">Explore this place <Icon name="arrow" size={17}/></Link>
    </article>
  );
}
