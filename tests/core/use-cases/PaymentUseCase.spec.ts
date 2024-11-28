import { PaymentStatus } from '@/core/domain/entities/Payment'
import { PaymentUseCase } from '@/core/domain/use-cases/PaymentUseCase'
import { PaymentRepositoryMemory } from '@/infra/repositories/memory/PaymentRepositoryMemory'
import { beforeEach, describe, expect, it } from 'vitest'

let paymentRepositoryMemory: PaymentRepositoryMemory
let paymentUseCase: PaymentUseCase

describe('Payment', () => {
  beforeEach(() => {
    paymentRepositoryMemory = new PaymentRepositoryMemory()
    paymentUseCase = new PaymentUseCase(paymentRepositoryMemory)
  })

  it('should be able to create a new payment', async () => {
    const payment = await paymentUseCase.createPayment('order-1', 100, 'qrcode-123')

    expect(payment).toBeDefined()
    expect(paymentRepositoryMemory.payments).toHaveLength(1)
    expect(payment.getOrderId()).toBe('order-1')
  })

  it('should be able to get a payment by id', async () => {
    const createdPayment = await paymentUseCase.createPayment('order-1', 100, 'qrcode-123')
    const paymentId = createdPayment.getId()
    if (paymentId === null) {
      throw new Error('Payment ID is null')
    }
    const fetchedPayment = await paymentUseCase.getPaymentById(paymentId)

    expect(fetchedPayment).toBeDefined()
    expect(fetchedPayment.getId()).toBe(createdPayment.getId())
  })

  it('should be able to list all payments', async () => {
    await paymentUseCase.createPayment('order-1', 100, 'qrcode-123')
    await paymentUseCase.createPayment('order-2', 200, 'qrcode-456')

    const payments = await paymentUseCase.listPayments()

    expect(payments).toBeDefined()
    expect(payments).toHaveLength(2)
  })

  it('should be able to update payment status', async () => {
    const payment = await paymentUseCase.createPayment('order-1', 100, 'qrcode-123')

    const paymentId = payment.getId()
    if (paymentId === null) {
      throw new Error('Payment ID is null')
    }
    await paymentUseCase.updatePaymentStatus(paymentId, PaymentStatus.COMPLETED)

    const updatedPayment = await paymentUseCase.getPaymentById(paymentId)

    expect(updatedPayment.getStatus()).toBe(PaymentStatus.COMPLETED)
  })
})
