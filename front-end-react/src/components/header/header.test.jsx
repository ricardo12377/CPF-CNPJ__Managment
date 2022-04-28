import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from "./header.jsx"

describe("Testando o formulário", () => {
   
  it("should render form", () => {
      render(<Header />)
      
      const element = screen.getByTestId("header-element")

      expect(element).toBeInTheDocument()
  })
})