# language: pt
Funcionalidade: Gerar QR Code do pagamento
  Como um usuário
  Quero gerar um QR Code para um pagamento
  Para que eu possa realizar o pagamento de forma segura

  Cenário: Pagamento com valor inválido
    Dado que o valor do pagamento é inválido (R$ -10)
    Quando eu solicito a geração do QR Code
    Então o sistema deve retornar uma mensagem de erro "Valor do pagamento inválido"
    E o pagamento não deve ser processado
    E o QR Code não deve ser gerado
