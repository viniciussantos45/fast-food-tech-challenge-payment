export interface PaymentDTO {
  id?: string
  orderId: string
  amount: number
  status: string
  qrCode: string
  createdAt?: Date
}
