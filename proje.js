/*Kod içinde kullanılan fonksiyonlar*/
let currFlowerTile;
let currSnakeTile;
let score = 0;
let gameOver = false;
let gamePaused = false;

window.onload = function(){
    setGame();
}

/*Oyunu başlatan fonksiyon*/
function setGame(){
    for(let i = 0; i<16 ; i++){
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }

    /*Yılan ve çiçek figürünün ekranda gözükme süresini ayarlayan kodlar */
    setInterval(setFlower, 1000);
    setInterval(setSnake, 1000);
}

/*Oyunun 'boşluk' tuşu kullanılarak durdurulmasını sağlayan kodlar */
document.addEventListener("keydown", function(event) {
    if (event.code === 'Space') {
        if (gameOver) {
            return;
        }
        gamePaused = !gamePaused; 
        if (gamePaused) {
            document.getElementById("status").innerText = "Paused";
        } else {
            document.getElementById("status").innerText = "";
        }
    }
});

/*'R' tuşu kullanılarak sayfanın/oyunun yenilenmesi sağlayan kodlar */
document.addEventListener("keydown", function(event) {
    if (event.code === 'KeyR') {
        location.reload(); 
    }
});


function getRandomTile(){
    let num = Math.floor(Math.random()*16);
    return num.toString();
}

/*Çiçek figürünün belirli süre içerisinde belirli saksılarda çıkmasını sağlayan kodlar */
/*Çiçek ve yılan figürünün aynı anda aynı saksıda çıkmasını engeller. */
function setFlower(){

    if(gameOver || gamePaused){ 
        return;
    }

    if(currFlowerTile){
        currFlowerTile.innerHTML = "";
    }
    let flower = document.createElement("img");
    flower.src = "./resim1.png";

    let num = getRandomTile();
    if(currSnakeTile && currSnakeTile.id == num){
        return;
    }
    currFlowerTile = document.getElementById(num);
    currFlowerTile.appendChild(flower);
}


/*Yılan figürünün belirli süre içerisinde belirli saksılarda çıkmasını sağlayan kodlar */
/*Çiçek ve yılan figürünün aynı anda aynı saksıda çıkmasını engeller. */
function setSnake(){

    if(gameOver || gamePaused){ // Check for game pause
        return;
    }

    if(currSnakeTile){
        currSnakeTile.innerHTML = "";
    }

    let snake = document.createElement("img");
    snake.src = "./yilan1.png";

    let num = getRandomTile();
    if (currFlowerTile && currFlowerTile.id == num){
        return;
    }
    currSnakeTile = document.getElementById(num);
    currSnakeTile.appendChild(snake);
}

function selectTile(){

    if(gameOver || gamePaused){ 
        return;
    }
    
    /*Her çiçeğe tıklanışında +5 puan ekleyen ve toplam puanı gösteren kod */
    if(this == currFlowerTile){
        score += 5;
        document.getElementById("score").innerText = score.toString();
    }
    /*Yılan üzerine tıklandığı zaman oyunu bitiren ve skoru sıfırlayan kod.*/
    else if(this == currSnakeTile){
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        gameOver = true;
    }

}