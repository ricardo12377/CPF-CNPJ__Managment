import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App.js'

describe("Testando o formulário", () => {
   
  it("should render form", () => {
      render(<App />)
      
      const element = screen.getByTestId("form-edit-element")

      expect(element).toBeInTheDocument()
  })
})