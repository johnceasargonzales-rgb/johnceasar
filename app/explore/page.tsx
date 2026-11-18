import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/icon';
import { DestinationExplorer } from '@/components/destination-explorer';

export const metadata: Metadata = { title: 'Explore destinations', description: 'Find memorable places in Pangasinan: islands, maritime heritage, and soothing hot springs.' };

export default function ExplorePage() {
  return <><section className="interior-hero container"><div><span className="eyebrow">✺ &nbsp; YOUR PANGASINAN FIELD GUIDE</span><h1>So much to <em>discover.</em></h1><p>Three extraordinary places, countless reasons to wander. Find the experience that feels like you.</p></div><div className="interior-hero__number" aria-hidden="true">03<span>places<br/>to explore</span></div></section>
  <div className="container"><DestinationExplorer/></div>
  <section className="simple-cta container"><div><span className="eyebrow">TAKE THE NEXT STEP</span><h2>Found somewhere you love?</h2><p>Bring your favorite places together in a flexible itinerary.</p></div><Link prefetch={false} href="/plan" className="button button--dark">Plan your trip <Icon name="arrow-up" size={19}/></Link></section></>;
}
