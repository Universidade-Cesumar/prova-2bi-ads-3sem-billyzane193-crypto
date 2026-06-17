const API_URL = "https://6a308e06a7f8866418d6230f.mockapi.io/api/v1/materiais";

const inputNome = document.getElementById("input-nome");
const inputQuantidade = document.getElementById("input-quantidade");
const btnCadastrar = document.getElementById("btn-cadastrar");
const listaMateriais = document.getElementById("lista-materials"); // Alinhado com o ID do HTML

// 1. FUNÇÃO OBRIGATÓRIA DE VALIDAÇÃO (0,5 pt)
function validarRetirada(estoqueAtual, quantidadeRetirada) {
    if (quantidadeRetirada <= 0) {
        return false; 
    }
    if (quantidadeRetirada > estoqueAtual) {
        return false; 
    }
    return true; 
}

// 2. RENDERIZAÇÃO DINÂMICA DA TABELA
async function carregarMateriais() {
    try {
        const resposta = await fetch(API_URL);
        const materiais = await resposta.json();

        const tabelaBody = document.getElementById("lista-materiais");
        tabelaBody.innerHTML = "";

        materiais.forEach(material => {
            tabelaBody.innerHTML += `
                <tr>
                    <td>${material.nome}</td>
                    <td>${material.quantidade}</td>
                    <td>
                        <div style="display: flex; gap: 5px; justify-content: center;">
                            <input type="number" id="input-retirada" class="input-retirada-qtd" data-id="${material.id}" placeholder="Qtd" style="width: 60px; margin-bottom: 0; padding: 5px;">
                            
                            <button class="btn-baixar" onclick="baixarEstoque('${material.id}', ${material.quantidade})" style="width: auto; padding: 5px 10px;">Baixar</button>
                            <button class="btn-excluir" onclick="excluirMaterial('${material.id}')" style="width: auto; padding: 5px 10px;">Excluir</button>
                        </div>
                    </td>
                </tr>
            `;
        });

    } catch (erro) {
        console.log("Erro ao carregar materiais:", erro);
    }
}

// 3. CONEXÃO PUT - BAIXAR ESTOQUE (1,0 pt)
async function baixarEstoque(id, estoqueAtual) {
    // Busca o input correto da linha clicada
    const inputs = document.querySelectorAll(".input-retirada-qtd");
    let inputDaLinha = null;
    
    inputs.forEach(inp => {
        if(inp.getAttribute("data-id") === id) {
            inputDaLinha = inp;
        }
    });

    if (!inputDaLinha) return;
    const quantidadeRetirada = Number(inputDaLinha.value);

    // Validação usando a função obrigatória
    if (!validarRetirada(estoqueAtual, quantidadeRetirada)) {
        alert("Quantidade inválida! Não são aceitos valores negativos ou maiores que o estoque.");
        return;
    }

    const novaQuantidade = estoqueAtual - quantidadeRetirada;

    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ quantidade: novaQuantidade })
        });

        if (resposta.ok) {
            carregarMateriais(); 
        } else {
            alert("Erro ao atualizar no servidor.");
        }
    } catch (erro) {
        console.log("Erro ao dar baixa:", erro);
    }
}

// 4. CONEXÃO DELETE - EXCLUIR ITEM (0,5 pt)
async function excluirMaterial(id) {
    if (!confirm("Deseja realmente excluir este item?")) return;

    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (resposta.ok) {
            carregarMateriais(); 
        } else {
            alert("Erro ao excluir do servidor.");
        }
    } catch (erro) {
        console.log("Erro ao excluir:", erro);
    }
}

// 5. CADASTRO DE MATERIAL (Mantido do original)
async function cadastrarMaterial() {
    const nome = inputNome.value.trim();
    const quantidade = Number(inputQuantidade.value);

    if (nome === "" || quantidade <= 0) {
        alert("Preencha os campos corretamente.");
        return;
    }

    const novoMaterial = { nome, quantidade };

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoMaterial)
        });

        inputNome.value = "";
        inputQuantidade.value = "";
        carregarMateriais();

    } catch (erro) {
        console.log("Erro ao cadastrar:", erro);
    }
}

btnCadastrar.addEventListener("click", cadastrarMaterial);
carregarMateriais();