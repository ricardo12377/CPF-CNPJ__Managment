import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from '.'

describe("testing app", () => {
   
  it("should render button", () => {
      render(<Button />)
      
      const element = screen.getByTestId("button-element")
      
      expect(element).toBeInTheDocument()
  })
})