import { FastifySchema } from 'fastify'

export const getPaymentQrCodeSchema: FastifySchema = {
  description: 'Obtém o QR code de um pagamento',
  tags: ['payment'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    },
    required: ['id']
  },
  response: {
    200: {
      description: 'QR code do pagamento',
      type: 'object',
      properties: {
        qrCode: { type: 'string' }
      }
    }
  }
}
