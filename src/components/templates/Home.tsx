import {
  handleCars,
  handleDrivers,
  handleEvents,
  handleTeams,
} from '../../hooks/usePrefetch'
import { Heading } from '../atoms'
import { HomeCard } from '../molecules'

function Home() {
  return (
    <div>
      <Heading title="Gerencie seus carros, pilotos, times e eventos em um so lugar" />

      <div className="flex flex-row flex-wrap items-center justify-center mt-10 align-center md:mt-24 gap-12">
        <HomeCard
          layoutId="car-img"
          href="/cars"
          imgSrc="/home/car.jpg"
          title="Carros"
          prefetch={handleCars}
        />
        <HomeCard
          layoutId="racer-img"
          href="/drivers"
          imgSrc="/home/racer.jpg"
          title="Pilotos"
          prefetch={handleDrivers}
        />
        <HomeCard
          layoutId="team-img"
          href="/teams"
          imgSrc="/home/team.jpg"
          title="Times"
          prefetch={handleTeams}
        />
        <HomeCard
          layoutId="event-img"
          href="/events"
          imgSrc="/home/event.jpg"
          title="Eventos"
          prefetch={handleEvents}
        />
      </div>
    </div>
  )
}

export { Home }
