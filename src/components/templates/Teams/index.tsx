import { motion } from 'framer-motion'
import Link from 'next/link'

import { useGetTeams } from '../../../hooks/useApi'
import { Heading, LinkGoTo, Loading } from '../../atoms'
import { ItemCard } from '../../organisms'

import styles from './styles.module.css'

function Teams() {
  const { data, isLoading } = useGetTeams()

  return (
    <main className={styles.container}>
      <Heading title="Gerencie seus times" />

      <motion.div
        layoutId="team-img"
        className="w-full h-64 mb-10 bg-center  bg-[url('/teamPage/team.jpg')]"
      />

      <div className="flex justify-center w-full pb-12">
        <Link href="/teams/create" as="/teams/create">
          <a className={styles.carCreate}>Cadastre um time</a>
        </Link>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <motion.section className={styles.carList}>
          {data?.result.map((teams) => (
            <ItemCard
              key={teams?.['@key']}
              type={'teams'}
              layoutId={`${teams?.['@key']}`}
              name={`${teams?.name}`}
              id={Number(teams?.id)}
              subtitle={teams?.['@key']}
              visible
            />
          ))}
        </motion.section>
      )}

      <LinkGoTo title="Voltar para a home" href="/" />
    </main>
  )
}

export { Teams }
