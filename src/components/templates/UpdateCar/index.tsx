/* eslint-disable no-console */
import { useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import { useGetCar, useGetDrivers } from '../../../hooks/useApi';
import { query as queryClient } from '../../../services';
import {
  UpdateCar as UpdateCarProps,
  updateCarAsset,
} from '../../../services/http';
import { Heading, LinkGoTo } from '../../atoms';

import styles from './styles.module.css';

function UpdateCar() {
  const router = useRouter();

  const { id } = router.query;

  const car = useGetCar(Number(id));
  const { data } = useGetDrivers();

  const [model, setModel] = useState(String(car.data?.model));
  const [pilot, setPilot] = useState(car?.data?.driver['@key']);

  const findesDriver = data?.result.find((driver) => driver['@key'] === pilot);

  console.log(findesDriver);

  const payload: UpdateCarProps = {
    update: {
      '@assetType': 'car',
      id: Number(car.data?.id),
      driver: {
        id: Number(findesDriver?.id),
        '@assetType': 'driver',
        '@key': String(findesDriver?.['@key']),
      },
      model,
    },
  };

  async function handleUpdateCar() {
    if (!model || !pilot) {
      toast.error('Preencha todos os campos!');
    } else {
      try {
        await updateCarAsset({ payload });
        await queryClient.invalidateQueries(['cars']);
        router.push('/cars');
        toast.success('Carro atualizado com sucesso! 🙂');
      } catch (error) {
        toast.error('Não foi atualizar o carro! 😢');

        console.log(error);
      }
    }
  }

  return (
    <main className={styles.container}>
      <Heading title="Crie um novo carro" />

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
                <option key={driver.id} value={driver['@key']}>
                  {driver.name}
                </option>
              ))}
            </select>
          </div>
        </form>
        <button
          type="button"
          className=" px-4 py-2 font-bold text-white bg-blue-500 rounded-full  hover:bg-blue-700"
          onClick={handleUpdateCar}
        >
          Atualizar Carro
        </button>
      </motion.section>

      <LinkGoTo title="Voltar para seus carros" href="/cars" />
    </main>
  );
}

export { UpdateCar };
