import { describe, it, expect } from 'vitest'
import { Payment, PaymentStatus } from '@/core/domain/entities/Payment'

describe('Payment', () => {
  describe('Constructor', () => {
    it('should create a payment with default values', () => {
      const orderId = 'order-123'
      const amount = 100.00
      const qrCode = 'test-qr-code'

      const payment = new Payment(orderId, amount, qrCode)

      expect(payment.getId()).toBeNull()
      expect(payment.getOrderId()).toBe(orderId)
      expect(payment.getAmount()).toBe(amount)
      expect(payment.getQrCode()).toBe(qrCode)
      expect(payment.getStatus()).toBe(PaymentStatus.PENDING)
      expect(payment.getCreatedAt()).toBeInstanceOf(Date)
    })

    it('should create a payment with custom status and creation date', () => {
      const orderId = 'order-456'
      const amount = 250.50
      const qrCode = 'custom-qr-code'
      const status = PaymentStatus.COMPLETED
      const createdAt = new Date('2024-01-01')

      const payment = new Payment(orderId, amount, qrCode, status, createdAt)

      expect(payment.getId()).toBeNull()
      expect(payment.getOrderId()).toBe(orderId)
      expect(payment.getAmount()).toBe(amount)
      expect(payment.getQrCode()).toBe(qrCode)
      expect(payment.getStatus()).toBe(status)
      expect(payment.getCreatedAt()).toEqual(createdAt)
    })
  })

  describe('Getter Methods', () => {
    it('should correctly return all properties', () => {
      const orderId = 'order-789'
      const amount = 75.25
      const qrCode = 'getter-qr-code'
      const status = PaymentStatus.FAILED
      const createdAt = new Date('2024-02-15')

      const payment = new Payment(orderId, amount, qrCode, status, createdAt)

      expect(payment.getOrderId()).toBe(orderId)
      expect(payment.getAmount()).toBe(amount)
      expect(payment.getQrCode()).toBe(qrCode)
      expect(payment.getStatus()).toBe(status)
      expect(payment.getCreatedAt()).toEqual(createdAt)
    })
  })

  describe('Setter Methods', () => {
    it('should set ID correctly', () => {
      const payment = new Payment('order-abc', 99.99, 'test-qr')
      const newId = 'payment-123'

      payment.setId(newId)

      expect(payment.getId()).toBe(newId)
    })

    it('should update payment status', () => {
      const payment = new Payment('order-def', 199.99, 'status-qr')

      expect(payment.getStatus()).toBe(PaymentStatus.PENDING)

      payment.setStatus(PaymentStatus.COMPLETED)

      expect(payment.getStatus()).toBe(PaymentStatus.COMPLETED)
    })
  })

  describe('Edge Cases', () => {
    it('should handle zero amount', () => {
      const payment = new Payment('order-zero', 0, 'zero-qr')

      expect(payment.getAmount()).toBe(0)
    })

    it('should allow setting ID multiple times', () => {
      const payment = new Payment('order-multi', 50.00, 'multi-qr')

      payment.setId('first-id')
      expect(payment.getId()).toBe('first-id')

      payment.setId('second-id')
      expect(payment.getId()).toBe('second-id')
    })
  })

  describe('PaymentStatus Enum', () => {
    it('should have correct status values', () => {
      expect(PaymentStatus.PENDING).toBe('PENDING')
      expect(PaymentStatus.COMPLETED).toBe('COMPLETED')
      expect(PaymentStatus.FAILED).toBe('FAILED')
    })
  })
})
