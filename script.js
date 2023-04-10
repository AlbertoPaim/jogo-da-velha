let a1 = document.getElementById('aperta')
let a2 = document.getElementById('win')
let a3 = document.getElementById('empate')
let a4 = document.getElementById('reset')




let name1 = prompt('Qual seu nome jogador X?')
let name2 = prompt('Qual seu nome jogador O?')
let n1 = name1.substring(0, 15)
let n2 = name2.substring(0, 15)



document.getElementById('name1').innerHTML = n1
document.getElementById('name2').innerHTML = n2
//Dados iniciais 
let board = {
    a1:'', a2: '', a3: '',
    b1:'', b2: '', b3: '',
    c1:'', c2: '', c3: ''
}

let playerTurn = ''
let warning = ''
let working = true

let p1 = 0
let p2 = 0
let x = document.getElementById('p1')
let o = document.getElementById('p2')

// Eventos 

document.querySelector('.reset').addEventListener('click', reset)
document.querySelectorAll('.item').forEach(item=>{
    item.addEventListener('click', itemClick)
})
// Funções 

// Função para percorrer em cada item 
function itemClick(e) {
    a1.play() 
    let item = e.target.getAttribute('data-item')
    
    if (working && board[item]==='') {
        board[item] = playerTurn
        renderBoard()
        togglePlayer()
    }
}

function removeClass() {
    document.querySelectorAll(".item").forEach(item => {
        item.classList.remove('color1')
        item.classList.remove('color2')
    });


}
reset()
function reset() {
    removeClass()
    working = true
    warning = ''
    let random = Math.floor(Math.random()*2)
    
    playerTurn = (random === 0) ? 'x' : 'o';

    for(let i in board) {
       board[i] = ''
    }

    if (playerTurn === '0') {
        document.querySelector('.vez').style.color = '#c61cbf'
    } else {
        document.querySelector('.vez').style.color = '##e5d710'
    }
   
    renderBoard();
    renderInfo();
 a4.play() 
 
}


function renderBoard(){

    for(let i in board){
        let item = document.querySelector(`div[data-item='${i}']`)
        item.innerHTML = board[i]

         if (board[i] == 'x') {
        item.classList.add('color1')
    } else if (board[i] == 'o') {
        item.classList.add('color2')
    }

    }

   
    checkGame( )

}

function renderInfo(){

    document.querySelector('.vez').innerHTML = playerTurn
    document.querySelector('.vez').style.color = playerTurn === 'x' ? '#c61cbf' : '#e5d710';
    document.querySelector('.resultado').innerHTML = warning
    
}


function togglePlayer() {
playerTurn = (playerTurn === 'x') ? 'o' : 'x'

    
renderInfo()
}


function checkGame() {

   let showReset = document.querySelector('.reset')
    if (checkWinner('x')) {
        a2.play()
        warning = `${n1} venceu`;
        working = false
        showReset.style.opacity = '1'
        p1++
        x.innerHTML = `${n1} 'X': <span>${p1}</span>`
        document.querySelector('.resultado').style.color = '#c61cbf'
        
    } else if (checkWinner('o')){
        a2.play() 
       
        warning = `${n2} venceu`;
        working = false
        showReset.style.opacity = '1'
        p2++
        o.innerHTML = `${n2} 'O'sa: <span>${p2}</span>`
        document.querySelector('.resultado').style.color = '#e5d710'
        
    } else if (isFull()){
        a3.play() 
       
        warning = 'Deu empate';
        working = false
        showReset.style.opacity = '1'
    } 

}


function checkWinner(playerTurn) {
     let pattern = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
         
     ]


     for (let item in pattern){
        let winnerPattern = pattern[item].split(',')
       let hasWon = winnerPattern.every(option => board[option] === playerTurn)

       if (hasWon ) {
        return true
     }
    
}
 return false

}

function isFull() {
    
for (let i in board){
    if (board[i] === '') {
      return false  
    }
}
return true
}