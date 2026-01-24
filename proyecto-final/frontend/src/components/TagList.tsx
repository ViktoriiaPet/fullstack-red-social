import { useNavigate } from "react-router-dom"

interface TagListProps {
  categories: string[]
}

function TagList({ categories }: TagListProps) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-wrap justify-start">
      {categories.slice(0, 4).map((cat) => (
        <button
          key={cat}
          onClick={() => navigate(`/categories/${cat.toLowerCase()}`)}
          className="
            !text-[10px]
            text-textPrimary
            cursor-pointer 
            transition-all 
            px-3 py-1 mx-1
            my-1
            inline-block 
            relative 
            whitespace-nowrap 
            text-center
            bg-accent 
            hover:bg-main 
 
          "
          style={{
            clipPath: "polygon(10% 0%, 100% 0%, 90% 50%, 100% 100%, 10% 100%, 0% 50%)",
          }}
        >
          #{cat}
        </button>
      ))}
    </div>
  )
}

export default TagList
