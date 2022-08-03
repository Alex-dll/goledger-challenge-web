import { useQuery } from '@tanstack/react-query'

import {
  getCarById,
  getCars,
  getDriverById,
  getDrivers,
  getEventDetails,
  getEvents,
  getTeamById,
  getTeams,
} from '../services/http'

export function useGetCars() {
  return useQuery([`cars`], () => getCars(), {
    staleTime: 1000 * 60,
  })
}

export function useGetCar(id: number) {
  return useQuery(['car', id], () => getCarById(id), {
    staleTime: 1000 * 60,
  })
}

export function useGetDrivers() {
  return useQuery([`drivers`], () => getDrivers(), {
    staleTime: 1000 * 60,
  })
}

export function useGetDriverById(id: number) {
  return useQuery(['driver', id], () => getDriverById(id), {
    staleTime: 1000 * 60,
  })
}

export function useGetTeams() {
  return useQuery([`teams`], () => getTeams(), {
    staleTime: 1000 * 60,
  })
}

export function useGetTeamById(id: number) {
  return useQuery([`team`, id], () => getTeamById(id), {
    staleTime: 1000 * 60,
  })
}

export function useGetEvents() {
  return useQuery([`events`], () => getEvents(), {
    staleTime: 1000 * 60,
  })
}

export function useGetEventDetails(name: string, date: Date) {
  return useQuery([`event`, name], () => getEventDetails(name, date), {
    staleTime: 1000 * 60,
  })
}
