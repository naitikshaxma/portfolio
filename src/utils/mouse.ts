export interface MouseCoordinates {
  x: number
  y: number
  clientX: number
  clientY: number
}

// Linear interpolation (lerp) for smooth coordinates tracking
export function lerp(start: number, end: number, amt: number): number {
  return (1 - amt) * start + amt * end
}

// Calculate magnetic pull offset parameters relative to interactive buttons
export function getMagneticOffset(
  element: HTMLElement,
  clientX: number,
  clientY: number,
  radius = 60,
): { x: number; y: number; isInside: boolean } {
  const bound = element.getBoundingClientRect()
  const elX = bound.left + bound.width / 2
  const elY = bound.top + bound.height / 2

  const deltaX = clientX - elX
  const deltaY = clientY - elY
  const distance = Math.hypot(deltaX, deltaY)

  if (distance < radius) {
    return {
      x: deltaX * 0.35,
      y: deltaY * 0.35,
      isInside: true,
    }
  }

  return { x: 0, y: 0, isInside: false }
}
export {}
