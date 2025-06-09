'use client'

import dynamic from 'next/dynamic'
import { Module } from '@/lib/editor/types'

const PublicModuleRenderer = dynamic(
  () => import('@/components/modules/PublicModuleRenderer'),
  { ssr: false }
)

interface Props {
  modules: Module[]
}

export default function ClientModuleRenderer({ modules }: Props) {
  return <PublicModuleRenderer modules={modules} />
} 