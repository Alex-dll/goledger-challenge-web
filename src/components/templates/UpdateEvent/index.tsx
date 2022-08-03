/* eslint-disable no-console */
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

import { useGetEventDetails, useGetTeams } from '../../../hooks/useApi'
import { query as queryClient } from '../../../services'
import {
  UpdateEvent as UpdateEventProps,
  updateEventAsset,
} from '../../../services/http'
import { Heading, LinkGoTo } from '../../atoms'

import styles from './styles.module.css'

function UpdateEvent() {
  const router = useRouter()
  const { id } = router.query

  const event = useGetEventDetails(String(id))

  const { data, isLoading } = useGetTeams()

  const [name, setName] = useState(event.data?.name)
  const [winner, setWinner] = useState(event.data?.winner['@key'])
  const [prize, setPrize] = useState(event.data?.prize)
  const [date, setDate] = useState<Date>(new Date())

  useCallback(() => {
    if (!isLoading && event.data) {
      setDate(new Date(event.data.date))
    }
  }, [])

  const findesTeam = data?.result.find((teams) => teams['@key'] === winner)

  const payload: UpdateEventProps = {
    update: {
      '@assetType': 'event',
      '@key': `${event.data?.['@key']}`,
      name: `${name}`,
      date,
      prize: Number(prize),
      winner: {
        '@assetType': 'team',
        '@key': `${findesTeam?.['@key']}`,
      },
    },
  }

  async function handleUpdateEvent() {
    if (!name || !winner || !prize || !date) {
      toast.error('Preencha todos os campos!')
    } else {
      try {
        await updateEventAsset({ payload })
        await queryClient.invalidateQueries(['events'])
        await queryClient.invalidateQueries(['event', id])
        router.push('/events')
        toast.success('Evento Atualizado com sucesso! 🙂')
      } catch (error) {
        toast.error('Não foi atualizar o evento! 😢')

        console.log(error)
      }
    }
  }

  return (
    <main className={styles.container}>
      <Heading title="Atualize o seu evento" />

      <motion.div
        layoutId="event-img"
        className="w-full h-64 mb-10 bg-center bg-[url('/eventPage/event.jpg')]"
      />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className={styles.list}
      >
        <form className="min-w-full px-8 pt-6 pb-8 mb-4 rounded">
          <div className="mb-6">
            <label
              htmlFor="large-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nome do Evento
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              disabled
            />
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Vencedor do evento
            </label>
            <select
              value={winner}
              onChange={(e) => setWinner(e.target.value)}
              className={styles.input}
            >
              <option>Selecione uma equipe</option>
              {data?.result.map((team) => (
                <option key={team.id} value={team['@key']}>
                  {team.name}
                </option>
              ))}
            </select>
            <label
              htmlFor="large-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Valor do prêmio
            </label>
            <input
              type="text"
              value={prize}
              onChange={(e) => setPrize(Number(e.target.value))}
              className={styles.input}
            />
            <label
              htmlFor="large-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Data do evento
            </label>
            <input
              type="date"
              className={styles.input}
              defaultValue={date?.toISOString().split('T')[0]}
              onChange={(e) => setDate(new Date(e.target.value))}
              disabled
            />
          </div>
        </form>
        <button
          type="button"
          className=" px-4 py-2 font-bold text-white bg-blue-500 rounded-full  hover:bg-blue-700"
          onClick={handleUpdateEvent}
        >
          Atualizar Evento
        </button>
      </motion.section>

      <LinkGoTo title="Voltar para seus eventos" href="/events" />
    </main>
  )
}

export { UpdateEvent }
