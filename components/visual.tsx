import type { Scene } from '@/lib/destinations';

type Props = {
  scene: Scene;
  description: string;
  className?: string;
  decorative?: boolean;
};

export function Visual({ scene, description, className = '', decorative = false }: Props) {
  return (
    <div
      className={`visual visual--${scene} ${className}`}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : description}
      aria-hidden={decorative ? true : undefined}
    >
      <span className="visual__low-mark" aria-hidden="true">✺</span>
    </div>
  );
}
