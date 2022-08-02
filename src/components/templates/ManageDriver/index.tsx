/* eslint-disable no-console */
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useGetDriverById } from '../../../hooks/useApi'
import { query as queryClient } from '../../../services'
import { DeleteDriverById } from '../../../services/http'
import { Heading, LinkGoTo, Loading } from '../../atoms'

import styles from './styles.module.css'
import { ItemCard } from '../../organisms'

function ManageDriver() {
  const router = useRouter()
  const { id } = router.query

  const { isLoading, data } = useGetDriverById(Number(id))

  async function DeleteDriver(driverId: number) {
    // eslint-disable-next-line no-alert
    const confirmation = confirm(
      'Você tem certeza que deseja excluir este piloto?',
    )

    if (confirmation) {
      try {
        await DeleteDriverById(driverId)
        await queryClient.invalidateQueries(['drivers'])
        router.push('/drivers')
        toast.success('Piloto deletado com sucesso! 🙂')
      } catch (error) {
        toast.error('Não foi possível deletar o piloto! 😢')

        console.log(error)
      }
    } else {
      console.log('Cancelado')
    }
  }

  return (
    <main className={styles.container}>
      <Heading title="Gerencie o seu piloto" />

      <motion.div
        layoutId="driver-img"
        className="w-full h-64 mb-10 bg-center bg-[url('/driverPage/driver.jpg')]"
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

          <ItemCard
            key={data?.['@key']}
            type={'drivers'}
            layoutId={`${data?.['@key']}`}
            name={`${data?.name}`}
            id={Number(data?.id)}
            subtitle={data?.['@key']}
          />
        </motion.section>
      )}

      <LinkGoTo title="Voltar para seus pilotos" href="/drivers" />
    </main>
  )
}

export { ManageDriver }
