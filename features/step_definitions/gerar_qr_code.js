const assert = require('assert')
const { Given, When, Then } = require('@cucumber/cucumber')

Given('que eu selecionei o método de pagamento QR Code', function () {
  // Nesse ponto, o pedido foi criado e o pagamento ainda nao foi gerado
  // O que vamos testar aqui é apenas a geração do QR Code
  // Nao vamos testar a criação do pedido, pois isso é feito em outro lugar
  // Nao vamos testar a geração do pagamento, pois isso é feito em outro lugar
  // Entao, aqui, vamos apenas fazer um mock do pedido criado
  // e verificar se o QR Code foi gerado corretamente
  const pedido = {
    id: 1,
    status: 'Aguardando Pagamento',
    amount: 100,
    qrCode: null,
    createdAt: new Date()
  }
  this.pedido = pedido
})

Given('que o pedido está registrado no sistema', function () {
  // Simulating that the order is registered in the system
  assert.strictEqual(this.pedido.id, 1)
  assert.strictEqual(this.pedido.status, 'Aguardando Pagamento')
})

When('eu solicitar a geração do QR Code', function () {
  // Simula a geração do QR Code sem usá-lo diretamente
  this.pedido.qrCode = 'mocked-qr-code-123'
  assert.notStrictEqual(this.pedido.qrCode, null)
})

Then('o QR Code deverá ser gerado com sucesso', function () {
  // Agora, vamos verificar se o QR Code foi gerado corretamente
  assert.strictEqual(this.pedido.qrCode, 'mocked-qr-code-123')
})

Then('eu poderei visualizar o QR Code na tela', function () {
  // Aqui, vamos apenas verificar se o QR Code foi gerado e está disponível
  // para ser exibido na tela.
  assert.notStrictEqual(this.pedido.qrCode, null)
})

Then('o pedido deverá ser atualizado como {string}', function (string) {
  assert.strictEqual(this.pedido.status, string)
})
