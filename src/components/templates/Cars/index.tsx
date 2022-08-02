import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { useGetCars } from "../../../hooks/useApi";
import { Heading, LinkGoTo, Loading } from "../../atoms";

import styles from "./styles.module.css";

function Cars() {
  const { data, isLoading } = useGetCars();

  return (
    <main className={styles.container}>
      <Heading title="Gerencie seus carros" />

      <motion.div
        layoutId="car-img"
        className="w-full h-64 mb-10 bg-center  bg-[url('/carPage/car.jpg')]"
      />

      <div className="flex justify-center w-full pb-12">
        <Link href="/cars/create" as="/cars/create">
          <a className={styles.carCreate}>Cadastre um carro</a>
        </Link>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <motion.section className={styles.carList}>
          {data?.result.map((car) => (
            <motion.div
              layoutId={car["@key"]}
              key={car["@key"]}
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
                <h2 className={styles.carName}>{car.model}</h2>
                <p className={styles.carId}>{`Id do Carro: ${car.id}`}</p>
                <p
                  className={styles.carPilot}
                >{`Id do piloto: ${car.driver["@key"]}`}</p>
              </div>
              <Link href="/cars/[id]" as={`/cars/${car.id}`}>
                <a className={styles.carLink}>Ver carro</a>
              </Link>
            </motion.div>
          ))}
        </motion.section>
      )}

      <LinkGoTo title="Voltar para a home" href="/" />
    </main>
  );
}

export { Cars };
