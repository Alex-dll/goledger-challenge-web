import {
  getCarById,
  getCars,
  getDriverById,
  getDrivers,
  getTeamById,
  getTeams,
} from '../services/http'
import { query } from '../services/query'

export async function handleCars() {
  await query.prefetchQuery(['cars'], () => getCars(), {
    staleTime: 1000 * 60,
  })
}

export function handleGetCarById(id: number) {
  return query.prefetchQuery(['car', id], () => getCarById(id), {
    staleTime: 1000 * 60,
  })
}

export async function handleDrivers() {
  await query.prefetchQuery(['drivers'], () => getDrivers(), {
    staleTime: 1000 * 60,
  })
}

export function handleDriverById(id: number) {
  return query.prefetchQuery(['driver', id], () => getDriverById(id), {
    staleTime: 1000 * 60,
  })
}

export async function handleTeams() {
  await query.prefetchQuery(['teams'], () => getTeams(), {
    staleTime: 1000 * 60,
  })
}

export function handleGetTeamById(id: number) {
  return query.prefetchQuery([`team`, id], () => getTeamById(id), {
    staleTime: 1000 * 60,
  })
}

export async function handleEvents() {
  await query.prefetchQuery(['events'], () => getCars(), {
    staleTime: 1000 * 60,
  })
}
