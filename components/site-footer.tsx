import Link from 'next/link';
import { Icon } from './icon';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Link prefetch={false} href="/" className="footer-brand"><span className="footer-brand__icon"><Icon name="waves" size={29}/></span> sinta.</Link>
            <p>Small moments. Great discoveries.<br/>A thoughtful way to explore Pangasinan.</p>
          </div>
          <div className="footer-links"><span>EXPLORE</span><Link prefetch={false} href="/explore">Destinations</Link><Link prefetch={false} href="/culture">Culture & stories</Link><Link prefetch={false} href="/plan">Plan a trip</Link></div>
          <div className="footer-links"><span>GOOD TO KNOW</span><Link prefetch={false} href="/credits">Sources & image credits</Link><a href="https://www.pangasinan.gov.ph/department/provincial-tourism-and-cultural-affairs-office/" target="_blank" rel="noopener noreferrer">Official tourism office <Icon name="arrow-up" size={13}/></a></div>
          <div className="footer-newsletter"><span>OUR LITTLE REMINDER</span><p>Travel with curiosity.<br/><i>Leave with care.</i></p><Icon name="leaf" size={31}/></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Sinta Pangasinan · Educational tourism concept</span><span>Built to be light on data, rich in stories <span aria-hidden="true">✺</span></span></div>
      </div>
    </footer>
  );
}
