interface ChatButtonProps {
  onClick: () => void
}

function ChatButton({ onClick }: ChatButtonProps) {
  return (
    <button
      id="chatButton"
      type="button"
      aria-label="Buka chat"
      className="fixed right-5 bottom-5 z-40 w-14 h-14 rounded-full bg-sky-400 hover:bg-sky-500 text-white shadow-xl shadow-sky-200 flex items-center justify-center text-2xl transition hover:scale-105"
      onClick={onClick}
    >
      💬
    </button>
  )
}

export default ChatButton