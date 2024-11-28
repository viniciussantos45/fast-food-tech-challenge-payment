import { FastifySchema } from 'fastify'

export const paymentWebhookSchema: FastifySchema = {
  description: 'Webhook para receber e processar atualizações de pagamento',
  tags: ['payment'],
  body: {
    type: 'object',
    required: ['id', 'status'],
    properties: {
      id: { type: 'string' },
      status: { type: 'string' }
    }
  },
  response: {
    200: {
      description: 'Confirmação de recebimento do webhook',
      type: 'object',
      properties: {
        success: { type: 'boolean' }
      }
    }
  }
}
