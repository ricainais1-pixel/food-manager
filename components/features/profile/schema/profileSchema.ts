import * as z from 'zod'

export const profileSchema = z.object({
  name: z.string().min(2, { message: '2文字以上入力する必要があります。' }),
  introduce: z.string(),
  email: z.string().email({ message: 'メールアドレスが正しくありません' }),
  password: z.string().min(8, { message: '8文字以上' }).optional(),
})
