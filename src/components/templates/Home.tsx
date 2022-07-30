import { Card } from '../molecules';

function Home() {
  return (
    <div>
      <h1 className="mt-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 sm:text-6xl md:mt-24">
        Gerencie seus carros, pilotos, times e eventos em um so lugar
      </h1>

      <div className="flex flex-row flex-wrap items-center justify-center mt-10 align-center md:mt-24 gap-12">
        <Card
          layoutId="car-img"
          href="/cars"
          imgSrc="/car.jpg"
          title="Carros"
        />
        <Card
          layoutId="racer-img"
          href="#"
          imgSrc="/racer.jpg"
          title="Pilotos"
        />
        <Card layoutId="team-img" href="#" imgSrc="/team.jpg" title="Times" />
        <Card
          layoutId="event-img"
          href="#"
          imgSrc="/event.jpg"
          title="Eventos"
        />
      </div>
    </div>
  );
}

export { Home };
