import fs from 'fs'
import path from 'path'

const base64Image = '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAABAAEDAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='

const imagePath = path.resolve('./scripts/test-assets/sample-image.jpg')
const imageBuffer = Buffer.from(base64Image, 'base64')

fs.writeFileSync(imagePath, imageBuffer)
console.log('✅ Test image created at:', imagePath) 