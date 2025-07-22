export interface Design {
  id: number
  name: string
  url: string
  images: string[] // assume base64 or remote URLs
  published: boolean
  createdAt?: string
  updatedAt?: string
}
