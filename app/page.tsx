import Link from 'next/link';
import { destinations } from '@/lib/destinations';
import { Icon } from '@/components/icon';
import { Visual } from '@/components/visual';
import { DestinationCard } from '@/components/destination-card';

export default function HomePage() {
  return <>
    <section className="home-hero container">
      <div className="home-hero__copy"><span className="eyebrow"><span className="eyebrow__symbol">✳</span> THE HEART OF THE PHILIPPINES, REIMAGINED</span>
        <h1>There’s wonder <span>in every <em>direction.</em></span></h1>
        <p className="home-hero__description">From island-dotted waters to historic coastal lights and healing springs—come discover a Pangasinan that stays with you.</p>
        <div className="hero-actions"><Link prefetch={false} href="/explore" className="button button--dark">Start exploring <Icon name="arrow-up" size={19}/></Link><Link prefetch={false} href="/culture" className="button button--outline">Our stories <Icon name="arrow" size={18}/></Link></div>
        <div className="hero-trust"><span className="hero-trust__icon"><Icon name="leaf" size={19}/></span><span>Thoughtful journeys.<br/><strong>Local stories, lasting memories.</strong></span></div>
      </div>
      <div className="home-hero__art"><Visual scene="islands" description="Illustrative scenic image of green islands in turquoise waters" className="home-hero__visual"/>
        <div className="hero-art__top"><span>DISCOVER PANGASINAN</span><span>16° N · 120° E</span></div>
        <div className="hero-art__stamp" aria-hidden="true"><span>LOVE THE<br/>JOURNEY</span><Icon name="sun" size={29}/></div>
        <div className="hero-art__caption"><div><span>FEATURED ESCAPE</span><strong>Hundred Islands<br/>National Park</strong><small><Icon name="map-pin" size={14}/> Alaminos City, Pangasinan</small></div><Link prefetch={false} href="/destinations/hundred-islands" aria-label="Discover Hundred Islands" className="hero-art__button"><Icon name="arrow-up" size={22}/></Link></div>
      </div>
      <div className="hero-vertical-label" aria-hidden="true">A DIFFERENT KIND OF DISCOVERY — EST. IN EVERY STORY</div>
    </section>

    <section className="value-strip" aria-label="What makes Sinta special"><div className="container value-strip__inner">
      <div><span className="value-strip__icon"><Icon name="compass" size={25}/></span><span><strong>Discover mindfully</strong><small>Places worth slowing down for</small></span></div>
      <div><span className="value-strip__icon"><Icon name="book" size={25}/></span><span><strong>Feel the heritage</strong><small>Stories beyond the scenery</small></span></div>
      <div><span className="value-strip__icon"><Icon name="leaf" size={25}/></span><span><strong>Travel a little lighter</strong><small>Made for every connection</small></span></div>
    </div></section>

    <section className="section container featured-section" id="featured-places">
      <div className="section-heading"><div><span className="eyebrow">✺ &nbsp; PLACES TO FALL IN LOVE WITH</span><h2>Find your kind of <em>extraordinary.</em></h2></div><Link prefetch={false} href="/explore" className="text-link text-link--all">View all destinations <Icon name="arrow-up" size={18}/></Link></div>
      <div className="cards-grid">{destinations.map((item) => <DestinationCard key={item.slug} destination={item}/>)}</div>
    </section>

    <section className="story-feature container"><div className="story-feature__art"><span className="story-feature__ornament" aria-hidden="true">✳</span><div className="story-feature__circles" aria-hidden="true"><span/><span/><span/></div><span className="story-feature__art-caption">THERE IS MORE TO EVERY PLACE.</span></div><div className="story-feature__copy"><span className="eyebrow eyebrow--light">ROOTED IN CULTURE</span><h2>Every place has a <em>story to tell.</em></h2><p>Pangasinan is more than a postcard. It’s the rhythm of coastal communities, traditions passed along, and the warmth of finding a place that feels like home.</p><Link prefetch={false} href="/culture" className="button button--cream">Explore our heritage <Icon name="arrow-up" size={19}/></Link></div></section>

    <section className="section container journey-section"><div className="journey-section__heading"><span className="eyebrow">✺ &nbsp; MAKE IT YOUR OWN</span><h2>Go where your <em>curiosity</em> takes you.</h2><p>Planning a trip should feel like the beginning of an adventure, not another thing on your to-do list.</p><Link prefetch={false} href="/plan" className="button button--dark">Create a simple itinerary <Icon name="arrow-up" size={19}/></Link></div><div className="journey-section__steps"><div><span>01</span><Icon name="map-pin" size={27}/><h3>Pick your places</h3><p>Choose the landscapes and landmarks that speak to you.</p></div><div><span>02</span><Icon name="sun" size={27}/><h3>Find your pace</h3><p>Keep it simple for a day, or spread it across a weekend.</p></div><div><span>03</span><Icon name="heart" size={27}/><h3>Make it memorable</h3><p>Bring curiosity, leave with stories worth sharing.</p></div></div></section>

    <section className="closing-banner"><div className="container closing-banner__inner"><div><span>YOUR NEXT CHAPTER AWAITS</span><h2>Ready to feel <em>something new?</em></h2></div><Link prefetch={false} href="/explore" className="button button--cream">Let’s discover <Icon name="arrow-up" size={19}/></Link></div></section>
  </>;
}
