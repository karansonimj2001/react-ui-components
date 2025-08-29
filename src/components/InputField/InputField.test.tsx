import { render, screen, fireEvent } from '@testing-library/react'
import { InputField } from './InputField'

describe('InputField', () => {
  test('renders with label', () => {
    render(<InputField label="Test Label" />)
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
  })

  test('renders with placeholder', () => {
    render(<InputField placeholder="Enter text..." />)
    expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument()
  })

  test('handles value change', () => {
    const handleChange = jest.fn()
    render(<InputField onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test' } })
    
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  test('displays error message when invalid', () => {
    render(<InputField invalid errorMessage="Error message" />)
    expect(screen.getByText('Error message')).toBeInTheDocument()
  })

  test('displays helper text', () => {
    render(<InputField helperText="Helper text" />)
    expect(screen.getByText('Helper text')).toBeInTheDocument()
  })

  test('is disabled when disabled prop is true', () => {
    render(<InputField disabled />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })

  test('clear button clears input', () => {
    const handleChange = jest.fn()
    render(
      <InputField
        value="test"
        onChange={handleChange}
        showClearButton
      />
    )
    
    const clearButton = screen.getByLabelText('Clear input')
    fireEvent.click(clearButton)
    
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: { value: '' },
      })
    )
  })

  test('password toggle changes input type', () => {
    render(
      <InputField
        type="password"
        showPasswordToggle
      />
    )
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('type', 'password')
    
    const toggleButton = screen.getByLabelText('Show password')
    fireEvent.click(toggleButton)
    
    expect(input).toHaveAttribute('type', 'text')
  })

  test('applies correct size classes', () => {
    const { container } = render(<InputField size="sm" />)
    const input = container.querySelector('input')
    expect(input).toHaveClass('input-sm')
  })

  test('applies correct variant classes', () => {
    const { container } = render(<InputField variant="filled" />)
    const input = container.querySelector('input')
    expect(input).toHaveClass('input-filled')
  })

  test('has proper accessibility attributes when invalid', () => {
    render(<InputField invalid errorMessage="Error" label="Test" />)
    const input = screen.getByLabelText('Test')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby', 'Test-error')
  })
})
