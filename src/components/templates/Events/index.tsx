import { motion } from 'framer-motion'
import Link from 'next/link'

import { useGetEvents } from '../../../hooks/useApi'
import { Heading, LinkGoTo, Loading } from '../../atoms'
import { EventItemCard } from '../../organisms'

import styles from './styles.module.css'

function Events() {
  const { data, isLoading } = useGetEvents()

  return (
    <main className={styles.container}>
      <Heading title="Gerencie seus eventos" />

      <motion.div
        layoutId="event-img"
        className="w-full h-64 mb-10 bg-center  bg-[url('/eventPage/event.jpg')]"
      />

      <div className="flex justify-center w-full pb-12">
        <Link href="/events/create" passHref>
          <a className={styles.create}>Cadastre um evento</a>
        </Link>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <motion.section className={styles.list}>
          {data?.result.map((events) => (
            <EventItemCard
              key={events?.['@key']}
              layoutId={`${events?.['@key']}`}
              name={`${events?.name}`}
              data={events?.date}
              winner={events?.winner['@key']}
              eventKey={`${events?.['@key']}`}
              visible
            />
          ))}
        </motion.section>
      )}

      <LinkGoTo title="Voltar para a home" href="/" />
    </main>
  )
}

export { Events }
