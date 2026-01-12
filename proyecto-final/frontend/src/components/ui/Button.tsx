import React from "react"

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick = () => {},
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-main hover:bg-accent text-[#FFFFFF] px-4 py-2 rounded font-medium cursor-pointer transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
