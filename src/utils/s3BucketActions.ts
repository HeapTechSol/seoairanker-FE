import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'

const S3BUCKET_NAME = import.meta.env.VITE_AWS_S3_BUCKET
const s3_url = import.meta.env.VITE_AWS_S3_URL
const AWS_S3_REGION = import.meta.env.VITE_AWS_S3_REGION
const AWS_ACCESS_KEY_ID = import.meta.env.VITE_AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY

if (!AWS_S3_REGION) {
  console.error('AWS S3 Region is not set in environment variables')
}

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
  console.error('AWS credentials are not set in environment variables')
}

const s3Client = new S3Client({
  region: AWS_S3_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
})

export const uploadFile = async (file: File, folderName = '') => {
  if (!file) {
    console.error('No file provided for upload')
    return undefined
  }

  if (!S3BUCKET_NAME) {
    console.error('S3 Bucket name is not set in environment variables')
    return undefined
  }

  try {
    const fileType = file.type.split('/')[1]
    const path = folderName ? `${folderName}/${uuidv4()}.${fileType}` : `${uuidv4()}.${fileType}`

    const params = {
      Bucket: S3BUCKET_NAME,
      Key: path,
      Body: file,
      ContentType: file.type,
      Metadata: { 'Content-Type': file.type, 'Cache-Control': 'max-age=3600' },
      CacheControl: 'max-age=3600',
    }

    const command = new PutObjectCommand(params)
    await s3Client.send(command)

    const url = `${s3_url}${path}`
    return url
  } catch (error) {
    console.error('Error in uploadFile:', error)
    return undefined
  }
}

export default uploadFile
