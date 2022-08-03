/* eslint-disable no-console */
import { useState } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

import { useGetTeams } from '../../../hooks/useApi'
import { query as queryClient } from '../../../services'
import {
  CreateEvent as CreateEventProps,
  createEventAsset,
} from '../../../services/http'
import { Heading, LinkGoTo } from '../../atoms'

import styles from './styles.module.css'

function CreateEvent() {
  const router = useRouter()

  const { data } = useGetTeams()

  const [name, setName] = useState('')
  const [winner, setWinner] = useState('')
  const [prize, setPrize] = useState(0)
  const [date, setDate] = useState<Date>()

  const findesTeam = data?.result.find((teams) => teams['@key'] === winner)

  const payload: CreateEventProps = {
    asset: [
      {
        '@assetType': 'event',
        date: date ?? new Date(),
        name: `${name}`,
        prize: Number(prize),
        winner: {
          '@assetType': 'team',
          '@key': `${findesTeam?.['@key']}`,
        },
      },
    ],
  }

  async function handleCreateEvent() {
    if (!name || !winner || !prize || !date) {
      toast.error('Preencha todos os campos!')
    } else {
      try {
        await createEventAsset({ payload })
        await queryClient.invalidateQueries(['events'])
        router.push('/events')
        toast.success('Evento Atualizado com sucesso! 🙂')
      } catch (error) {
        toast.error('Não foi atualizar o evento! 😢')
      }
    }
  }

  return (
    <main className={styles.container}>
      <Heading title="Crie um evento" />

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
              defaultValue={date?.toISOString().split('T')[0]}
              className={styles.input}
              onChange={(e) => setDate(new Date(e.target.value))}
            />
          </div>
        </form>
        <button
          type="button"
          className=" px-4 py-2 font-bold text-white bg-blue-500 rounded-full  hover:bg-blue-700"
          onClick={handleCreateEvent}
        >
          Criar Evento
        </button>
      </motion.section>

      <LinkGoTo title="Voltar para seus eventos" href="/events" />
    </main>
  )
}

export { CreateEvent }
