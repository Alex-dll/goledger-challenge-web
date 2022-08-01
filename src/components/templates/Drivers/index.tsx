import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { useGetDrivers } from '../../../hooks/useApi';
import { Heading, LinkGoTo, Loading } from '../../atoms';

import styles from './styles.module.css';

function Drivers() {
  const { data, isLoading } = useGetDrivers();

  return (
    <main className={styles.container}>
      <Heading title="Gerencie seus pilotos" />

      <motion.div
        layoutId="racer-img"
        className="w-full h-64 mb-10 bg-center  bg-[url('/driversPage/driver.jpg')]"
      />

      <div className="flex justify-center w-full pb-12">
        <Link href="/drivers/create" as="/drivers/create">
          <a className={styles.carCreate}>Cadastre um piloto</a>
        </Link>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <motion.section className={styles.carList}>
          {data?.result.map((driver) => (
            <motion.div
              layoutId={driver['@key']}
              key={driver['@key']}
              className={styles.carCard}
            >
              <Image
                src="/driversPage/iconDriver.png"
                alt="Icone de um carro vermelho"
                className="rounded-full"
                width={64}
                height={64}
              />
              <div className={styles.wrapper}>
                <h2 className={styles.carName}>{driver.name}</h2>
                <p className={styles.carId}>{`Id do piloto: ${driver.id}`}</p>
                <p
                  className={styles.carPilot}
                >{`Id da equipe do piloto: ${driver.team['@key']}`}</p>
              </div>
              <Link href="/drivers/[id]" as={`/drivers/${driver.id}`}>
                <a className={styles.carLink}>Ver Piloto</a>
              </Link>
            </motion.div>
          ))}
        </motion.section>
      )}

      <LinkGoTo title="Voltar para a home" href="/" />
    </main>
  );
}

export { Drivers };
