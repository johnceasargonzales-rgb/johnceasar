
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  destinations,
  getDestination,
  createMapUrl
} from '@/lib/destinations';

import { Icon } from '@/components/icon';
import { SaveButton } from '@/components/save-button';
import { DestinationCard } from '@/components/destination-card';

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate all destination pages during the build
export function generateStaticParams() {
  return destinations.map((item) => ({
    slug: item.slug
  }));
}

// Do not generate unknown destination routes
export const dynamicParams = false;

// SEO metadata
export async function generateMetadata({
  params
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);

  if (!destination) {
    return {
      title: 'Destination not found'
    };
  }

  return {
    title: destination.title,
    description: destination.intro,
    openGraph: {
      title: destination.title,
      description: destination.short,
      images: [
        {
          url: destination.heroImage,
          width: 1280,
          height: 720,
          alt: destination.title
        }
      ]
    }
  };
}

// Destination detail page
export default async function DestinationPage({
  params
}: Props) {
  const { slug } = await params;

  const place = getDestination(slug);

  if (!place) {
    notFound();
  }

  const others = destinations.filter(
    (item) => item.slug !== slug
  );

  return (
    <>
      {/* BREADCRUMBS */}

      <div
        className="container breadcrumbs"
        aria-label="Breadcrumb"
      >
        <Link prefetch={false} href="/">
          Home
        </Link>

        <Icon name="chevron" size={14} />

        <Link prefetch={false} href="/explore">
          Explore
        </Link>

        <Icon name="chevron" size={14} />

        <span aria-current="page">
          {place.title}
        </span>
      </div>


      {/* DESTINATION INTRO */}

      <section className="detail-intro container">

        <div>

          <span className="eyebrow">
            ✺ &nbsp; {place.tag.toUpperCase()}
          </span>

          <h1>
            {place.title}
            <span className="detail-intro__dot">.</span>
          </h1>

          <p>
            {place.intro}
          </p>

          <div className="detail-intro__meta">

            <span>
              <Icon name="map-pin" size={17} />
              {place.place}, Pangasinan
            </span>

            <span>
              <Icon name="compass" size={17} />
              {place.category}
            </span>

          </div>

        </div>


        <div className="detail-intro__actions">

          <SaveButton slug={place.slug} />

          <a
            className="button button--dark"
            href={createMapUrl(place.mapQuery)}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on map
            <Icon name="arrow-up" size={18} />
          </a>

        </div>

      </section>


      {/* DESTINATION HERO IMAGE */}

      <div className="container detail-hero">

        <div className="detail-hero__visual">

          <Image
            src={place.heroImage}
            alt={`${place.title}, ${place.place}, Pangasinan`}
            width={1280}
            height={720}
            priority
            unoptimized
            sizes="(max-width: 768px) 100vw, 1280px"
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              objectFit: 'cover'
            }}
          />

        </div>

        <div className="detail-hero__ribbon">

          <span>
            DISCOVER THE BEAUTY OF PANGASINAN
          </span>

          <span>
            {place.number} / 03
          </span>

        </div>

      </div>


      {/* DESTINATION STORY */}

      <section className="container detail-body">

        <article className="detail-story">

          <span className="eyebrow">
            THE STORY BEHIND THE PLACE
          </span>

          <h2>
            More than meets <em>the eye.</em>
          </h2>

          {place.story.map((paragraph) => (
            <p key={paragraph}>
              {paragraph}
            </p>
          ))}

          <div className="detail-story__quote">

            <Icon name="heart" size={26} />

            <span>
              The best souvenirs are the stories we take home—and
              the care we leave behind.
            </span>

          </div>

        </article>


        {/* VISIT SIDEBAR */}

        <aside className="visit-sidebar">

          <div className="visit-sidebar__top">

            <Icon name="compass" size={26} />

            <h3>
              Your little travel note
            </h3>

            <p>
              {place.travelNote}
            </p>

          </div>


          <div className="visit-sidebar__list">

            <strong>
              GOOD FOR
            </strong>

            {place.goodFor.map((item) => (

              <span key={item}>
                <Icon name="check" size={16} />
                {item}
              </span>

            ))}

          </div>


          <a
            href={place.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="visit-sidebar__source"
          >
            Check official visitor information
            <Icon name="external" size={17} />
          </a>

        </aside>

      </section>


      {/* HIGHLIGHTS */}

      <section className="detail-highlights">

        <div className="container">

          <span className="eyebrow">
            ✺ &nbsp; MOMENTS TO REMEMBER
          </span>

          <h2>
            What makes it <em>special.</em>
          </h2>


          <div className="highlights-grid">

            {place.highlights.map((highlight, index) => (

              <div
                className="highlight"
                key={highlight.title}
              >

                <span>
                  {String(index + 1).padStart(2, '0')}
                </span>

                <Icon
                  name={
                    index === 0
                      ? 'compass'
                      : index === 1
                        ? 'sun'
                        : 'leaf'
                  }
                  size={32}
                />

                <h3>
                  {highlight.title}
                </h3>

                <p>
                  {highlight.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* TRAVEL TIPS */}

      <section className="container practical">

        <div>

          <span className="eyebrow">
            GOOD TO KNOW BEFORE YOU GO
          </span>

          <h2>
            A little planning goes <em>a long way.</em>
          </h2>

          <p>
            Conditions and site rules may change.
            Let these gentle reminders guide your visit.
          </p>

          <a
            className="text-link"
            href={place.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {place.sourceName}
            <Icon name="external" size={18} />
          </a>

        </div>


        <div className="practical__tips">

          {place.tips.map((tip, index) => (

            <div key={tip}>

              <span>
                {String(index + 1).padStart(2, '0')}
              </span>

              <p>
                {tip}
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* OTHER DESTINATIONS */}

      <section className="container more-places">

        <div className="section-heading">

          <div>

            <span className="eyebrow">
              KEEP WONDERING
            </span>

            <h2>
              The story doesn’t <em>end here.</em>
            </h2>

          </div>

          <Link
            prefetch={false}
            href="/explore"
            className="text-link"
          >
            Explore all places
            <Icon name="arrow" size={17} />
          </Link>

        </div>


        <div className="cards-grid cards-grid--two">

          {others.map((item) => (

            <DestinationCard
              key={item.slug}
              destination={item}
            />

          ))}

        </div>

      </section>

    </>
  );
}
