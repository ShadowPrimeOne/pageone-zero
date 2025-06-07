const VAULT_KEY = 'pageone_vault'

interface VaultEntry {
  slug: string
  key: string
}

export function saveKeyToVault(slug: string, key: string): void {
  const vault = getVault()
  vault[slug] = key
  localStorage.setItem(VAULT_KEY, JSON.stringify(vault))
}

export function getKeyFromVault(slug: string): string | null {
  const vault = getVault()
  return vault[slug] || null
}

export function removeKeyFromVault(slug: string): void {
  const vault = getVault()
  delete vault[slug]
  localStorage.setItem(VAULT_KEY, JSON.stringify(vault))
}

function getVault(): Record<string, string> {
  const vaultStr = localStorage.getItem(VAULT_KEY)
  return vaultStr ? JSON.parse(vaultStr) : {}
} 