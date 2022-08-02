import { motion } from 'framer-motion'
import Link from 'next/link'

import styles from './styles.module.css'

type Props = {
  title: string
  href: string
}

function LinkGoTo({ title, href }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.3 }}
      className="py-8"
    >
      <Link href={href} passHref>
        <a className={styles.anchor}>{title}</a>
      </Link>
    </motion.div>
  )
}

export { LinkGoTo }
