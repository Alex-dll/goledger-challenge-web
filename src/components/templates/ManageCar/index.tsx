import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useGetCar } from '../../../hooks/useApi';
import { GoHome, Heading } from '../../atoms';

import styles from './styles.module.css';

function ManageCar() {
  const { query } = useRouter();
  const { id } = query;

  const { isLoading, data } = useGetCar(String(id));

  return (
    <div className={styles.container}>
      <Heading title="Gerencie o seu carro" />

      <motion.div
        layoutId="car-img"
        className="w-full h-64 mb-10 bg-center md:mb-24 bg-[url('/carPage/car.jpg')]"
      />

      {isLoading ? (
        <h1>Is Loading</h1>
      ) : (
        <motion.section className={styles.carList}>
          <div className={styles.linksContainer}>
            <Link href="/cars/edit/[id]" as={`/cars/${data?.id}`}>
              <a className={styles.carLink}>Editar o Carro</a>
            </Link>
            <button type="button">
              <span className={styles.carLinkRemove}>Remover Carro</span>
            </button>
          </div>

          <motion.div
            layoutId={data?.['@key']}
            key={data?.['@key']}
            className={styles.carCard}
          >
            <Image
              src="/carPage/iconCar.png"
              alt="Icone de um carro vermelho"
              className="rounded-full"
              width={64}
              height={64}
            />
            <div className={styles.wrapper}>
              <h2 className={styles.carName}>{data?.model}</h2>
              <p className={styles.carId}>{`Id do Carro: ${data?.id}`}</p>
              <p
                className={styles.carPilot}
              >{`Id do piloto: ${data?.driver['@key']}`}</p>
            </div>
          </motion.div>
        </motion.section>
      )}

      <GoHome title="Voltar para seus carros" href="/cars" />
    </div>
  );
}

export { ManageCar };
