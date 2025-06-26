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
      className="btn btn-primary fixed bottom-8 right-8 px-6 py-3 rounded-full shadow-lg transition-colors"
    >
      Publish Page
    </button>
  )
} 