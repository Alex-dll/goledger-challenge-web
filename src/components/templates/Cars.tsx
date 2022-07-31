import { motion } from 'framer-motion';
import Link from 'next/link';

function Cars() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="my-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 sm:text-6xl md:my-24">
        Gerencie seus carros
      </h1>

      <motion.div
        layoutId="car-img"
        className="w-full h-64 mb-10 bg-center md:mb-24 bg-[url('/carPage/car.jpg')]"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <Link href="/">
          <a className="px-6 py-3 text-lg font-semibold bg-gray-900 text-gray-50 rounded-xl hover:bg-gray-700 transition">
            Voltar para a home
          </a>
        </Link>
      </motion.div>
    </div>
  );
}

export { Cars };
