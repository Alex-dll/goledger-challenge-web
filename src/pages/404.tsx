import { LinkGoTo } from '../components';

export default function Page404() {
  return (
    <section>
      <div className="min-h-screen px-4 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
        <div className="flex flex-col w-full mb-12 text-left lg:text-center">
          <h2 className="max-w-xl mx-auto my-8 text-5xl text-left lg:text-center font-spooky animate-pulse">
            OOPS!
          </h2>
          <p className="max-w-xl mx-auto my-4 text-2xl text-left lg:text-center">
            Pagina não encontrada
          </p>
          <LinkGoTo title="voltar para a home" href="/" />
        </div>
      </div>
    </section>
  );
}
