import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import { useGetTeams } from '../../../hooks/useApi'
import { Heading, LinkGoTo, Loading } from '../../atoms'

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
            <motion.div
              layoutId={teams['@key']}
              key={teams['@key']}
              className={styles.carCard}
            >
              <Image
                src="/teamPage/iconTeam.png"
                alt="Icone que representa varios times"
                className="rounded-full"
                width={64}
                height={64}
              />
              <div className={styles.wrapper}>
                <h2 className={styles.carName}>{teams.name}</h2>
                <p className={styles.carPilot}>{`Id do time: ${teams['@key']}`}</p>
              </div>
              <Link href="/teams/[id]" as={`/teams/${teams.id}`}>
                <a className={styles.carLink}>Ver time</a>
              </Link>
            </motion.div>
          ))}
        </motion.section>
      )}

      <LinkGoTo title="Voltar para a home" href="/" />
    </main>
  )
}

export { Teams }
