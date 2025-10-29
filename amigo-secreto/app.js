let nomes = [];

function adicionarNome() {
    // CORREÇÃO: Buscando o ID correto do HTML
    let nomeInput = document.getElementById("amigo");
    let nome = nomeInput.value.trim();

    if (nome === "") {
        alert("Digite um nome de um amigo para sorteá-lo");
        return;
    }

    if (!nomes.includes(nome)) {
        nomes.push(nome);
        atualizarLista();
        nomeInput.value = "";
    } else {
        alert("Nome já adicionado!");
    }
}

function atualizarLista() {
    // CORREÇÃO: Buscando o ID correto do HTML
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    nomes.forEach(nome => {
        let item = document.createElement("li");
        item.textContent = nome;
        lista.appendChild(item);
    });
}

function sortearNome() {
    let resultadoLista = document.getElementById("resultado");
    resultadoLista.innerHTML = ""; // Limpa resultados anteriores

    // Para um amigo secreto, precisamos de pelo menos 3 pessoas
    if (nomes.length < 3) {
        alert("Adicione pelo menos 3 nomes para sortear!");
        return;
    }

    // 1. Criamos uma cópia da lista de nomes
    let sorteados = [...nomes];

    // 2. Embaralhamos a lista (Algoritmo Fisher-Yates)
    for (let i = sorteados.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sorteados[i], sorteados[j]] = [sorteados[j], sorteados[i]];
    }

    // 3. Criamos os pares (A -> B, B -> C, ..., Z -> A)
    // Isso garante que ninguém tire a si mesmo.
    for (let i = 0; i < sorteados.length; i++) {
        let amigoDaVez = sorteados[i];
        
        // O último da lista tira o primeiro, fechando o ciclo.
        let amigoSorteado = (i === sorteados.length - 1) ? sorteados[0] : sorteados[i + 1];

        let item = document.createElement("li");
        item.textContent = `${amigoDaVez} ➔ ${amigoSorteado}`;
        resultadoLista.appendChild(item);
    }
}

// CORREÇÃO: Removemos os eventListeners que estavam aqui,
// pois estamos usando 'onclick' no HTML.
