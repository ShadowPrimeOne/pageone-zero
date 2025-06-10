export function generateQRCode(slug: string) {
  // Create QR code modal
  const modal = document.createElement('div')
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/50'
  
  // Create modal content
  const content = document.createElement('div')
  content.className = 'bg-white rounded-lg p-6 max-w-md w-full mx-4'
  
  // Add title
  const title = document.createElement('h2')
  title.className = 'text-2xl font-bold mb-4'
  title.textContent = '📲 QR Code'
  content.appendChild(title)
  
  // Add QR code image
  const qrImage = document.createElement('img')
  qrImage.className = 'w-full h-auto mb-4'
  qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.origin + '/page/' + slug)}`
  content.appendChild(qrImage)
  
  // Add close button
  const closeButton = document.createElement('button')
  closeButton.className = 'w-full px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors'
  closeButton.textContent = 'Close'
  closeButton.onclick = () => modal.remove()
  content.appendChild(closeButton)
  
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