let jogadorAtual = true;

let listaJogo = [[1, 1, 1],
                 [1, 1, 1],
                 [1, 1, 1]];

function apertarCasa(e) {
    let classeForma, numeroAdicionado;
    let numeroClicado = JSON.parse(e.getAttribute("id").split("-")[1]);

    if(jogadorAtual) {
        classeForma = "forma-circulo";
        numeroAdicionado = 2;
    }
    else {
        classeForma = "forma-x";
        numeroAdicionado = 0;
    }

    if (listaJogo[Math.floor(numeroClicado / 3)][numeroClicado%3] != 1) {
        return
    }
    listaJogo[Math.floor(numeroClicado / 3)][numeroClicado%3] = numeroAdicionado;

    e.getElementsByClassName("campo-forma")[0].classList.add(classeForma);
    jogadorAtual = !jogadorAtual;

    
    switch (verificarJogo()) {
        case true:
            console.log("Bolinha venceu!");
            break;
            
        case false:
            console.log("X venceu!");
            break;

            default:
                console.log("Ninguém venceu!");
            break;
    }
}

function verificarJogo() {
    //Verificando linhas e colunas
    let contadorColuna = [0,0,0];
    let diagonalPrincipal = 0;
    let diagonalSecundaria = 0;
    let resultadoLinha = null;

    listaJogo.forEach((listaLinha, index) => {

        //Colunas
        contadorColuna[0] += listaLinha[0];
        contadorColuna[1] += listaLinha[1];
        contadorColuna[2] += listaLinha[2];

        //Linhas
        let contadorLinha = 0;
        
        listaLinha.forEach((elemento, i) => {
            
            contadorLinha += elemento;
            

            if(index == i) diagonalPrincipal += elemento;
            if(3 - index == i) diagonalSecundaria += elemento;
        })

        if(contadorLinha == 0) resultadoLinha = false
        if(contadorLinha === 6) resultadoLinha = true
    })

    if(resultadoLinha != null) return resultadoLinha

    for(soma of contadorColuna) {
        if(soma == 0) return false
        if(soma == 6) return true
    }

    if(diagonalPrincipal == 0 || diagonalSecundaria == 0) return false
    if(diagonalPrincipal == 6 || diagonalSecundaria == 6) return true

    return null
}