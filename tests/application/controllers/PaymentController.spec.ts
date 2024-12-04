import { describe, it, expect, vi } from 'vitest'
import { FastifyRequest, FastifyReply } from 'fastify'
import { PaymentUseCase } from '@/core/domain/use-cases/PaymentUseCase'
import { PaymentStatus } from '@/core/domain/entities/Payment'
import { getPaymentQrCode, handlePaymentWebhook } from '@/application/controllers/PaymentController'

describe('Payment Controller', () => {
  describe('getPaymentQrCode', () => {
    it('should retrieve QR code for a specific payment', async () => {
      const mockPayment = {
        getQrCode: vi.fn().mockReturnValue('mock-qr-code')
      }

      const mockPaymentUseCase = {
        getPaymentById: vi.fn().mockResolvedValue(mockPayment)
      } as unknown as PaymentUseCase

      const mockRequest = {
        params: { id: 'payment-123' }
      } as FastifyRequest

      const mockReply = {
        send: vi.fn()
      } as unknown as FastifyReply

      vi.spyOn(PaymentUseCase.prototype, 'getPaymentById').mockImplementation(mockPaymentUseCase.getPaymentById)

      await getPaymentQrCode(mockRequest, mockReply)

      expect(mockPaymentUseCase.getPaymentById).toHaveBeenCalledWith('payment-123')
      expect(mockReply.send).toHaveBeenCalledWith({ qrCode: 'mock-qr-code' })
    })

    it('should handle errors when retrieving payment', async () => {
      const mockPaymentUseCase = {
        getPaymentById: vi.fn().mockRejectedValue(new Error('Payment not found'))
      } as unknown as PaymentUseCase

      const mockRequest = {
        params: { id: 'non-existent-payment' }
      } as FastifyRequest

      const mockReply = {
        send: vi.fn(),
        status: vi.fn().mockReturnThis(),
        code: vi.fn().mockReturnThis()
      } as unknown as FastifyReply

      vi.spyOn(PaymentUseCase.prototype, 'getPaymentById').mockImplementation(mockPaymentUseCase.getPaymentById)

      await expect(getPaymentQrCode(mockRequest, mockReply)).rejects.toThrow('Payment not found')
    })
  })

  describe('handlePaymentWebhook', () => {
    it('should update payment status successfully', async () => {
      const mockPaymentUseCase = {
        updatePaymentStatus: vi.fn().mockResolvedValue(true)
      } as unknown as PaymentUseCase

      const mockRequest = {
        body: {
          id: 'payment-123',
          status: PaymentStatus.COMPLETED
        }
      } as FastifyRequest

      const mockReply = {
        send: vi.fn()
      } as unknown as FastifyReply

      vi.spyOn(PaymentUseCase.prototype, 'updatePaymentStatus').mockImplementation(mockPaymentUseCase.updatePaymentStatus)

      await handlePaymentWebhook(mockRequest, mockReply)

      expect(mockPaymentUseCase.updatePaymentStatus).toHaveBeenCalledWith('payment-123', PaymentStatus.COMPLETED)
      expect(mockReply.send).toHaveBeenCalledWith({ success: true })
    })

    it('should handle errors during webhook processing', async () => {
      const mockPaymentUseCase = {
        updatePaymentStatus: vi.fn().mockRejectedValue(new Error('Update failed'))
      } as unknown as PaymentUseCase

      const mockRequest = {
        body: {
          id: 'payment-123',
          status: PaymentStatus.FAILED
        }
      } as FastifyRequest

      const mockReply = {
        send: vi.fn(),
        status: vi.fn().mockReturnThis(),
        code: vi.fn().mockReturnThis()
      } as unknown as FastifyReply

      vi.spyOn(PaymentUseCase.prototype, 'updatePaymentStatus').mockImplementation(mockPaymentUseCase.updatePaymentStatus)

      await expect(handlePaymentWebhook(mockRequest, mockReply)).rejects.toThrow('Update failed')
    })
  })
})
