import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

import styles from './styles.module.css'
import { formatDate } from '../../../utils/formatDate'

type Props = {
  layoutId: string
  name: string
  data: Date
  winner: string
  prize: string
  eventKey: string
  visible?: boolean
}

function EventItemCard({
  layoutId,
  name,
  data,
  winner,
  prize,
  eventKey,
  visible = false,
}: Props) {
  return (
    <motion.div layoutId={layoutId} className={styles.card}>
      <Image
        src="/eventPage/iconEvent.png"
        alt="Icone de um evento"
        className="rounded-full"
        width={64}
        height={64}
      />
      <div className={styles.wrapper}>
        <h2 className={styles.name}>{`Evento: ${name}`}</h2>
        <p className={styles.date}>{`Data do torneio: ${formatDate(data)}`}</p>
        <p className={styles.prize}>{`Prémio: $${prize}`}</p>
        <p className={styles.winner}>{`Ganhador do torneio: ${winner}`}</p>
        <p className={styles.key}>{`Key: ${eventKey}`}</p>
      </div>
      {visible && (
        <Link
          href={{
            pathname: `/events/[id]`,
            query: { id: eventKey },
          }}
        >
          <a className={styles.link}>{'Ver evento'}</a>
        </Link>
      )}
    </motion.div>
  )
}

export { EventItemCard }
