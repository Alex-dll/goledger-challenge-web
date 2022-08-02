/* eslint-disable no-console */
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useGetTeamById } from "../../../hooks/useApi";
import { query as queryClient } from "../../../services";
import { DeleteDriverById } from "../../../services/http";
import { Heading, LinkGoTo, Loading } from "../../atoms";

import styles from "./styles.module.css";

function ManageTeam() {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, data } = useGetTeamById(Number(id));

  async function DeleteTeam(teamId: number) {
    // eslint-disable-next-line no-alert
    const confirmation = confirm(
      "Você tem certeza que deseja excluir este time?"
    );

    if (confirmation) {
      try {
        await DeleteDriverById(teamId);
        await queryClient.invalidateQueries(["teams"]);
        router.push("/teams");
        toast.success("Time deletado com sucesso! 🙂");
      } catch (error) {
        toast.error("Não foi possível deletar o time! 😢");

        console.log(error);
      }
    } else {
      console.log("Cancelado");
    }
  }

  return (
    <main className={styles.container}>
      <Heading title="Gerencie o seu time" />

      <motion.div
        layoutId="driver-img"
        className="w-full h-64 mb-10 bg-center bg-[url('/teamPage/team.jpg')]"
      />

      {isLoading ? (
        <Loading />
      ) : (
        <motion.section className={styles.carList}>
          <div className={styles.linksContainer}>
            <Link href="/teams/edit/[id]" as={`/teams/edit/${data?.id}`}>
              <a className={styles.carLink}>Editar o time</a>
            </Link>
            <button type="button" onClick={() => DeleteTeam(Number(data?.id))}>
              <span className={styles.carLinkRemove}>Remover Time</span>
            </button>
          </div>

          <motion.div
            layoutId={data?.["@key"]}
            key={data?.["@key"]}
            className={styles.carCard}
          >
            <Image
              src="/teamPage/iconTeam.png"
              alt="Icone de um time"
              className="rounded-full"
              width={64}
              height={64}
            />
            <div className={styles.wrapper}>
              <h2 className={styles.carName}>{data?.name}</h2>
              <p className={styles.carId}>{`Nome do Time: ${data?.name}`}</p>
              <p className={styles.carId}>{`Id do Time: ${data?.id}`}</p>
              <p
                className={styles.carPilot}
              >{`Chave do time: ${data?.["@key"]}`}</p>
            </div>
          </motion.div>
        </motion.section>
      )}

      <LinkGoTo title="Voltar para seus times" href="/teams" />
    </main>
  );
}

export { ManageTeam };
