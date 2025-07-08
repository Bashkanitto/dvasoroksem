import { colors } from '@/shared/constants/colors'
import React from 'react'

export const CustomInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, style, ...rest }, ref) => {
  return (
    <input
      ref={ref}
      style={{
        width: '100%',
        backgroundColor: colors.secondary,
        borderColor: colors.border,
        borderWidth: '1px',
        borderStyle: 'solid',
        height: '56px',
        padding: '18px',
        borderRadius: '14px',
        ...style,
      }}
      className={className}
      {...rest}
    />
  )
})

CustomInput.displayName = 'CustomInput'
