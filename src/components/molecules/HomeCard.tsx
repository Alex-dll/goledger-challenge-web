import { motion } from 'framer-motion'
import Link from 'next/link'

type Props = {
  layoutId: string
  href: string
  imgSrc: string
  title: string
}

function HomeCard({ layoutId, href, imgSrc, title }: Props) {
  return (
    <Link href={href}>
      <div className="relative z-10 flex flex-col items-center justify-center cursor-pointer align-center ali h-60 w-60 rounded-xl hover:brightness-75 transition">
        <motion.img
          src={imgSrc}
          className="w-full h-full rounded-xl"
          layoutId={layoutId}
        />
        <strong className="pt-2">{title}</strong>
      </div>
    </Link>
  )
}

export { HomeCard }
