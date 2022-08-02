/* eslint-disable no-console */
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useGetCar } from "../../../hooks/useApi";
import { query as queryClient } from "../../../services";
import { deleteCarById } from "../../../services/http";
import { Heading, LinkGoTo, Loading } from "../../atoms";

import styles from "./styles.module.css";

function ManageCar() {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, data } = useGetCar(Number(id));

  async function DeleteCar(carId: number) {
    // eslint-disable-next-line no-alert
    const confirmation = confirm(
      "Você tem certeza que deseja excluir este carro?"
    );

    if (confirmation) {
      try {
        await deleteCarById(carId);
        await queryClient.invalidateQueries(["cars"]);
        router.push("/cars");
        toast.success("Carro deletado com sucesso! 🙂");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Cancelado");
    }
  }

  return (
    <main className={styles.container}>
      <Heading title="Gerencie o seu carro" />

      <motion.div
        layoutId="car-img"
        className="w-full h-64 mb-10 bg-center bg-[url('/carPage/car.jpg')]"
      />

      {isLoading ? (
        <Loading />
      ) : (
        <motion.section className={styles.carList}>
          <div className={styles.linksContainer}>
            <Link href="/cars/edit/[id]" as={`/cars/edit/${data?.id}`}>
              <a className={styles.carLink}>Editar o Carro</a>
            </Link>
            <button type="button" onClick={() => DeleteCar(Number(data?.id))}>
              <span className={styles.carLinkRemove}>Remover Carro</span>
            </button>
          </div>

          <motion.div
            layoutId={data?.["@key"]}
            key={data?.["@key"]}
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
              <p
                className={styles.carId}
              >{`Proprietario: ${data?.["@lastTouchBy"]}`}</p>
              <p className={styles.carId}>{`Id do Carro: ${data?.id}`}</p>
              <p
                className={styles.carPilot}
              >{`Id do piloto: ${data?.driver["@key"]}`}</p>
            </div>
          </motion.div>
        </motion.section>
      )}

      <LinkGoTo title="Voltar para seus carros" href="/cars" />
    </main>
  );
}

export { ManageCar };
