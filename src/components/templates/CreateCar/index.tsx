/* eslint-disable no-console */
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { query as queryClient } from '../../../services';
import { Heading, LinkGoTo } from '../../atoms';

import styles from './styles.module.css';

function CreateCar() {
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
      <Heading title="Gerencie o seu carro" />

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
        <div className={styles.carCard}>
          <Image
            src="/carPage/iconCar.png"
            alt="Icone de um carro vermelho"
            className="rounded-full"
            width={64}
            height={64}
          />
          <div className={styles.wrapper}>
            <h2 className={styles.carName}>modelo</h2>
            <p className={styles.carId}>Proprietario</p>
            <p className={styles.carId}>id</p>
            <p className={styles.carPilot}>id do piloto</p>
          </div>
        </div>
      </motion.section>

      <LinkGoTo title="Voltar para seus carros" href="/cars" />
    </main>
  );
}

export { CreateCar };
