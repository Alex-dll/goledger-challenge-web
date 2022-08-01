import { Heading } from '../atoms';
import { Card } from '../molecules';

function Home() {
  return (
    <div>
      <Heading title="Gerencie seus carros, pilotos, times e eventos em um so lugar" />

      <div className="flex flex-row flex-wrap items-center justify-center mt-10 align-center md:mt-24 gap-12">
        <Card
          layoutId="car-img"
          href="/cars"
          imgSrc="/home/car.jpg"
          title="Carros"
        />
        <Card
          layoutId="racer-img"
          href="#"
          imgSrc="/home/racer.jpg"
          title="Pilotos"
        />
        <Card
          layoutId="team-img"
          href="#"
          imgSrc="/home/team.jpg"
          title="Times"
        />
        <Card
          layoutId="event-img"
          href="#"
          imgSrc="/home/event.jpg"
          title="Eventos"
        />
      </div>
    </div>
  );
}

export { Home };
