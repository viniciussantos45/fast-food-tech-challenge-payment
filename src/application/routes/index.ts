import { FastifyInstance } from 'fastify'

import { paymentRoutes } from './PaymentRoute'

export const registerRoutes = (fastify: FastifyInstance): void => {
  paymentRoutes(fastify)
}
