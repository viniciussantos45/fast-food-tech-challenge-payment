import { PaymentDTO } from '../../dtos/PaymentDTO'
import { IPaymentRepository } from '../../repositories/PaymentRepository'
import { Payment, PaymentStatus } from '../entities/Payment'

export class PaymentUseCase {
  private paymentRepository: IPaymentRepository

  constructor(paymentRepository: IPaymentRepository) {
    this.paymentRepository = paymentRepository
  }

  private toDomain(payment: PaymentDTO): Payment {
    return new Payment(
      payment.orderId,
      payment.amount,
      payment.qrCode,
      PaymentStatus[payment.status as keyof typeof PaymentStatus],
      payment.createdAt
    )
  }

  public async createPayment(orderId: string, amount: number, qrCode: string): Promise<Payment> {
    const payment = new Payment(orderId, amount, qrCode, PaymentStatus.PENDING, new Date())
    const savedPayment = await this.paymentRepository.savePayment({
      orderId: payment.getOrderId(),
      amount: payment.getAmount(),
      status: payment.getStatus(),
      qrCode: payment.getQrCode(),
      createdAt: payment.getCreatedAt()
    })
    const paymentId = savedPayment.id
    if (!paymentId) {
      throw new Error('Payment ID is null')
    }
    const paymentEntity = this.toDomain(savedPayment)
    paymentEntity.setId(paymentId)
    return paymentEntity
  }

  public async getPaymentById(paymentId: string): Promise<Payment> {
    const payment = this.toDomain(await this.paymentRepository.getPaymentById(paymentId))
    payment.setId(paymentId)
    return payment
  }

  public async listPayments(): Promise<Payment[]> {
    return (await this.paymentRepository.listPayments()).map(this.toDomain)
  }

  public async updatePaymentStatus(paymentId: string, status: PaymentStatus): Promise<Payment> {
    const payment = this.toDomain(await this.paymentRepository.getPaymentById(paymentId))
    payment.setStatus(status)
    await this.paymentRepository.updatePayment({
      id: paymentId,
      orderId: payment.getOrderId(),
      amount: payment.getAmount(),
      status: payment.getStatus(),
      qrCode: payment.getQrCode(),
      createdAt: payment.getCreatedAt()
    })
    return payment
  }
}
