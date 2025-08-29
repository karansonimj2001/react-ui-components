import React, { useState, useEffect, useRef } from 'react'
import { Eye, EyeOff, X } from 'lucide-react'

export interface InputFieldProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string
  helperText?: string
  errorMessage?: string
  disabled?: boolean
  invalid?: boolean
  variant?: 'filled' | 'outlined' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  type?: string
  showClearButton?: boolean
  showPasswordToggle?: boolean
  theme?: 'light' | 'dark'
}

const sizeClasses = {
  sm: 'input-sm',
  md: 'input-md',
  lg: 'input-lg',
}

const variantClasses = {
  filled: 'input-filled',
  outlined: 'input-outlined',
  ghost: 'input-ghost',
}

export const InputField: React.FC<InputFieldProps> = ({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  showClearButton = false,
  showPasswordToggle = false,
  theme = 'light',
}) => {
  const [inputType, setInputType] = useState(type)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setInputType(type)
  }, [type])

  const handleClear = () => {
    if (onChange) {
      const event = {
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>
      onChange(event)
      inputRef.current?.focus()
    }
  }

  const togglePasswordVisibility = () => {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'))
  }

  const inputClassNames = [
    'input-base',
    variantClasses[variant],
    sizeClasses[size],
    invalid ? 'input-invalid' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    theme === 'dark' ? 'bg-gray-800 text-white placeholder-gray-400' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          htmlFor={label}
          className={`mb-1 font-medium ${
            disabled ? 'text-gray-400' : 'text-gray-700'
          }`}
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          id={label}
          ref={inputRef}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={invalid}
          aria-describedby={errorMessage ? `${label}-error` : undefined}
          className={inputClassNames}
        />
        {showClearButton && value && !disabled && (
          <button
            type="button"
            aria-label="Clear input"
            onClick={handleClear}
            className="absolute right-8 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <X size={16} />
          </button>
        )}
        {showPasswordToggle && type === 'password' && !disabled && (
          <button
            type="button"
            aria-label={inputType === 'password' ? 'Show password' : 'Hide password'}
            onClick={togglePasswordVisibility}
            className="absolute right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {inputType === 'password' ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        )}
        {invalid && errorMessage && (
          <p
            id={`${label}-error`}
            className="absolute text-sm text-red-600 mt-1 left-0 bottom-[-1.5rem]"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
      </div>
      {!invalid && helperText && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  )
}
