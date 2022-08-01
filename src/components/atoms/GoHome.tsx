import { motion } from 'framer-motion';
import Link from 'next/link';

type Props = {
  title: string;
  href: string;
};

function GoHome({ title, href }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className="py-4"
    >
      <Link href={href}>
        <a className="px-6 py-3 text-lg font-semibold bg-gray-900 text-gray-50 rounded-xl hover:bg-gray-700 transition">
          {title}
        </a>
      </Link>
    </motion.div>
  );
}

export { GoHome };
