let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); //renderiza o desenho que vai acontecer no canvas
let box = 32;
 //função de criar o background
function criarBG() {
    context.fillStyle = "lightgreen"; //definir io estilo do contexto
    context.fillRect(0, 0, 16 * box, 16 * box); //vai desenhar o retângulo que vai acontecer o jogo
}

criarBG();