const assert = require('assert')
const { Given, When, Then } = require('@cucumber/cucumber')

Given('que eu selecionei o método de pagamento QR Code', function () {
  // Mock do pedido inicial
  this.pedido = {
    id: 1,
    status: 'Criado',
    amount: 100,
    qrCode: null,
    createdAt: new Date()
  }
})

Given('que o pedido está registrado no sistema', function () {
  assert.ok(this.pedido, 'Pedido não foi inicializado')
  assert.strictEqual(this.pedido.id, 1, 'ID do pedido está incorreto')
  assert.strictEqual(this.pedido.status, 'Criado', 'Status inicial do pedido está incorreto')
})

When('eu solicitar a geração do QR Code', function () {
  // Simulação de geração do QR Code
  this.pedido.qrCode = 'mocked-qr-code-123'
  this.pedido.status = 'Aguardando Pagamento'
})

Then('o QR Code deverá ser gerado com sucesso', function () {
  assert.strictEqual(this.pedido.qrCode, 'mocked-qr-code-123', 'QR Code não foi gerado corretamente')
})

Then('eu poderei visualizar o QR Code na tela', function () {
  assert.ok(this.pedido.qrCode, 'QR Code não está disponível para exibição')
})

Then('o pedido deverá ser atualizado como {string}', function (statusEsperado) {
  assert.strictEqual(this.pedido.status, statusEsperado, `Status do pedido não foi atualizado para "${statusEsperado}"`)
})
