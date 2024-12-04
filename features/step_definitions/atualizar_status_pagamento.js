const assert = require('assert')
const { Given, When, Then } = require('@cucumber/cucumber')

let pagamento = null
let resposta = null

Given('que existe um pagamento com o ID {string} e status {string}', function (id, status) {
  pagamento = { id, status } // Simulação de um pagamento existente
})

Given('que não existe um pagamento com o ID {string}', function (id) {
  pagamento = null // Simula que o pagamento não existe
})

When('eu envio um webhook com o status {string}', async function (novoStatus) {
  if (!pagamento) {
    resposta = { sucesso: false, mensagem: 'Pagamento não encontrado' }
    return
  }

  pagamento.status = novoStatus // Atualiza o status do pagamento
  resposta = { sucesso: true, mensagem: 'Status atualizado com sucesso' }
})

Then('o sistema deve atualizar o status do pagamento para {string}', function (statusEsperado) {
  assert.strictEqual(pagamento.status, statusEsperado, 'O status do pagamento não foi atualizado corretamente')
})

Then('deve retornar uma mensagem de sucesso', function () {
  assert.strictEqual(resposta.sucesso, true)
  assert.strictEqual(resposta.mensagem, 'Status atualizado com sucesso')
})

Then('o sistema deve retornar uma mensagem de erro para status de pagamento {string}', function (mensagemEsperada) {
  assert.strictEqual(resposta.sucesso, false);
  assert.strictEqual(resposta.mensagem, mensagemEsperada);
});
