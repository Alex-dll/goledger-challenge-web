import { motion } from 'framer-motion'
import Link from 'next/link'

import { useGetCars } from '../../../hooks/useApi'
import { Heading, LinkGoTo, Loading } from '../../atoms'
import { ItemCard } from '../../organisms'

import styles from './styles.module.css'

function Cars() {
  const { data, isLoading } = useGetCars()

  return (
    <main className={styles.container}>
      <Heading title="Gerencie seus carros" />

      <motion.div
        layoutId="car-img"
        className="w-full h-64 mb-10 bg-center bg-[url('/carPage/car.jpg')]"
      />

      <div className="flex justify-center w-full pb-12">
        <Link href="/cars/create" as="/cars/create">
          <a className={styles.carCreate}>Cadastre um carro</a>
        </Link>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <motion.section className={styles.carList}>
          {data?.result.map((car) => (
            <ItemCard
              key={car['@key']}
              type={'cars'}
              layoutId={car['@key']}
              name={car.model}
              id={car.id}
              subtitle={car['@key']}
              visible
            />
          ))}
        </motion.section>
      )}

      <LinkGoTo title="Voltar para a home" href="/" />
    </main>
  )
}

export { Cars }
