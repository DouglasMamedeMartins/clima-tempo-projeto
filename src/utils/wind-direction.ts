const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const

export function getWindDirection(degrees: number): string {
  const index = Math.round(degrees / 45) % 8
  return DIRECTIONS[index]
}
