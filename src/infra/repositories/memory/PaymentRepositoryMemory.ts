import { PaymentDTO } from '@/core/dtos/PaymentDTO'
import { IPaymentRepository } from '@/core/repositories/PaymentRepository'

export class PaymentRepositoryMemory implements IPaymentRepository {
  public payments: PaymentDTO[] = []

  async savePayment(payment: PaymentDTO): Promise<PaymentDTO> {
    payment.id = (this.payments.length + 1).toString()
    payment.createdAt = new Date()
    this.payments.push(payment)
    return payment
  }

  async getPaymentById(paymentId: string): Promise<PaymentDTO> {
    const payment = this.payments.find((pay) => pay.id === paymentId)
    if (payment) {
      return payment
    }
    throw new Error('Payment not found')
  }

  async listPayments(): Promise<PaymentDTO[]> {
    return this.payments
  }

  async updatePayment(payment: PaymentDTO): Promise<PaymentDTO> {
    const index = this.payments.findIndex((pay) => pay.id === payment.id)
    if (index !== -1) {
      this.payments[index] = payment
      return payment
    }
    throw new Error('Payment not found')
  }

  async deletePayment(paymentId: string): Promise<void> {
    const index = this.payments.findIndex((pay) => pay.id === paymentId)
    if (index !== -1) {
      this.payments.splice(index, 1)
    } else {
      throw new Error('Payment not found')
    }
  }
}
