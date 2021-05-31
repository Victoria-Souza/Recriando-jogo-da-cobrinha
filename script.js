
let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d"); //renderiza o desenho que vai acontecer no canvas
let box = 32;
let snake = []; //criar cobrinha como array, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
snake[0] ={  //criar cobrinha
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
//para a comida aparecer um lugares aleatório
let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//função de criar o background
function criarBG(){
    context.fillStyle = "lightgreen";  //definir o estilo do contexto
    context.fillRect(0, 0, 16*box, 16*box); //desenha o retângulo usando x e y e a largura e altura setadas, onde vai rodar o jogo
}

function criarCobrinha (){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "darkgreen";  //cor da cobrinha
        context.fillRect(snake[i].x, snake[i].y, box, box); //tamanho da cobrinha
    }
}

//para criar a comida
function drawFood (){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//ouvinte, quando um evento acontece (keydown = click), detecta e chama uma função update
document.addEventListener('keydown', update);

//para criar os movimentos da cobrinha, e se ela está indo em uma direção você não pode do nada ir para a contrária
function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo(){    
    
    //função para quando a cobrinha bater na parece, ela não sumir e voltar do outro lado
    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;
     
    //Para se a cobra se chocar com o próprio corpo, dar game over
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box; //vai criar um quadrado a mais se estiver indo para a direita
    if(direction == "left") snakeX -= box; //vai tirar um quadrado se estiver indo para a esquerda
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //pop tira o último elemento da array
    }else{
        //para quando a cobra comer a frutinha, ela depois aparecer em outro lugar
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }
    
    let newHead ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha
}
//intervalo de tempo em ms que a função vai acontecer
let jogo = setInterval(iniciarJogo, 100);