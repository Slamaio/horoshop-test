export interface Design {
  id: number
  name: string
  url: string
  images: string[] // assume base64
  published?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface DesignDTO extends Omit<Design, 'id' | 'createdAt' | 'updatedAt'> {
  id: number | string
  name: string
  url: string
  images: string[]
  published?: boolean
}
