/**
 * @jest-environment jsdom
*/

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, it } from 'node:test'
import Index from '../pages/auth/register'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Index />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  })
})