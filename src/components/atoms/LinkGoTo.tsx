import { motion } from 'framer-motion';
import Link from 'next/link';

type Props = {
  title: string;
  href: string;
};

function LinkGoTo({ title, href }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.3 }}
      className="py-8"
    >
      <Link href={href}>
        <a className="px-6 py-3 text-lg font-semibold bg-gray-900 text-gray-50 rounded-xl hover:bg-gray-700 transition">
          {title}
        </a>
      </Link>
    </motion.div>
  );
}

export { LinkGoTo };
