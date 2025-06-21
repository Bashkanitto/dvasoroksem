import { colors } from '@/shared/constants/colors'

export function CustomButton({
  type,
  className,
  children,
  disabled,
  onClick,
}: {
  type: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={className}
      onClick={onClick}
      style={{
        backgroundColor: colors.primary,
        height: '43px',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '30px',
      }}
    >
      {children}
    </button>
  )
}
