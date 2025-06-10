interface ModalAction {
  label: string
  href?: string
  action?: () => void
}

interface ModalOptions {
  title: string
  message: string
  button?: string
  actions?: ModalAction[]
}

export function showModal(options: ModalOptions) {
  // Create modal element
  const modal = document.createElement('div')
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/50'
  
  // Create modal content
  const content = document.createElement('div')
  content.className = 'bg-white rounded-lg p-6 max-w-md w-full mx-4'
  
  // Add title
  const title = document.createElement('h2')
  title.className = 'text-2xl font-bold mb-4'
  title.textContent = options.title
  content.appendChild(title)
  
  // Add message
  const message = document.createElement('p')
  message.className = 'text-gray-600 mb-6'
  message.textContent = options.message
  content.appendChild(message)
  
  // Add actions
  const actions = document.createElement('div')
  actions.className = 'flex flex-col gap-2'
  
  if (options.actions) {
    options.actions.forEach(action => {
      const button = document.createElement('button')
      button.className = 'w-full px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors'
      button.textContent = action.label
      
      if (action.href) {
        button.onclick = () => {
          window.location.href = action.href!
          modal.remove()
        }
      } else if (action.action) {
        button.onclick = () => {
          action.action!()
          modal.remove()
        }
      }
      
      actions.appendChild(button)
    })
  } else if (options.button) {
    const button = document.createElement('button')
    button.className = 'w-full px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors'
    button.textContent = options.button
    button.onclick = () => modal.remove()
    actions.appendChild(button)
  }
  
  content.appendChild(actions)
  modal.appendChild(content)
  
  // Add click outside to close
  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.remove()
    }
  }
  
  // Add to document
  document.body.appendChild(modal)
} 