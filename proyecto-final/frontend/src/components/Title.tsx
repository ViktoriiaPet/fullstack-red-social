interface TitleProps {
  title: string | React.ReactNode
}

const Title = ({ title }: TitleProps) => {
  return <h1 className="text-center mt-4 mb-5 text-white">{title}</h1>
}

export default Title
