# language: pt
Funcionalidade: Atualizar status do pagamento
  Como um sistema de pagamento
  Quero enviar um webhook para atualizar o status de um pagamento
  Para que o sistema reflita corretamente o estado atual do pagamento

  Cenário: Atualização bem-sucedida
    Dado que existe um pagamento com o ID "123" e status "PENDENTE"
    Quando eu envio um webhook com o status "PAGO"
    Então o sistema deve atualizar o status do pagamento para "PAGO"
    E deve retornar uma mensagem de sucesso

  Cenário: Pagamento inexistente
    Dado que não existe um pagamento com o ID "999"
    Quando eu envio um webhook com o status "PAGO"
    Então o sistema deve retornar uma mensagem de erro para status de pagamento "Pagamento não encontrado"
