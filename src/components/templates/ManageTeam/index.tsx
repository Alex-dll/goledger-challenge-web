/* eslint-disable no-console */
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useGetEventDetails } from '../../../hooks/useApi'
import { query as queryClient } from '../../../services'
import { DeleteEventById } from '../../../services/http'
import { Heading, LinkGoTo, Loading } from '../../atoms'

import styles from './styles.module.css'
import { EventItemCard } from '../../organisms'

function ManageTeam() {
  const router = useRouter()
  const { id } = router.query

  const { isLoading, data } = useGetEventDetails(`${id}`)

  async function DeleteEvent(teamKey: string) {
    // eslint-disable-next-line no-alert
    const confirmation = confirm(
      'Você tem certeza que deseja excluir este time?',
    )

    if (confirmation) {
      try {
        await DeleteEventById(teamKey)
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
        className="w-full h-64 mb-10 bg-center bg-[url('/eventPage/event.jpg')]"
      />

      {isLoading ? (
        <Loading />
      ) : (
        <motion.section className={styles.carList}>
          <div className={styles.linksContainer}>
            <Link
              href={{
                pathname: `/events/edit/[id]`,
                query: { id: data?.['@key'] },
              }}
              passHref
            >
              <a className={styles.carLink}>Editar o Evento</a>
            </Link>
            <button
              type="button"
              onClick={() => DeleteEvent(`${data?.['@key']}`)}
            >
              <span className={styles.carLinkRemove}>Remover Evento</span>
            </button>
          </div>

          <EventItemCard
            key={data?.['@key']}
            layoutId={`${data?.['@key']}`}
            name={`${data?.name}`}
            data={data?.date === undefined ? new Date() : data?.date}
            winner={`${data?.winner['@key']}`}
            eventKey={`${data?.['@key']}`}
          />
        </motion.section>
      )}

      <LinkGoTo title="Voltar para seus eventos" href="/events" />
    </main>
  )
}

export { ManageTeam }
