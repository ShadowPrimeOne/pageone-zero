import { useEffect } from 'react'
import { ModuleRenderer } from '@/components/modules/ModuleRenderer'
import { QRModal } from '@/components/modals/QRModal'
import { useQRModal } from '@/lib/hooks/useQRModal'

interface EditPageShellProps {
  slug: string
  isEdit: boolean
  justPublished: boolean
  modules: any[]
}

export default function EditPageShell({ slug, isEdit, justPublished, modules }: EditPageShellProps) {
  const { showQRModal, setShowQRModal } = useQRModal()

  useEffect(() => {
    if (justPublished) {
      console.log('🎉 Just published, showing QR modal')
      setShowQRModal(true)
    }
  }, [justPublished, setShowQRModal])

  return (
    <div className="min-h-screen">
      <ModuleRenderer modules={modules} isEditMode={isEdit} />
      <QRModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        slug={slug}
      />
    </div>
  )
} 