import { getApiUrl } from '../env'

export type Match = {
  id: string
  name: string
  date: string
}

export default async function fetchMatches(): Promise<Array<Match>> {
  const response = await fetch(getApiUrl() + '/matches', {
    method: 'GET',
    // credentials: "include",
  })
  if (!response.ok) {
    throw new Error('Failed to fetch events')
  }
  return response.json()
}

export const matchesQueryKey = ['matches']

export const matchesQuery = {
  queryKey: matchesQueryKey,
  queryFn: fetchMatches,
  staleTime: 1000 * 60 * 5, // 5 minutes
}
