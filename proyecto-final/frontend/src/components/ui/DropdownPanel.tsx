type DropdownPanelProps = {
  children: React.ReactNode
  className?: string
}

const DropdownPanel = ({ children, className = "" }: DropdownPanelProps) => {
  return (
    <div
      className={`absolute top-15 right-0 bg-background border border-white rounded flex flex-col z-50 max-w-[90vw] overflow-x-hidden ${className}`}
    >
      {children}
    </div>
  )
}

export default DropdownPanel
