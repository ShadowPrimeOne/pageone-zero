import { FC } from 'react'

interface FloatingPublishButtonProps {
  onClick: () => void
}

export const FloatingPublishButton: FC<FloatingPublishButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
    >
      Publish Page
    </button>
  )
} 