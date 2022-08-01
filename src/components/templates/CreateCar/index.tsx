/* eslint-disable no-console */
import { useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import { query as queryClient } from '../../../services';
import { Heading, LinkGoTo } from '../../atoms';

import styles from './styles.module.css';

function CreateCar() {
  const [model, setModel] = useState('');
  const [pilot, setPilot] = useState('');

  const router = useRouter();

  async function handleCreateCar(carId: number) {
    try {
      console.log(carId);
      await queryClient.invalidateQueries(['cars']);
      router.push('/cars');
      toast.success('Carro cadastrado com sucesso! 🙂');
    } catch (error) {
      console.log(error);
    }
  }

  console.log(handleCreateCar);

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
        className={styles.carList}
      >
        <form className="min-w-full px-8 pt-6 pb-8 mb-4 rounded ">
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
              className="block w-full p-4 mb-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
            />
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Piloto do carro
            </label>
            <select
              value={pilot}
              onChange={(e) => setPilot(e.target.value)}
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Selecione um piloto</option>
              <option>Piloto 1</option>
              <option>Piloto 2</option>
            </select>
          </div>
        </form>
      </motion.section>

      <LinkGoTo title="Voltar para seus carros" href="/cars" />
    </main>
  );
}

export { CreateCar };
