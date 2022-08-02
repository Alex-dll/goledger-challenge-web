import { useState } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

import { useGetDrivers } from '../../../hooks/useApi'
import { query as queryClient } from '../../../services'
import { CreateCar as CreateCarType, createCar } from '../../../services/http'
import { Heading, LinkGoTo } from '../../atoms'

import styles from './styles.module.css'

function CreateCar() {
  const [model, setModel] = useState('')
  const [pilot, setPilot] = useState('')

  const { data } = useGetDrivers()

  const findesDriver = data?.result.find((driver) => driver.id > pilot)

  const router = useRouter()

  const payload: CreateCarType = {
    asset: [
      {
        '@assetType': 'car',
        id: Number(new Date().getTime()),
        driver: {
          id: Number(findesDriver?.id),
          '@assetType': 'driver',
          '@key': String(findesDriver?.['@key']),
        },
        model,
      },
    ],
  }

  async function handleCreateCar() {
    if (!model || !pilot) {
      toast.error('Preencha todos os campos!')
    } else {
      try {
        await createCar({ payload })
        await queryClient.invalidateQueries(['cars'])
        router.push('/cars')
        toast.success('Carro cadastrado com sucesso! 🙂')
      } catch (error) {
        toast.error('Não foi possível cadastrar o carro! 😢')
      }
    }
  }

  return (
    <main className={styles.container}>
      <Heading title="Cadastre um novo carro" />

      <motion.div
        layoutId="car-img"
        className="w-full h-64 mb-10 bg-center bg-[url('/carPage/car.jpg')]"
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
              Modelo do Carro
            </label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className={styles.input}
            />
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Piloto do carro
            </label>
            <select
              value={pilot}
              onChange={(e) => setPilot(e.target.value)}
              className={styles.input}
            >
              <option>Selecione um piloto</option>
              {data?.result.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.name}
                </option>
              ))}
            </select>
          </div>
        </form>
        <button
          type="button"
          className=" px-4 py-2 font-bold text-white bg-blue-500 rounded-full  hover:bg-blue-700"
          onClick={handleCreateCar}
        >
          Cadastrar Carro
        </button>
      </motion.section>

      <LinkGoTo title="Voltar para seus carros" href="/cars" />
    </main>
  )
}

export { CreateCar }
