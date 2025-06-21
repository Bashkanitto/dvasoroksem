import { colors } from '@/shared/constants/colors'

export function CustomInput({
  type,
  placeholder,
  className,
  value,
  required,
  onChange,
}: {
  type: string
  placeholder?: string
  className?: string
  required?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  style?: React.CSSProperties
}) {
  return (
    <input
      onChange={onChange}
      type={type}
      required={required}
      value={value}
      className={className}
      style={{
        width: '100%',
        backgroundColor: colors.secondary,
        borderColor: colors.border,
        borderWidth: '1px',
        borderStyle: 'solid',
        height: '56px',
        padding: '18px',
        borderRadius: '14px',
      }}
      placeholder={placeholder}
    />
  )
}
