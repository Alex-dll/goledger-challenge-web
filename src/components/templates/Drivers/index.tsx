import { motion } from 'framer-motion'
import Link from 'next/link'

import { useGetDrivers } from '../../../hooks/useApi'
import { Heading, LinkGoTo, Loading } from '../../atoms'
import { ItemCard } from '../../organisms'

import styles from './styles.module.css'

function Drivers() {
  const { data, isLoading } = useGetDrivers()

  return (
    <main className={styles.container}>
      <Heading title="Gerencie seus pilotos" />

      <motion.div
        layoutId="racer-img"
        className="w-full h-64 mb-10 bg-center  bg-[url('/driverPage/driver.jpg')]"
      />

      <div className="flex justify-center w-full pb-12">
        <Link href="/drivers/create" as="/drivers/create">
          <a className={styles.carCreate}>Cadastre um piloto</a>
        </Link>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <motion.section className={styles.carList}>
          {data?.result.map((driver) => (
            <ItemCard
              key={driver['@key']}
              id={driver.id}
              layoutId={driver['@key']}
              name={driver.name}
              type={'drivers'}
              subtitle={driver['@key']}
              visible
            />
          ))}
        </motion.section>
      )}

      <LinkGoTo title="Voltar para a home" href="/" />
    </main>
  )
}

export { Drivers }
