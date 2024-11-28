import { FastifyInstance } from 'fastify'
import { getPaymentQrCode, handlePaymentWebhook } from '../controllers/PaymentController'
import { getPaymentQrCodeSchema } from '../schemas/GetPaymentQrCode'
import { paymentWebhookSchema } from '../schemas/PaymentWebhook'

export const paymentRoutes = (fastify: FastifyInstance) => {
  // GET /payment/:id/qr-code
  fastify.get(
    '/payment/:id/qr-code',
    {
      schema: getPaymentQrCodeSchema
    },
    getPaymentQrCode
  )

  // POST /payment/webhook
  fastify.post(
    '/payment/webhook',
    {
      schema: paymentWebhookSchema
    },
    handlePaymentWebhook
  )
}
