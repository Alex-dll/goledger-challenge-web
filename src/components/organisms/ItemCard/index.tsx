import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

import styles from './styles.module.css'

type Props = {
  type: 'cars' | 'drivers' | 'teams' | 'events'
  visible?: boolean
  layoutId: string
  name: string
  id: number
  subtitle?: string
}

const imageModel = {
  cars: { src: '/carPage/iconCar.png', alt: 'Icone de um carro vermelho' },
  drivers: { src: '/driverPage/iconDriver.png', alt: 'Icone de um piloto' },
  teams: { src: '/teamPage/iconTeam.png', alt: 'Icone de um time' },
  events: { src: '/eventPage/iconEvent.png', alt: 'Icone de um evento' },
}

const buttonTextModel = {
  cars: 'Ver carro',
  drivers: 'Ver piloto',
  teams: 'Ver time',
  events: 'Ver evento',
}

function ItemCard({
  type,
  layoutId,
  name,
  subtitle,
  id,
  visible = false,
}: Props) {
  return (
    <motion.div layoutId={layoutId} className={styles.card}>
      <Image
        src={imageModel[type].src}
        alt={imageModel[type].alt}
        className="rounded-full"
        width={64}
        height={64}
      />
      <div className={styles.wrapper}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.id}>{`Id: ${id}`}</p>
        {subtitle && <p className={styles.key}>{`Key: ${subtitle}`}</p>}
      </div>
      {visible && (
        <Link
          href={{
            pathname: `/${type}/[id]`,
            query: { id },
          }}
        >
          <a className={styles.link}>{buttonTextModel[type]}</a>
        </Link>
      )}
    </motion.div>
  )
}

export { ItemCard }
