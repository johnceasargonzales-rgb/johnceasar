import Link from 'next/link';
import { Icon } from '@/components/icon';

export default function NotFound() {
  return <div className="not-found container"><span className="eyebrow">A LITTLE DETOUR</span><span className="not-found__code">404</span><h1>This path isn’t on <em>our map.</em></h1><p>Looks like this page has wandered off. Your next discovery is just one click away.</p><Link prefetch={false} href="/explore" className="button button--dark">Explore destinations <Icon name="arrow" size={19}/></Link></div>;
}
