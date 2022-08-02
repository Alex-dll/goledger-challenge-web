/* eslint-disable no-console */
import { useState } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

import { query as queryClient } from '../../../services'
import {
  createTeamAsset,
  CreateTeams as CreateTeamsProps,
} from '../../../services/http'
import { Heading, LinkGoTo } from '../../atoms'

import styles from './styles.module.css'

function CreateTeam() {
  const router = useRouter()

  const [name, setName] = useState('')

  const payload: CreateTeamsProps = {
    asset: [
      {
        '@assetType': 'team',
        id: Number(new Date().getTime()),
        name,
      },
    ],
  }

  async function handleUpdateTeam() {
    if (!name) {
      toast.error('Preencha todos os campos!')
    } else {
      try {
        await createTeamAsset({ payload })
        await queryClient.invalidateQueries(['teams'])
        router.push('/teams')
        toast.success('Time atualizado com sucesso! 🙂')
      } catch (error) {
        toast.error('Não foi atualizar o time! 😢')

        console.log(error)
      }
    }
  }

  return (
    <main className={styles.container}>
      <Heading title="Crie o seu time" />

      <motion.div
        layoutId="driver-img"
        className="w-full h-64 mb-10 bg-center bg-[url('/teamPage/team.jpg')]"
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
              Nome do Time
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
          </div>
        </form>
        <button
          type="button"
          className=" px-4 py-2 font-bold text-white bg-blue-500 rounded-full  hover:bg-blue-700"
          onClick={handleUpdateTeam}
        >
          Cadastrar
        </button>
      </motion.section>

      <LinkGoTo title="Voltar para seus times" href="/teams" />
    </main>
  )
}

export { CreateTeam }
