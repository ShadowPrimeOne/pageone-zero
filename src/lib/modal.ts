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
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'
  
  // Create modal content
  const content = document.createElement('div')
  content.className = 'bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-200'
  
  // Add content wrapper
  const contentWrapper = document.createElement('div')
  contentWrapper.className = 'p-8'
  
  // Add title with emoji support and larger text
  const title = document.createElement('h2')
  title.className = 'text-4xl font-bold text-gray-900 mb-6 text-center'
  title.textContent = options.title
  contentWrapper.appendChild(title)
  
  // Add message with better contrast
  const message = document.createElement('p')
  message.className = 'text-gray-700 mb-8 text-lg leading-relaxed text-center'
  message.textContent = options.message
  contentWrapper.appendChild(message)
  
  // Add actions
  const actions = document.createElement('div')
  actions.className = 'flex flex-col gap-4'
  
  if (options.actions) {
    options.actions.forEach(action => {
      const button = document.createElement('button')
      button.className = 'w-full px-8 py-4 rounded-xl bg-primary-500 text-white font-semibold text-lg hover:bg-primary-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105'
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
    button.className = 'w-full px-8 py-4 rounded-xl bg-primary-500 text-white font-semibold text-lg hover:bg-primary-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105'
    button.textContent = options.button
    button.onclick = () => modal.remove()
    actions.appendChild(button)
  }
  
  contentWrapper.appendChild(actions)
  content.appendChild(contentWrapper)
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