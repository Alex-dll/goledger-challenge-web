/* eslint-disable no-console */
import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import { useGetDriverById, useGetTeams } from "../../../hooks/useApi";
import { query as queryClient } from "../../../services";
import {
  UpdateDriver as UpdateDriverProps,
  updateDriverAsset,
} from "../../../services/http";
import { Heading, LinkGoTo } from "../../atoms";

import styles from "./styles.module.css";

function UpdateTeam() {
  const router = useRouter();

  const { id } = router.query;

  const driver = useGetDriverById(Number(id));

  const [name, setName] = useState(String(driver.data?.name));
  const [team, setTeam] = useState(driver?.data?.team["@key"]);

  const { data } = useGetTeams();

  const findesTeam = data?.result.find((teams) => teams["@key"] === team);

  const payload: UpdateDriverProps = {
    update: {
      "@assetType": "driver",
      id: Number(id),
      name,
      team: {
        "@assetType": "team",
        "@key": String(findesTeam?.["@key"]),
      },
    },
  };

  async function handleUpdateCar() {
    if (!name || !team) {
      toast.error("Preencha todos os campos!");
    } else {
      try {
        await updateDriverAsset({ payload });
        await queryClient.invalidateQueries(["drivers"]);
        router.push("/drivers");
        toast.success("Piloto atualizado com sucesso! 🙂");
      } catch (error) {
        toast.error("Não foi atualizar o piloto! 😢");

        console.log(error);
      }
    }
  }

  return (
    <main className={styles.container}>
      <Heading title="Atualize o seu piloto" />

      <motion.div
        layoutId="driver-img"
        className="w-full h-64 mb-10 bg-center bg-[url('/driversPage/driver.jpg')]"
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
              Nome do Piloto
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Time do piloto
            </label>
            <select
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className={styles.input}
            >
              <option>Selecione um time</option>
              {data?.result.map((teams) => (
                <option key={teams.id} value={teams["@key"]}>
                  {teams.name}
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
          Atualizar Piloto
        </button>
      </motion.section>

      <LinkGoTo title="Voltar para seus pilotos" href="/drivers" />
    </main>
  );
}

export { UpdateTeam };
