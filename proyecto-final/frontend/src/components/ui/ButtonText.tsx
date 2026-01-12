type ButtonTextProps = {
  children: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  className?: string
  active?: boolean
}

const ButtonText: React.FC<ButtonTextProps> = ({
  children,
  onClick = () => {},
  type = "button",
  className = "",
  active = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
    text-textPrimary
    hover:text-accent
      border-0
      outline-none
      bg-transparent
      px-4 py-2
      cursor-pointer
      font-medium
      transition-colors duration-300
      focus:outline-none
    ${className}
    `}
    >
      <span
        className={`inline-block w-fit transition-colors duration-200 ${
          active ? "border-b-2 border-current pb-[0.2rem]" : ""
        }`}
      >
        {children}
      </span>
    </button>
  )
}

export default ButtonText
