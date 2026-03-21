export type Item = {
  id: number
  name: string
  count: number
  expiry?: string
  category?: string
}

export type FoodInsert = {
  name: string
  count: number
  expiry?: string | null
  category: string
  user_id: string
}
