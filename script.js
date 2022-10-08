const character = document.querySelector(".character");
const game = document.querySelector('.main')
let interval;
let both = 0;
let counter = 0;
let gameTimer = 0.4;
const currentBlocks = [];
const score = document.querySelector('.score');

const blocks = setInterval(function(){
    let blockLast = document.getElementById("block"+(counter-1));
    let holeLast = document.getElementById("hole"+(counter-1));
    if(counter>0){
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }
    if(blockLastTop<400||counter==0){
        let block = document.createElement("div");
        let hole = document.createElement("div");

        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        block.setAttribute("id", "block"+counter);
        hole.setAttribute("id", "hole"+counter);

        block.style.top = blockLastTop + 100 + "px";
        hole.style.top = holeLastTop + 100 + "px";

        let random = Math.floor(Math.random() * 360);
        hole.style.left = random + "px";

        game.appendChild(block);
        game.appendChild(hole);

        currentBlocks.push(counter);
        counter++;
    }
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    let drop = 0;
    if(characterTop <= 0){
        alert("Game over. Score: "+(counter-5));
        clearInterval(blocks);
        location.reload();
        gameTimer = 10;
    }
    for(var i = 0; i < currentBlocks.length;i++){
        let current = currentBlocks[i];
        let iblock = document.getElementById("block"+current);
        let ihole = document.getElementById("hole"+current);
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
        iblock.style.top = iblockTop - gameTimer + "px";
        ihole.style.top = iblockTop - gameTimer + "px";
        if(iblockTop < -20){
            currentBlocks.shift();
            iblock.remove();
            ihole.remove();
        }
        if(iblockTop-20<characterTop && iblockTop>characterTop){
            drop++;
            score.innerHTML = "Punkty: " + (counter-5);
            if(iholeLeft<=characterLeft && iholeLeft+20>=characterLeft){
                drop = 0;
            }
        }
    }
    if(drop==0){
        if(characterTop < 480){
            character.style.top = characterTop + (2) + "px";
        }
    }else{
        character.style.top = characterTop - gameTimer + "px";
    }
},1);

function moveLeft()
{
    both++;
    let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left>0) character.style.left = left - 2 + "px";
}

function moveRight(){
    both++;
    let left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left<380) character.style.left = left + 2 + "px";
}

//Sterowanie klawiszami

document.addEventListener("keydown", event => {
    if(both==0){
        if(event.key==="ArrowLeft"){
            interval = setInterval(moveLeft, 1);
        }
        if(event.key==="ArrowRight"){
            interval = setInterval(moveRight, 1);
        }
    }
});

document.addEventListener("keyup", event => {
    clearInterval(interval);
    both=0;
});

//Sterowanie dotykiem

const touchLeft = document.querySelector(".left");
const touchRight = document.querySelector(".right");

if(both==0){
    touchLeft.addEventListener("touchstart", event => {
        interval = setInterval(moveLeft, 1);
    })
    
    touchRight.addEventListener("touchstart", event => {
        interval = setInterval(moveRight, 1);
    })
}

touchLeft.addEventListener("touchend", event => {
    clearInterval(interval);
    both=0;
});

touchRight.addEventListener("touchend", event => {
    clearInterval(interval);
    both=0;
});

//--------------------------

setInterval(() => {
    gameTimer += 0.01;
}, 1000);