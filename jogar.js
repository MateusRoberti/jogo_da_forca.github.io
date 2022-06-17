//Para montagem da Forca
var xForca = 200;
var yForca = 350;
var espessuraDaForca = 15;
var alturaDaForca = 300;

//Para montagem dos traços
var xTracos = xForca + 250;
var yTracos = yForca + 10;
var larguraDoTraco = 30;
var espessuraDoTraco = 8;
var espaçoEntreTracos = 40;

//Para montagem do corpo
var tamanhoDaCabeça = 20;
var espessuraDoCorpo = espessuraDaForca/2;
var tamanhoDoTronco = tamanhoDaCabeça * 4;
var tamanhoDosMembros = tamanhoDoTronco/2;
var xCabeca = xForca + 137.5 + (espessuraDaForca/2);
var yCabeca = yForca - alturaDaForca + 45 + tamanhoDaCabeça;
var xTronco = xForca + 137.5 + (espessuraDaForca/2) - (espessuraDoCorpo/2);
var yTronco = yForca - alturaDaForca + 45 + (tamanhoDaCabeça*2);

var contadorDeErros = 0;
var contadorDeAcertos = 0;

var letrasIncorretas = "";


var corBloco = 'white';
var corFundo = 'darkslategrey';

var possiveisPalavras = ['CANETA', 'BORRACHA', 'CADERNO', 'LAPIS', 'CARTOLINA', 'TESOURA', 'MOCHILA', 'ESTOJO', 'AGENDA', 'GRAFITE', 'GIZ', 'TINTA', 'PINCEL', 'COLA', 'PASTA' ];
var alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

var tela = document.querySelector('canvas');
var pincel = tela.getContext('2d');

function desenhaRetangulo(x, y, largura, altura, cor) {

        pincel.fillStyle=cor;
        pincel.fillRect(x,y, largura, altura);
        pincel.strokeStyle=cor;
        pincel.strokeRect(x,y, largura, altura);
}

function desenhaForca(xInicial, yInicial, cor){
        desenhaRetangulo(xInicial, yInicial, 100, espessuraDaForca, cor); //base
        desenhaRetangulo(xInicial + 37.5, yInicial - alturaDaForca, espessuraDaForca, alturaDaForca, cor); //coluna
        desenhaRetangulo(xInicial + 37.5, yInicial - alturaDaForca, 100, espessuraDaForca, cor); //viga
        desenhaRetangulo(xInicial + 137.5, yInicial - alturaDaForca, espessuraDaForca, 45, cor); //forca
}

function desenhaTracos(xInicial, yInicial, palavra, cor){

        var x = xInicial;

        for( var i = 0; i < palavra.length; i++){

                desenhaRetangulo(x, yInicial, larguraDoTraco, espessuraDoTraco, cor);
                x = x + espaçoEntreTracos;
        }
}

function desenhaCabeca(){

        pincel.fillStyle = corBloco;
        pincel.beginPath();
        pincel.arc(xCabeca , yCabeca, tamanhoDaCabeça, 0, 2 * Math.PI);
        pincel.fill();

        pincel.fillStyle = corFundo;
        pincel.beginPath();
        pincel.arc(xCabeca , yCabeca, (0.8*tamanhoDaCabeça), 0, 2 * Math.PI);
        pincel.fill();
}

function desenhaTronco(){

        desenhaRetangulo(xTronco, yTronco, espessuraDoCorpo, tamanhoDoTronco, corBloco);
}

function desenhaMembros(membro){

        var xBraco = xTronco;
        var yBraco = yTronco + tamanhoDoTronco/5;

        if(membro == 1){
        
                pincel.fillStyle = corBloco;
                pincel.beginPath();           
                pincel.moveTo(xBraco, yBraco);
                pincel.lineTo(xBraco - tamanhoDaCabeça, yBraco + tamanhoDosMembros);
                pincel.lineTo(xBraco - tamanhoDaCabeça + espessuraDoCorpo, yBraco + tamanhoDosMembros);
                pincel.lineTo(xBraco + espessuraDoCorpo, yBraco);
                pincel.fill();
        }

        if(membro == 2){
        
                pincel.fillStyle = corBloco;
                pincel.beginPath();           
                pincel.moveTo(xBraco + espessuraDoCorpo, yBraco);
                pincel.lineTo(xBraco + espessuraDoCorpo + tamanhoDaCabeça, yBraco + tamanhoDosMembros);
                pincel.lineTo(xBraco + tamanhoDaCabeça, yBraco + tamanhoDosMembros);
                pincel.lineTo(xBraco , yBraco);
                pincel.fill();
        }

        if(membro == 3){
        
                pincel.fillStyle = corBloco;
                pincel.beginPath();           
                pincel.moveTo(xBraco, yTronco + tamanhoDoTronco);
                pincel.lineTo(xBraco - tamanhoDaCabeça, yTronco + tamanhoDoTronco + tamanhoDosMembros);
                pincel.lineTo(xBraco - tamanhoDaCabeça + espessuraDoCorpo, yTronco + tamanhoDoTronco + tamanhoDosMembros);
                pincel.lineTo(xBraco + espessuraDoCorpo, yTronco + tamanhoDoTronco);
                pincel.fill();
        }

        if(membro == 4){
        
                pincel.fillStyle = corBloco;
                pincel.beginPath();           
                pincel.moveTo(xBraco + espessuraDoCorpo, yTronco + tamanhoDoTronco);
                pincel.lineTo(xBraco + espessuraDoCorpo + tamanhoDaCabeça, yTronco + tamanhoDoTronco + tamanhoDosMembros);
                pincel.lineTo(xBraco + tamanhoDaCabeça, yTronco + tamanhoDoTronco + tamanhoDosMembros);
                pincel.lineTo(xBraco , yTronco + tamanhoDoTronco);
                pincel.fill();
        }


}


