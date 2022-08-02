import Image from 'next/image'
import Link from 'next/link'

function Header() {
  return (
    <header className="flex justify-center py-2 md:justify-between md:py-4 itens-center">
      <Link href="/">
        <Image
          src="/GoLedger.png"
          alt="Logo da GoLedger"
          width={180}
          height={45}
          loading="eager"
        />
      </Link>

      <nav className="hidden md:block space-x-8">
        <Link href="/cars">
          <a className="tracking-wide hover:text-blue-300">Carros</a>
        </Link>
        <Link href="/drivers">
          <a className="tracking-wide hover:text-blue-300">Pilotos</a>
        </Link>
        <Link href="/teams">
          <a className="tracking-wide hover:text-blue-300">Times</a>
        </Link>
        <Link href="/events">
          <a className="tracking-wide hover:text-blue-300">Equipes</a>
        </Link>
      </nav>
    </header>
  )
}

export { Header }
