const API_URL = "https://6a308e06a7f8866418d6230f.mockapi.io/api/v1/materiais";

const inputNome = document.getElementById("input-nome");
const inputQuantidade = document.getElementById("input-quantidade");
const btnCadastrar = document.getElementById("btn-cadastrar");
const listaMateriais = document.getElementById("lista-materiais"); 

// Novos elementos da Sprint 3
const inputBusca = document.getElementById("input-busca");
const spanTotal = document.getElementById("total-itens");

// 1. FUNÇÃO OBRIGATÓRIA DE VALIDAÇÃO (Mantida)
function validarRetirada(estoqueAtual, quantidadeRetirada) {
    if (quantidadeRetirada <= 0 || quantidadeRetirada > estoqueAtual) return false;
    return true;
}

// 2. RENDERIZAÇÃO DINÂMICA (Sprint 2 + Sprint 3)
async function carregarMateriais() {
    try {
        const resposta = await fetch(API_URL);
        // Tratamento de erro robusto (Sprint 3)
        if (!resposta.ok) throw new Error("Erro na rede");
        
        const materiais = await resposta.json();

        // Lógica de busca (Sprint 3)
        const termo = inputBusca.value.toLowerCase();
        const filtrados = materiais.filter(m => m.nome.toLowerCase().includes(termo));

        listaMateriais.innerHTML = "";

        filtrados.forEach(material => {
            // Aplicação da classe obrigatória (Sprint 3)
            const classeCritica = material.quantidade < 10 ? 'class="estoque-critico"' : '';
            
            listaMateriais.innerHTML += `
                <tr ${classeCritica}>
                    <td>${material.nome}</td>
                    <td>${material.quantidade}</td>
                    <td>
                        <div style="display: flex; gap: 5px; justify-content: center;">
                            <input type="number" class="input-retirada-qtd" data-id="${material.id}" placeholder="Qtd" style="width: 60px;">
                            <button class="btn-baixar" onclick="baixarEstoque('${material.id}', ${material.quantidade})">Baixar</button>
                            <button class="btn-excluir" onclick="excluirMaterial('${material.id}')">Excluir</button>
                        </div>
                    </td>
                </tr>
            `;
        });

        // Atualização do contador (Sprint 3)
        spanTotal.innerText = filtrados.length;

    } catch (erro) {
        console.error("Erro no sistema:", erro);
        // Tratamento visual de erro para o usuário (Sprint 3)
        alert("Ops! Não foi possível carregar os materiais. Verifique sua conexão.");
    }
}

// 3. CONEXÃO PUT (Sprint 2)
async function baixarEstoque(id, estoqueAtual) {
    const inputs = document.querySelectorAll(".input-retirada-qtd");
    let inputDaLinha = Array.from(inputs).find(inp => inp.getAttribute("data-id") === id);

    if (!inputDaLinha) return;
    const quantidadeRetirada = Number(inputDaLinha.value);

    if (!validarRetirada(estoqueAtual, quantidadeRetirada)) {
        alert("Quantidade inválida!");
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantidade: estoqueAtual - quantidadeRetirada })
        });
        if (resposta.ok) carregarMateriais();
    } catch (erro) { console.error("Erro ao baixar:", erro); }
}

// 4. CONEXÃO DELETE (Sprint 2)
async function excluirMaterial(id) {
    if (!confirm("Deseja realmente excluir este item?")) return;
    try {
        const resposta = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (resposta.ok) carregarMateriais();
    } catch (erro) { console.error("Erro ao excluir:", erro); }
}

// 5. CADASTRO (Sprint 1/2)
async function cadastrarMaterial() {
    const nome = inputNome.value.trim();
    const quantidade = Number(inputQuantidade.value);
    if (nome === "" || quantidade <= 0) return alert("Preencha os campos!");

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, quantidade })
        });
        inputNome.value = ""; inputQuantidade.value = "";
        carregarMateriais();
    } catch (erro) { console.error("Erro ao cadastrar:", erro); }
}

// Event Listeners
btnCadastrar.addEventListener("click", cadastrarMaterial);
inputBusca.addEventListener("input", carregarMateriais); // Busca em tempo real
carregarMateriais();