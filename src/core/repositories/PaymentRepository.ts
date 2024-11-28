import { PaymentDTO } from '../dtos/PaymentDTO'

export interface IPaymentRepository {
  savePayment(payment: PaymentDTO): Promise<PaymentDTO>
  getPaymentById(paymentId: string): Promise<PaymentDTO>
  listPayments(): Promise<PaymentDTO[]>
  updatePayment(payment: PaymentDTO): Promise<PaymentDTO>
  deletePayment(paymentId: string): Promise<void>
}
