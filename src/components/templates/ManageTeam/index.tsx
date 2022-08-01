/* eslint-disable no-console */
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useGetDriverById } from '../../../hooks/useApi';
import { query as queryClient } from '../../../services';
import { DeleteDriverById } from '../../../services/http';
import { Heading, LinkGoTo, Loading } from '../../atoms';

import styles from './styles.module.css';

function ManageTeam() {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, data } = useGetDriverById(Number(id));

  async function DeleteDriver(driverId: number) {
    // eslint-disable-next-line no-alert
    const confirmation = confirm(
      'Você tem certeza que deseja excluir este piloto?',
    );

    if (confirmation) {
      try {
        await DeleteDriverById(driverId);
        await queryClient.invalidateQueries(['drivers']);
        router.push('/drivers');
        toast.success('Piloto deletado com sucesso! 🙂');
      } catch (error) {
        toast.error('Não foi possível deletar o piloto! 😢');

        console.log(error);
      }
    } else {
      console.log('Cancelado');
    }
  }

  return (
    <main className={styles.container}>
      <Heading title="Gerencie o seu piloto" />

      <motion.div
        layoutId="driver-img"
        className="w-full h-64 mb-10 bg-center bg-[url('/driversPage/driver.jpg')]"
      />

      {isLoading ? (
        <Loading />
      ) : (
        <motion.section className={styles.carList}>
          <div className={styles.linksContainer}>
            <Link href="/drivers/edit/[id]" as={`/drivers/edit/${data?.id}`}>
              <a className={styles.carLink}>Editar o Piloto</a>
            </Link>
            <button
              type="button"
              onClick={() => DeleteDriver(Number(data?.id))}
            >
              <span className={styles.carLinkRemove}>Remover Piloto</span>
            </button>
          </div>

          <motion.div
            layoutId={data?.['@key']}
            key={data?.['@key']}
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
              <h2 className={styles.carName}>{data?.name}</h2>
              <p
                className={styles.carId}
              >{`Id do Time: ${data?.team['@key']}`}</p>
              <p className={styles.carId}>{`Id do Piloto: ${data?.id}`}</p>
              <p
                className={styles.carPilot}
              >{`Chave do piloto: ${data?.['@key']}`}</p>
            </div>
          </motion.div>
        </motion.section>
      )}

      <LinkGoTo title="Voltar para seus pilotos" href="/drivers" />
    </main>
  );
}

export { ManageTeam };
