import { Module } from '@/lib/editor/types'

export async function generateKey(passphrase: string): Promise<CryptoKey> {
  const encoder = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  )

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('pageone-salt'),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

export async function encryptData(data: Module[], key: CryptoKey): Promise<string> {
  const encoder = new TextEncoder()
  const jsonString = JSON.stringify(data)
  const dataBuffer = encoder.encode(jsonString)

  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encryptedBuffer = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv
    },
    key,
    dataBuffer
  )

  const encryptedArray = new Uint8Array(encryptedBuffer)
  const combinedArray = new Uint8Array(iv.length + encryptedArray.length)
  combinedArray.set(iv)
  combinedArray.set(encryptedArray, iv.length)

  return btoa(String.fromCharCode(...combinedArray))
}

export async function decryptData(encryptedData: string, key: CryptoKey): Promise<Module[]> {
  const dataBytes = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0))
  const iv = dataBytes.slice(0, 12)
  const encrypted = dataBytes.slice(12)

  const decryptedBuffer = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv
    },
    key,
    encrypted
  )

  const decoder = new TextDecoder()
  const jsonString = decoder.decode(decryptedBuffer)
  return JSON.parse(jsonString)
} 