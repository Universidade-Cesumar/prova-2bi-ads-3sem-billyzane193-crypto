# Sistema de Controle de Estoque - Dashboard & Gestão

Este projeto é um sistema de gerenciamento de materiais desenvolvido para a disciplina de ADS. Evoluído ao longo das Sprints, o sistema agora conta com um dashboard completo, controle de estoque crítico e integração robusta com API.

## 🌐 Link do Projeto (Deploy)
[https://billyzane193-crypto.github.io/prova-2bi-ads-3sem-billyzane193-crypto/]

## 🚀 Funcionalidades Atuais

- **Dashboard Integrado:** Filtro de busca em tempo real com contador dinâmico de itens (`#total-itens`).
- **Alerta de Estoque Crítico:** Identificação visual automática (`.estoque-critico`) para materiais com menos de 10 unidades.
- **Gestão de Materiais:** Cadastro (POST), Baixa de estoque via PUT (com validação obrigatória) e Exclusão (DELETE).
- **Segurança:** Tratamento de erros de conexão via `try/catch` em todas as requisições assíncronas.

## 🛠️ Tecnologias
- HTML5, CSS3, JavaScript (ES6+).
- Integração via `fetch` com MockAPI.
- Versionamento com Git/GitHub.

## 📦 Como Rodar
1. Acesse o link do deploy acima ou clone este repositório.
2. Certifique-se de estar com conexão à internet para carregar os dados da API.