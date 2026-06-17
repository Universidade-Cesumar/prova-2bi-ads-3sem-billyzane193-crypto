# Sistema de Controle de Estoque - Sprint 2

Este projeto é um módulo de gerenciamento de materiais desenvolvido para a avaliação do 2º Bimestre. O foco desta entrega foi a implementação das funcionalidades de baixa de insumos e exclusão de itens integrados a uma API simulada.

## 🚀 Funcionalidades Implementadas

- **Baixa de Estoque (PUT):** Permite reduzir a quantidade de um material disponível através do identificador `#input-retirada` e do botão `.btn-baixar`.
- **Validação de Segurança:** Implementação da função obrigatória `validarRetirada(estoqueAtual, quantidadeRetirada)` que impede a inserção de valores negativos ou retiradas maiores do que o saldo em estoque.
- **Exclusão de Materiais (DELETE):** Remoção definitiva de itens tanto do servidor MockAPI quanto do fluxo visual da tela usando o botão `.btn-excluir`.

## 🛠️ Tecnologias Utilizadas

- HTML5 (Estruturação da interface)
- CSS3 (Estilização básica)
- JavaScript Vanilla (Consumo de API assíncrona com Async/Await e manipulação do DOM)
- MockAPI (Servidor remoto para persistência dos dados)

## 📦 Como Rodar o Projeto

1. Faça o clone deste repositório para a sua máquina local.
2. Abra o arquivo `index.html` diretamente em seu navegador ou utilize a extensão **Live Server** no VS Code para rodar um servidor local.
3. Certifique-se de que possui conexão com a internet para que as requisições à MockAPI funcionem corretamente.