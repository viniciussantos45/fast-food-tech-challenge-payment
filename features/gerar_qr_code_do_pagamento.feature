# language: pt
Funcionalidade: Geração de QR Code para Pagamento
  Como um cliente
  Quero gerar um QR Code
  Para que eu possa pagar o pedido feito de maneira eficiente

  Cenário: Gerar QR Code para pagamento
    Dado que eu selecionei o método de pagamento QR Code
    E que o pedido está registrado no sistema
    Quando eu solicitar a geração do QR Code
    Então o QR Code deverá ser gerado com sucesso
    E eu poderei visualizar o QR Code na tela
    E o pedido deverá ser atualizado como "Aguardando Pagamento"

