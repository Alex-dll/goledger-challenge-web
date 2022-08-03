import { getCars, getDrivers, getTeams, getEvents } from '../services/http'
import { query } from '../services/query'

export async function handleCars() {
  await query.prefetchQuery(['cars'], () => getCars(), {
    staleTime: 1000 * 60,
  })
}

export async function handleDrivers() {
  await query.prefetchQuery(['drivers'], () => getDrivers(), {
    staleTime: 1000 * 60,
  })
}

export async function handleTeams() {
  await query.prefetchQuery(['teams'], () => getTeams(), {
    staleTime: 1000 * 60,
  })
}

export async function handleEvents() {
  await query.prefetchQuery(['events'], () => getEvents(), {
    staleTime: 1000 * 60,
  })
}
