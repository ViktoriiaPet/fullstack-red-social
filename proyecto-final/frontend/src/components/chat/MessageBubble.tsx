import { FaRegClock } from "react-icons/fa"

type Message = {
  user: string
  avatar: string
  content: string
  timestamp: string
}

type MessageBubbleProps = {
  message: Message
  isMe: boolean
}

export default function MessageBubble({ message, isMe }: MessageBubbleProps) {
  return (
    <li className={`mb-2 flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div className="flex items-start gap-2 text-white">
        {/* avatar on the left if it's not my message */}
        {!isMe && (
          <img
            src={message.avatar}
            alt={message.user}
            className="h-[45px] w-[45px] rounded-full object-cover mx-[6px]"
          />
        )}

        {/* message bubble */}
        <div
          className={`relative max-w-[calc(100%-55px)] break-words rounded-lg bg-[#9569FF] px-3 py-1 ${
            isMe ? "text-right" : "text-left"
          }`}
        >
          {/* bubble triangle */}
          <div
            className={`absolute top-2 h-0 w-0 border-y-[8px] border-y-transparent ${
              isMe
                ? "right-[-8px] border-l-[8px] border-l-[#9569FF]"
                : "left-[-8px] border-r-[8px] border-r-[#9569FF]"
            }`}
          />

          <div className="text-sm font-bold">{message.user}</div>
          <div>{message.content}</div>

          <div className="mt-[2px] flex items-center text-xs text-textSecondary">
            <FaRegClock className="mr-1 -mt-[3px]" />
            <span>{message.timestamp}</span>
          </div>
        </div>

        {/* avatar on the right if it's my message */}
        {isMe && (
          <img
            src={message.avatar}
            alt={message.user}
            className="h-[45px] w-[45px] rounded-full object-cover mx-[6px]"
          />
        )}
      </div>
    </li>
  )
}
