const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0
}

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0
}

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock(round) {
    let random = Math.random();
    let result

    if (random > 0.66 && round === 1) {
        do {
            random = Math.random();
        } while (random > 0.66);
    }

    switch (true) {
        case random < 0.33:
            result = 'RETA'
            break;
        case random < 0.66:
            result = 'CURVA'
            break;
        default:
            result = 'CONFRONTO'
    }

    return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function declareWinner(character1, character2) {
    console.log("Resultado final: \n")
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`)
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`)

    if (character1.PONTOS > character2.PONTOS)
        console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`)
    else if (character2.PONTOS > character1.PONTOS)
        console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`)
    else
        console.log(`A corrida terminou empatada!`)
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        // Sortear Bloco
        let block = await getRandomBlock(round);
        console.log(`Bloco: ${block}`);

        // Rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // Teste de habilidade
        let totalTesteSkil1 = 0;
        let totalTesteSkil2 = 0;

        if (block === 'RETA') {
            totalTesteSkil1 = diceResult1 + character1.VELOCIDADE;
            totalTesteSkil2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(character1.NOME, 'Velocidade', diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, 'Velocidade', diceResult2, character2.VELOCIDADE);
        }
        if (block === 'CURVA') {
            totalTesteSkil1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTesteSkil2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(character1.NOME, 'Manobrabilidade', diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, 'Manobrabilidade', diceResult2, character2.MANOBRABILIDADE);

            console.log(totalTesteSkil1 === totalTesteSkil2 ? 'Confronto empatado! Nenhum ponto foi perdido.' : "");
        }

        if (block === 'CONFRONTO') {
            var powerResult1 = diceResult1 + character1.PODER;
            var powerResult2 = diceResult2 + character2.PODER;

            console.log(`${character1.NOME} confrontou ${character2.NOME}! 🥊`);

            await logRollResult(character1.NOME, 'Poder', diceResult1, character1.PODER);
            await logRollResult(character2.NOME, 'Poder', diceResult2, character2.PODER);

            if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`);
                character2.PONTOS--;
            }

            if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`)
                character1.PONTOS--;
            }

            console.log(powerResult1 === powerResult2 ? 'Confronto empatado! Nenhum ponto foi perdido.' : "");

        }

        // Verificando o vencedor...

        if (totalTesteSkil1 > totalTesteSkil2) {
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTOS++;
        } else if (totalTesteSkil2 > totalTesteSkil1) {
            console.log(`${character2.NOME} marcou um ponto!`);
            character2.PONTOS++;
        }

        console.log("____________________________________________________")
    }

    await declareWinner(character1, character2);
}

(async function main() {
    console.log(
        `🏁🚦 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
    )

    await playRaceEngine(player1, player2)


})()
