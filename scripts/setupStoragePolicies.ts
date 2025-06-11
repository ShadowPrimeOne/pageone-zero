import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables:')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌')
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? '✅' : '❌')
  process.exit(1)
}

console.log('🔑 Using Supabase URL:', supabaseUrl)
console.log('🔑 Using Service Role Key:', supabaseKey.slice(0, 8) + '...')

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupStoragePolicies() {
  try {
    // Create the public-images bucket if it doesn't exist
    console.log('📝 Checking public-images bucket...')
    const { error: bucketError } = await supabase.storage.createBucket('public-images', {
      public: true,
      fileSizeLimit: 52428800, // 50MB
      allowedMimeTypes: ['image/*']
    })

    if (bucketError) {
      if (bucketError.message === 'The resource already exists') {
        console.log('✅ Bucket already exists, proceeding with policy setup...')
      } else {
        console.error('❌ Error creating bucket:', bucketError)
        process.exit(1)
      }
    } else {
      console.log('✅ Bucket created successfully')
    }

    // Update bucket settings to ensure it's public
    console.log('📝 Updating bucket settings...')
    const { error: updateError } = await supabase.storage.updateBucket('public-images', {
      public: true,
      fileSizeLimit: 52428800, // 50MB
      allowedMimeTypes: ['image/*']
    })

    if (updateError) {
      console.error('❌ Error updating bucket settings:', updateError)
      process.exit(1)
    }

    // Apply storage policies
    console.log('📝 Applying storage policies...')

    // Public read access
    const { error: publicAccessError } = await supabase.rpc('create_storage_policy', {
      policy_name: 'Public Access',
      definition: 'bucket_id = \'public-images\'',
      operation: 'SELECT'
    })

    if (publicAccessError) {
      console.error('❌ Error creating public access policy:', publicAccessError)
    } else {
      console.log('✅ Public access policy created')
    }

    // Authenticated uploads
    const { error: uploadError } = await supabase.rpc('create_storage_policy', {
      policy_name: 'Authenticated Uploads',
      definition: 'bucket_id = \'public-images\' AND auth.role() = \'authenticated\'',
      operation: 'INSERT'
    })

    if (uploadError) {
      console.error('❌ Error creating upload policy:', uploadError)
    } else {
      console.log('✅ Upload policy created')
    }

    // User update access
    const { error: updatePolicyError } = await supabase.rpc('create_storage_policy', {
      policy_name: 'User Update Access',
      definition: 'bucket_id = \'public-images\' AND (storage.foldername(name))[1] = \'user\' AND (storage.foldername(name))[2] = auth.uid()::text',
      operation: 'UPDATE'
    })

    if (updatePolicyError) {
      console.error('❌ Error creating update policy:', updatePolicyError)
    } else {
      console.log('✅ Update policy created')
    }

    // User delete access
    const { error: deletePolicyError } = await supabase.rpc('create_storage_policy', {
      policy_name: 'User Delete Access',
      definition: 'bucket_id = \'public-images\' AND (storage.foldername(name))[1] = \'user\' AND (storage.foldername(name))[2] = auth.uid()::text',
      operation: 'DELETE'
    })

    if (deletePolicyError) {
      console.error('❌ Error creating delete policy:', deletePolicyError)
    } else {
      console.log('✅ Delete policy created')
    }

    console.log('✅ Storage setup complete!')
    console.log('\nThe public-images bucket is now configured with:')
    console.log('- Public access enabled')
    console.log('- 50MB file size limit')
    console.log('- Image files only')
    console.log('- Public read access')
    console.log('- Authenticated user upload access')
    console.log('- User-specific update/delete access')
  } catch (err) {
    console.error('❌ Unexpected error:', err)
    process.exit(1)
  }
}

setupStoragePolicies()