import { BsChatRightFill } from "react-icons/bs"
import { FaHeart, FaShareAlt } from "react-icons/fa"
import { MdPushPin } from "react-icons/md"

interface EventActionsProps {
  likes: number
  commentsCount: number
  onShare: () => void
  onSave: () => void
}

function EventActions({ likes, commentsCount, onShare, onSave }: EventActionsProps) {
  return (
    <div className="flex justify-around my-3 text-textPrimary">
      {/* Likes */}
      <div className="flex items-center cursor-pointer gap-2">
        <span className="text-red-500 -mt-1">
          <FaHeart />
        </span>
        <span>{likes}</span>
      </div>

      {/* Comments */}
      <div className="flex items-center cursor-pointer gap-2">
        <span className="-mt-1">
          <BsChatRightFill />
        </span>
        <span>{commentsCount}</span>
      </div>

      {/* Share */}
      <div className="flex items-center cursor-pointer gap-2" onClick={onShare}>
        <span className="-mt-1">
          <FaShareAlt />
        </span>
        <span>Compartir</span>
      </div>

      {/* Save */}
      <div className="flex items-center cursor-pointer gap-2" onClick={onSave}>
        <span>
          <MdPushPin />
        </span>
        <span>Guardar</span>
      </div>
    </div>
  )
}

export default EventActions
