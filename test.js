let car, road, cone, coin, fuel;
let carImage, roadImage, coneImage, coinImage, fuelImage;
let conesGroup, coinsGroup, fuelsGroup;
let score;
let fuelLimit;
let PLAY = 1;
let END = 0;
let gameState = PLAY;

function preload() {
    carImage = loadImage("car.png");
    roadImage = loadImage("road1.png");
    coneImage = loadImage("cone.png");
    coinImage = loadImage("goldcoin.png");
    fuelImage = loadImage("fuel.png");
}

function setup() {
    createCanvas(700, 550);

    road = createSprite(420, 300, 20, 20);
    road.addImage(roadImage);
    road.scale = 1;

    car = createSprite(80, 50, 20, 20);
    car.addImage(carImage);
    car.scale = 0.08;

    conesGroup = createGroup();
    coinsGroup = createGroup();
    fuelsGroup = createGroup();

    score = 0;
    fuelLimit = 110;

}

function draw() {

    if (gameState === PLAY) {
        road.velocityX = -5;
        if (road.x < 270) {
            road.x = road.width / 2;
        }

        if (keyDown(UP_ARROW)) {
            car.y -= 5;
        }
        if (keyDown(DOWN_ARROW)) {
            car.y += 5;
        }
        score += Math.round(frameCount % 50 === 0);
        fuelLimit -= Math.round(frameCount % 10 === 0);
        spawnCones();
        spawnCoins();
        spawnFuels();
        if (car.isTouching(coinsGroup)) {
            score += 5;
            coinsGroup.destroyEach();
        }
        if (car.isTouching(fuelsGroup)) {
            fuelLimit += 100;
            fuelsGroup.destroyEach();
        }
        if (car.isTouching(conesGroup)) {
            gameState = END;
        }
        if (fuelLimit <= 0) {
            gameState = END;
        }
    } else if (gameState === END) {
        road.velocityX = 0;
        conesGroup.setVelocityXEach(0);
        coinsGroup.setVelocityXEach(0);
        fuelsGroup.setVelocityXEach(0);
    }

    drawSprites();

    if (car.isTouching(conesGroup) && gameState === END) {
        fill("black");
        textSize(20);
        text("Game Over", 280, 255);
        text("Car Crashed", 280, 280);
        text("Press 'Ctrl + R' to play again", 240, 305);
    }

    if (fuelLimit <= 0 && gameState === END) {
        fill("black");
        textSize(20);
        text("Game Over", 280, 255);
        text("Fuel is empty", 280, 280);
        text("Press 'Ctrl + R' to play again", 240, 305);
    }

    fill("black");
    textSize(20);
    text("Score : " + score, 560, 50);
    text("Fuel : " + fuelLimit, 560, 80);
}

function spawnCones() {
    if (frameCount % 60 === 0) {
        cone = createSprite(650, 40, 20, 20);
        cone.addImage(coneImage);
        cone.scale = 0.3;
        cone.velocityX = -8;
        cone.y = Math.round(random(40, 530));
        cone.lifetime = 150;
        conesGroup.add(cone);
    }
}

function spawnCoins() {
    if (frameCount % 85 === 0) {
        coin = createSprite(650, 40, 20, 20);
        coin.addImage(coinImage);
        coin.scale = 0.06;
        coin.velocityX = -8;
        coin.y = Math.round(random(80, 530));
        coin.lifetime = 150;
        coinsGroup.add(coin);
    }
}

function spawnFuels() {
    if (frameCount % 1000 === 0) {
        fuel = createSprite(650, 40, 20, 20);
        fuel.addImage(fuelImage);
        fuel.scale = 0.7;
        fuel.velocityX = -8;
        fuel.y = Math.round(random(60, 510));
        fuel.lifetime = 150;
        fuelsGroup.add(fuel);
    }
}