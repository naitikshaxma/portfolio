import React, { useId, useState } from 'react'
import { cn } from '@/utils/cn'

// 1. Regular Input with Bottom-Stroke style
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
  helperText?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, helperText, id, ...props }, ref) => {
    const defaultId = useId()
    const inputId = id || defaultId

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-xs uppercase tracking-widest font-semibold text-gray-400 mb-2">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'w-full bg-[#11141a] text-white border-b border-[#2b303c] py-3 px-1 focus:outline-none focus:border-[#00b4d8] font-mono transition-colors text-sm placeholder:text-gray-600',
            error && 'border-red-500 focus:border-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1.5 font-mono">{error}</p>}
        {!error && helperText && <p className="text-gray-500 text-xs mt-1.5 font-mono">{helperText}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'

// 2. Textarea with Bottom-Stroke style
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
  label?: string
  helperText?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, helperText, id, ...props }, ref) => {
    const defaultId = useId()
    const textareaId = id || defaultId

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-xs uppercase tracking-widest font-semibold text-gray-400 mb-2">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            'w-full bg-[#11141a] text-white border-b border-[#2b303c] py-3 px-1 focus:outline-none focus:border-[#00b4d8] font-mono transition-colors text-sm placeholder:text-gray-600 resize-none min-h-[100px]',
            error && 'border-red-500 focus:border-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1.5 font-mono">{error}</p>}
        {!error && helperText && <p className="text-gray-500 text-xs mt-1.5 font-mono">{helperText}</p>}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

// 3. Floating Label Input
export interface FloatingLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const FloatingLabel = React.forwardRef<HTMLInputElement, FloatingLabelProps>(
  ({ className, label, error, value, ...props }, ref) => {
    const defaultId = useId()
    const inputId = props.id || defaultId
    const [focused, setFocused] = useState(false)
    const hasValue = value !== undefined && value !== ''

    return (
      <div className="relative w-full pt-4">
        <input
          id={inputId}
          ref={ref}
          value={value}
          onFocus={(e) => {
            setFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setFocused(false)
            props.onBlur?.(e)
          }}
          className={cn(
            'w-full bg-transparent text-white border-b border-[#2b303c] py-2 px-1 focus:outline-none focus:border-[#00b4d8] font-mono transition-colors text-sm',
            error && 'border-red-500 focus:border-red-500',
            className
          )}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            'absolute left-1 top-6 pointer-events-none transition-all duration-250 text-sm text-gray-500 font-mono',
            (focused || hasValue) && 'top-0 text-xs text-[#00b4d8]'
          )}
        >
          {label}
        </label>
        {error && <p className="text-red-500 text-xs mt-1 font-mono">{error}</p>}
      </div>
    )
  }
)
FloatingLabel.displayName = 'FloatingLabel'

// 4. Checkbox Component
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const defaultId = useId()
    const checkboxId = id || defaultId

    return (
      <label htmlFor={checkboxId} className="flex items-center space-x-3 cursor-pointer group">
        <input
          type="checkbox"
          id={checkboxId}
          ref={ref}
          className={cn(
            'w-4 h-4 bg-[#11141a] border border-[#2b303c] rounded text-[#00b4d8] focus:ring-[#00b4d8] focus:ring-opacity-50 transition-colors',
            className
          )}
          {...props}
        />
        <span className="text-sm font-mono text-gray-300 group-hover:text-white transition-colors">{label}</span>
      </label>
    )
  }
)
Checkbox.displayName = 'Checkbox'

// 5. Toggle (Switch) Component
export interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({ className, label, id, checked, ...props }, ref) => {
    const defaultId = useId()
    const toggleId = id || defaultId

    return (
      <label htmlFor={toggleId} className={cn("flex items-center space-x-3 cursor-pointer group", className)}>
        <div className="relative">
          <input
            type="checkbox"
            id={toggleId}
            ref={ref}
            checked={checked}
            className="sr-only"
            {...props}
          />
          <div className={cn(
            'w-10 h-5 bg-[#1b1e23] border border-[#2b303c] rounded-full transition-colors duration-300',
            checked && 'bg-[#00b4d8]/20 border-[#00b4d8]'
          )} />
          <div className={cn(
            'absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-gray-500 transition-transform duration-300',
            checked && 'translate-x-5 bg-[#00b4d8]'
          )} />
        </div>
        <span className="text-sm font-mono text-gray-300 group-hover:text-white transition-colors">{label}</span>
      </label>
    )
  }
)
Toggle.displayName = 'Toggle'

// 6. Radio Component
export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, id, ...props }, ref) => {
    const defaultId = useId()
    const radioId = id || defaultId

    return (
      <label htmlFor={radioId} className="flex items-center space-x-3 cursor-pointer group">
        <input
          type="radio"
          id={radioId}
          ref={ref}
          className={cn(
            'w-4 h-4 bg-[#11141a] border border-[#2b303c] rounded-full text-[#00b4d8] focus:ring-[#00b4d8] transition-colors',
            className
          )}
          {...props}
        />
        <span className="text-sm font-mono text-gray-300 group-hover:text-white transition-colors">{label}</span>
      </label>
    )
  }
)
Radio.displayName = 'Radio'

// 7. Select Component
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
  error?: string
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, error, id, ...props }, ref) => {
    const defaultId = useId()
    const selectId = id || defaultId

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-xs uppercase tracking-widest font-semibold text-gray-400 mb-2">
            {label}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={cn(
            'w-full bg-[#11141a] text-white border-b border-[#2b303c] py-3 px-1 focus:outline-none focus:border-[#00b4d8] font-mono transition-colors text-sm appearance-none',
            error && 'border-red-500 focus:border-red-500',
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-xs mt-1.5 font-mono">{error}</p>}
      </div>
    )
  }
)
Select.displayName = 'Select'

// 8. Search Component (Input with icon)
export interface SearchProps extends InputProps {
  onSearch?: (value: string) => void
}

export const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, onSearch, onChange, ...props }, ref) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(e)
      if (onSearch) onSearch(e.target.value)
    }

    return (
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-1 flex items-center pointer-events-none text-gray-600">
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M10 2a8 8 0 016.32 12.9l4.98 4.98a1 1 0 01-1.42 1.42l-4.98-4.98A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z" />
          </svg>
        </span>
        <input
          type="search"
          ref={ref}
          onChange={handleInputChange}
          className={cn(
            'w-full bg-[#11141a] text-white border-b border-[#2b303c] py-3 pl-8 pr-1 focus:outline-none focus:border-[#00b4d8] font-mono transition-colors text-sm placeholder:text-gray-600',
            className
          )}
          {...props}
        />
      </div>
    )
  }
)
Search.displayName = 'Search'
