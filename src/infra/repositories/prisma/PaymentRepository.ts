import { PaymentDTO } from '@/core/dtos/PaymentDTO'
import { IPaymentRepository } from '@/core/repositories/PaymentRepository'
import { PrismaClient } from '@prisma/client'

export class PaymentRepository implements IPaymentRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async savePayment(payment: PaymentDTO): Promise<PaymentDTO> {
    const savedPayment = await this.prisma.payment.create({
      data: payment
    })
    return savedPayment
  }

  async getPaymentById(paymentId: string): Promise<PaymentDTO> {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId }
    })
    if (!payment) {
      throw new Error('Payment not found')
    }
    return payment
  }

  async listPayments(): Promise<PaymentDTO[]> {
    const payments = await this.prisma.payment.findMany()
    return payments
  }

  async updatePayment(payment: PaymentDTO): Promise<PaymentDTO> {
    const updatedPayment = await this.prisma.payment.update({
      where: { id: payment.id },
      data: payment
    })
    return updatedPayment
  }

  async deletePayment(paymentId: string): Promise<void> {
    await this.prisma.payment.delete({
      where: { id: paymentId }
    })
  }
}
