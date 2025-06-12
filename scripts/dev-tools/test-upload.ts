import fs from 'fs'
import fetch from 'node-fetch'
import path from 'path'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

// Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
const TEST_IMAGE_PATH = path.resolve('./scripts/test-assets/sample-image.jpg')

async function testUpload() {
  try {
    console.log('🔍 Starting upload test...')
    console.log('📁 Test image path:', TEST_IMAGE_PATH)

    // Check if test image exists
    if (!fs.existsSync(TEST_IMAGE_PATH)) {
      throw new Error(`Test image not found at: ${TEST_IMAGE_PATH}`)
    }

    // Read and convert image to base64
    console.log('📤 Reading image file...')
    const fileBuffer = fs.readFileSync(TEST_IMAGE_PATH)
    const base64 = fileBuffer.toString('base64')
    console.log('✅ Image converted to base64')

    // Prepare upload request
    const payload = {
      base64,
      name: 'test.jpg',
      type: 'image/jpeg',
      slug: 'test-folder'
    }

    console.log('🚀 Sending upload request...')
    const response = await fetch(`${API_URL}/api/uploadImage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(`Upload failed: ${data.error || 'Unknown error'}`)
    }

    console.log('✅ Upload successful!')
    console.log('🔗 Public URL:', data.url)
    return data
  } catch (error) {
    console.error('❌ Test failed:', error)
    throw error
  }
}

// Run the test
testUpload()
  .then(() => {
    console.log('✨ Test completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Test failed:', error)
    process.exit(1)
  }) 