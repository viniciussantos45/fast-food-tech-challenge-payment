const assert = require('assert')
const { Given, When, Then } = require('@cucumber/cucumber')

Given('que o valor do pagamento é inválido \\(R$ {int})', function (amount) {
  this.pedido = { amount }
  assert(amount <= 0, 'O valor do pagamento deve ser inválido')
})

When('eu solicito a geração do QR Code', function () {
  // Simula a validação e geração do QR Code
  if (this.pedido.amount <= 0) {
    this.pedido.errorMessage = 'Valor do pagamento inválido'
    this.pedido.qrCode = null
  } else {
    this.pedido.errorMessage = null
    this.pedido.qrCode = 'mocked-qr-code'
  }
})

Then('o sistema deve retornar uma mensagem de erro {string}', function (expectedErrorMessage) {
  assert.strictEqual(this.pedido.errorMessage, expectedErrorMessage)
})

Then('o pagamento não deve ser processado', function () {
  assert.strictEqual(this.pedido.qrCode, null, 'QR Code não deve ser gerado para pagamento inválido')
})

Then('o QR Code não deve ser gerado', function () {
  assert.strictEqual(this.pedido.qrCode, null, 'QR Code não deve ser gerado para pagamento inválido')
})