function criaPalavraSecreta(){

        return possiveisPalavras[Math.floor(Math.random() * possiveisPalavras.length)];
}


function desenhaLetras(texto, x, y, cor){

        pincel.font = '20px cursive';
        pincel.fillStyle = cor;
        pincel.fillText(texto, x, y);
}



function mensagemDeLetraJaDigitada(){
        alert("Letra já digitada e incorreta!");
}


function mensagemFimDeJogo(mensagem){

        if(mensagem == 1){

                desenhaLetras("Fim de Jogo! Você perdeu...", xTracos, yTracos - (espessuraDoTraco + 100), "red");
        }

        if(mensagem == 2){

                desenhaLetras("Parabéns! Você venceu!!!", xTracos, yTracos - (espessuraDoTraco + 100), "lightgreen");
        }
}



function comparaLetras(evento){

        var digitado = evento.keyCode;


        for(var x = 0; x < alfabeto.length; x++){
                if (digitado == (x + 65)) { 

                        var letraDigitada = alfabeto[x];
                        
                        //Caso a letra digitada esteja presente na palavra secreta
                        if(palavraSecreta.includes(letraDigitada) == true){
                                for(var i = 0; i < palavraSecreta.length; i++){
                                        if(letraDigitada == palavraSecreta[i]){
                                                desenhaLetras(letraDigitada, xTracos + (i * espaçoEntreTracos), yTracos - (espessuraDoTraco + 10), corBloco);
                                                contadorDeAcertos++;
                                        }
                                }  

                                //Se o número de acertos for igual ao número de letras da palavra secreta
                                if(contadorDeAcertos == palavraSecreta.length){
                                        mensagemFimDeJogo(2);
                                }              
                        }

                        //Caso não esteja 
                        if(palavraSecreta.includes(letraDigitada) == false){
                                 
                                //Caso essa letra incorreta já tenha sido digitada
                                 if(letrasIncorretas.includes(letraDigitada)){
                                        mensagemDeLetraJaDigitada();

                                //Caso essa letra incorreta ainda não tenha sido digitada        
                                }else{ 
                                        contadorDeErros++;

                                        if((contadorDeErros == 1)){
        
                                                letrasIncorretas += letraDigitada;
                                                letrasIncorretas += '- ';
                                                desenhaLetras(letrasIncorretas, xForca + 600, yForca - alturaDaForca + 30, corBloco);
                                                desenhaCabeca();       
                                        }

                                        if(contadorDeErros == 2){
                                                letrasIncorretas += letraDigitada;
                                                letrasIncorretas += '- ';
                                                desenhaLetras(letrasIncorretas, xForca + 600, yForca - alturaDaForca + 30, corBloco);
                                                desenhaTronco();   
                                        }

                                        if(contadorDeErros == 3){
                                                
                                                letrasIncorretas += letraDigitada;
                                                letrasIncorretas += '- ';
                                                desenhaLetras(letrasIncorretas, xForca + 600, yForca - alturaDaForca + 30, corBloco);
                                                desenhaMembros(1);   
                                        }

                                        if(contadorDeErros == 4){
                                                
                                                letrasIncorretas += letraDigitada;
                                                letrasIncorretas += '- ';
                                                desenhaLetras(letrasIncorretas, xForca + 600, yForca - alturaDaForca + 30, corBloco);
                                                desenhaMembros(2);    
                                        }

                                        if(contadorDeErros == 5){
                                                
                                                letrasIncorretas += letraDigitada;
                                                letrasIncorretas += '- ';
                                                desenhaLetras(letrasIncorretas, xForca + 600, yForca - alturaDaForca + 30, corBloco);
                                                desenhaMembros(3);    
                                        }

                                        if(contadorDeErros == 6){
                                                
                                                letrasIncorretas += letraDigitada;
                                                letrasIncorretas += '- ';
                                                desenhaLetras(letrasIncorretas, xForca + 600, yForca - alturaDaForca + 30, corBloco);
                                                desenhaMembros(4);    
                                                mensagemFimDeJogo(1);
                                        }
                                }        
                        }
                        
                } else{ }
        } 
} 

//Geração da palavra secreta
var palavraSecreta = criaPalavraSecreta();

//Dica 
desenhaLetras('Dica: material escolar', xForca + 600 , yForca - alturaDaForca + 250, corBloco);

//Espaço para letras incorretas digitadas
desenhaLetras('Tentativas incorretas:', xForca + 600 , yForca - alturaDaForca, corBloco);

//Desenho da forca
desenhaForca(xForca, yForca, corBloco);

//Desenho dos traços correspondentes
desenhaTracos(xTracos, yTracos, palavraSecreta ,corBloco);


document.onkeydown = comparaLetras;




