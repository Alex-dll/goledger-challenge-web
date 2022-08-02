import { motion } from 'framer-motion'
import Link from 'next/link'

import styles from './styles.module.scss'

type Props = {
  layoutId: string
  href: string
  imgSrc: string
  title: string
}

function HomeCard({ layoutId, href, imgSrc, title }: Props) {
  return (
    <Link href={href} passHref>
      <div className={styles.wrapper}>
        <motion.img src={imgSrc} className={styles.img} layoutId={layoutId} />
        <strong className="pt-2">{title}</strong>
      </div>
    </Link>
  )
}

export { HomeCard }
export type { Props as HomeCardProps }
