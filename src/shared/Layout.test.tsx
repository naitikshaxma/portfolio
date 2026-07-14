import { render, screen } from '@testing-library/react'
import { Container, Spacer, Divider, Surface } from './Layout'
import { expect, test } from 'vitest'

test('renders Container with children', () => {
  render(<Container>Test Content</Container>)
  expect(screen.getByText('Test Content')).toBeInTheDocument()
})

test('renders Spacer component', () => {
  const { container } = render(<Spacer x={20} y={10} />)
  const spacer = container.firstChild as HTMLElement
  expect(spacer).toBeInTheDocument()
  expect(spacer.style.width).toBe('20px')
  expect(spacer.style.height).toBe('10px')
})

test('renders Divider component', () => {
  const { container } = render(<Divider />)
  expect(container.querySelector('hr')).toBeInTheDocument()
})

test('renders Surface component', () => {
  render(<Surface>Surface Content</Surface>)
  expect(screen.getByText('Surface Content')).toBeInTheDocument()
})
