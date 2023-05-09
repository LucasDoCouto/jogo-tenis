const canvasEl = document.querySelector("canvas"),
canvasCtx = canvasEl.getContext("2d"),
gapX = 10


const mouse = {
   x:0,
   y:0
}

// declara uma constante para o objeto campo



const field = {
   w: window.innerWidth,
   h: window.innerHeight,
   draw: function(){
       // desenha o campo
       canvasCtx.fillStyle = "#286047"
       canvasCtx.fillRect(0, 0, this.w, this.h)
   }
}
// declara uma constante para o objeto linha central
const line = {
   w: 15,
   h: field.h,
   draw: function(){
       // desenha a linha central
       canvasCtx.fillStyle = "#fff"
       canvasCtx.fillRect(
       field.w / 2 - this.w / 2,
       0,
       this.w,
       field.h
       )
   }
}
// declara uma constante para o objeto raquete esquerda
const leftPaddle = {
   x: gapX,
   y: 0,
   w: line.w,
   h: 200,
   _move: function(){
       this.y = mouse.y - this.h / 2
   },
   draw: function(){
       // desenha a raquete da esquerda
       canvasCtx.fillStyle = "#fff"
       canvasCtx.fillRect(this.x, this.y, this.w, this.h)
       this._move()
   }
}
// declara uma constante para o objeto raquete direita
const rightPaddle = {
   x: field.w - line.w - gapX,
   y: 150,
   w: line.w,
   h: 200,
   speed: 5,
   _move: function(){
       if (this.y + this.h / 2 <  ball.y + ball.r){
           this.y += this.speed
       }
       else{
           this.y -= this.speed
       }
   },
   _speedUp: function(){
       this.speed += 1
   },
   draw: function(){
       // desenha a raquete da direita
       canvasCtx.fillStyle = "#fff"
       canvasCtx.fillRect(
           field.w - line.w - 10, 
           this.y, 
           line.w,
           200,
           this._move()
       )
   }
}
// declara uma constante para o placar
const score = {
   human: 0,
   computer: 0,
   increaseHuman: function(){
       this.human++
   },
   increaseComputer: function(){
       this.computer++
   },
   draw: function(){
       // escreve o placar
       canvasCtx.font = "bold 72px arial"
       canvasCtx.textAlign = "center"
       canvasCtx.textBaseline = "top"
       canvasCtx.fillStyle = "#01341d"
       canvasCtx.fillText(this.human, field.w / 4, 50)
       canvasCtx.fillText(this.computer, (field.w / 4) * 3, 50)
   }
}

// declara uma constante para o objeto bolinha
const ball = {
   x: 200,
   y: 300,
   r: 20,
   speed: 5,
   directionX: 1,
   directionY: 1,
   _calcPosition: function(){
       // verifica se o jogador 1 fez ponto
       if(this.x > field.w - this.r - rightPaddle.w - gapX){
           if(this.y + this.r > rightPaddle.y &&
              this.y - this.r < rightPaddle.y + rightPaddle.h
           ){
               this._reverseX()
           }
           else{
               score.increaseHuman()
               this._pointUp()
           }
       }

       // verifica se o jogador 2 fez ponto
       if(this.x < this.r + leftPaddle.w + gapX){
           if(this.y + this.r > leftPaddle.y && this.y - this.r < leftPaddle.y + leftPaddle.h
           ){
               this._reverseX()
           }
           else{
               score.increaseComputer()
               this._pointUp()
           }
       }

       if(
           // torna o valor directionY positivo, fazendo com que a bolinha desça
           (this.y - this.r < 0 && this.directionY < 0) ||
           // torna o valor directionY negativo, fazendo com que a bolinha suba
           (this.y > field.h - this.r && this.directionY > 0)){
           this._reverseY()
       }
       
   },
   _reverseX: function(){
       this.directionX *= -1
   },
   _reverseY: function(){
       this.directionY *= -1
   },
   _move: function(){
       this.x += this.directionX * this.speed
       this.y += this.directionY * this.speed
   },
   _speedUp: function(){
       this.speed += 2
   },
   _pointUp: function(){
       this._speedUp()
       this.x = field.w /2
       this.y = field.h /2

   },
   draw: function(){
       // desenha a bolinha
       canvasCtx.fillStyle = "#fff"
       canvasCtx.beginPath()
       canvasCtx.arc(this.x, this.y, this.r, 0, 2.0 * Math.PI)
       canvasCtx.fill()
       this._calcPosition()
       this._move()
   }
}
// variável para a posição da raquete da esquerda
// apagar depois de criar todos os objetos
var posRaqueteEsquerda = window.innerHeight / 2 - 100

function setup() {
   canvasEl.width = canvasCtx.width = field.w
   canvasEl.height = canvasCtx.height = field.h
}

function draw() {
   // desenha o objeto campo
   field.draw()
   line.draw()
   leftPaddle.draw()
   rightPaddle.draw()
   score.draw()
   ball.draw()
}

window.animateFrame = (function () {
   return (
   window.requestAnimationFrame ||
   window.webkitRequestAnimationFrame ||
   window.mozRequestAnimationFrame ||
   window.oRequestAnimationFrame ||
   window.msRequestAnimationFrame ||
   function (callback) {
       return window.setTimeout(callback, 1000 / 60)
   }
   )
})()

function main() {
   animateFrame(main)
   draw()
}

setup()
main()
canvasEl.addEventListener("mousemove", function (e) {
   mouse.x = e.pageX
   mouse.y = e.pageY
})