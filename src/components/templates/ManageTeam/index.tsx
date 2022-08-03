/* eslint-disable no-console */
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useGetTeamById } from '../../../hooks/useApi'
import { query as queryClient } from '../../../services'
import { DeleteTeamById } from '../../../services/http'
import { Heading, LinkGoTo, Loading } from '../../atoms'

import styles from './styles.module.css'
import { ItemCard } from '../../organisms'

function ManageTeam() {
  const router = useRouter()
  const { id } = router.query

  const { isLoading, data } = useGetTeamById(Number(id))

  async function DeleteTeam(teamId: number) {
    // eslint-disable-next-line no-alert
    const confirmation = confirm(
      'Você tem certeza que deseja excluir este time?',
    )

    if (confirmation) {
      try {
        await DeleteTeamById(teamId)
        await queryClient.invalidateQueries(['teams'])
        router.push('/teams')
        toast.success('Time deletado com sucesso! 🙂')
      } catch (error) {
        toast.error('Não foi possível deletar o time! 😢')

        console.log(error)
      }
    } else {
      console.log('Cancelado')
    }
  }

  return (
    <main className={styles.container}>
      <Heading title="Gerencie o seu time" />

      <motion.div
        layoutId="driver-img"
        className="w-full h-64 mb-10 bg-center bg-[url('/teamPage/team.jpg')]"
      />

      {isLoading ? (
        <Loading />
      ) : (
        <motion.section className={styles.carList}>
          <div className={styles.linksContainer}>
            <Link href="/teams/edit/[id]" as={`/teams/edit/${data?.id}`}>
              <a className={styles.carLink}>Editar o time</a>
            </Link>
            <button type="button" onClick={() => DeleteTeam(Number(data?.id))}>
              <span className={styles.carLinkRemove}>Remover Time</span>
            </button>
          </div>

          <ItemCard
            key={data?.['@key']}
            type={'teams'}
            layoutId={`${data?.['@key']}`}
            name={`${data?.name}`}
            id={Number(data?.id)}
            subtitle={data?.['@key']}
          />
        </motion.section>
      )}

      <LinkGoTo title="Voltar para seus times" href="/teams" />
    </main>
  )
}

export { ManageTeam }
