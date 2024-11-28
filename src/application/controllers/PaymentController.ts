import { PaymentStatus } from '@/core/domain/entities/Payment'
import { PaymentUseCase } from '@/core/domain/use-cases/PaymentUseCase'
import { PaymentRepository } from '@/infra/repositories/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

const paymentUseCase = new PaymentUseCase(new PaymentRepository())

export const getPaymentQrCode = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string }
  const payment = await paymentUseCase.getPaymentById(id)
  reply.send({ qrCode: payment.getQrCode() })
}

export const handlePaymentWebhook = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id, status } = request.body as { id: string; status: string }
  await paymentUseCase.updatePaymentStatus(id, status as PaymentStatus)
  reply.send({ success: true })
}
