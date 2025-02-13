import Image from 'next/image'
import Link from 'next/link'

import styles from './styles.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" passHref>
        <a>
          <Image
            src="/GoLedger.png"
            alt="Logo da GoLedger"
            width={180}
            height={45}
            loading="eager"
            priority
          />
        </a>
      </Link>

      <nav className={styles['nav-bar']}>
        <Link href="/cars" passHref>
          <a className={styles.anchor}>Carros</a>
        </Link>
        <Link href="/drivers" passHref>
          <a className={styles.anchor}>Pilotos</a>
        </Link>
        <Link href="/teams" passHref>
          <a className={styles.anchor}>Times</a>
        </Link>
        <Link href="/events" passHref>
          <a className={styles.anchor}>Eventos</a>
        </Link>
      </nav>
    </header>
  )
}

export { Header }
