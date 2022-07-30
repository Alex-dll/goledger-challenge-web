import Image from 'next/image';

function Header() {
  return (
    <header className="flex items-center justify-between h-16 py-2">
      <Image
        src="/GoLedger.png"
        alt="Logo da GoLedger"
        width="188px"
        height="45px"
        loading="eager"
      />
    </header>
  );
}

export { Header };
