export default function getEnv(key: string, defaultValue: string = ''): string {
  const value = import.meta.env['VITE_' + key]
  return value !== undefined ? value : defaultValue
}

export function isProd(): boolean {
  return import.meta.env.PROD
}

export function getBaseUrl(): string {
  return getEnv('BASE_URL', isProd() ? '' : 'http://localhost:3000')
}

export function getApiUrl(): string {
  return getEnv('API_URL') + '/api'
}

export function getWebSocketUrl(): string {
  return getEnv('API_URL') + '/ws'
}
