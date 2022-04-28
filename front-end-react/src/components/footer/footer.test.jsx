import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '.'

describe("Testando o formulário", () => {
   
  it("should render form", () => {
      render(<Footer />)
      
      const element = screen.getByTestId("footer-element")
      
      expect(element).toBeInTheDocument()
  })
})