export interface Design {
  id: string
  name: string
  url: string
  images: string[] // assume base64 or remote URLs
  createdAt?: string // optional, can be used for sorting or display
  updatedAt?: string // optional, can be used for tracking changes
}
