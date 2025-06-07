import { ready, crypto_secretbox_easy, crypto_secretbox_open_easy } from 'libsodium-wrappers'

export async function encryptData(data: string, key: string): Promise<string> {
  await ready
  const keyBytes = new TextEncoder().encode(key)
  const dataBytes = new TextEncoder().encode(data)
  const nonce = crypto.getRandomValues(new Uint8Array(24))
  
  const encrypted = crypto_secretbox_easy(dataBytes, nonce, keyBytes)
  const result = new Uint8Array(nonce.length + encrypted.length)
  result.set(nonce)
  result.set(encrypted, nonce.length)
  
  return btoa(String.fromCharCode(...result))
}

export async function decryptData(encryptedData: string, key: string): Promise<string> {
  await ready
  const keyBytes = new TextEncoder().encode(key)
  const dataBytes = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0))
  
  const nonce = dataBytes.slice(0, 24)
  const encrypted = dataBytes.slice(24)
  
  const decrypted = crypto_secretbox_open_easy(encrypted, nonce, keyBytes)
  return new TextDecoder().decode(decrypted)
} 