import { motion } from 'framer-motion'
import Link from 'next/link'
import { useCallback } from 'react'

import styles from './styles.module.css'

type Props = {
  layoutId: string
  href: string
  imgSrc: string
  title: string
  prefetch: () => void
}

function HomeCard({ layoutId, href, imgSrc, title, prefetch }: Props) {
  const handlePrefetch = useCallback(prefetch, [prefetch])

  return (
    <Link href={href} passHref>
      <a>
        <div className={styles.wrapper} onMouseEnter={handlePrefetch}>
          <motion.img
            src={imgSrc}
            className={styles.image}
            layoutId={layoutId}
          />
          <strong className="pt-2">{title}</strong>
        </div>
      </a>
    </Link>
  )
}

export { HomeCard }
export type { Props as HomeCardProps }
