input.onButtonPressed(Button.A, function () {
    bird.change(LedSpriteProperty.Y, -1)
})
input.onButtonPressed(Button.B, function () {
    bird.change(LedSpriteProperty.Y, 1)
})
let time = 0
let emptyObstacleY = 0
let zp = 0
let vu6 = 0
let bird: game.LedSprite = null
let index = 0
bird = game.createSprite(0, 2)
let ticks = 0
let obstacles: game.LedSprite[] = []
bird.set(LedSpriteProperty.Blink, 1)
game.setScore(0)
basic.forever(function () {
    vu6 = Math.round(input.rotation(Rotation.Pitch) / 15)
    for (let index = 0; index <= Math.abs(vu6) - 1; index++) {
        if (vu6 > 0) {
            bird.change(LedSpriteProperty.Y, 1)
        } else if (vu6 < 0) {
            bird.change(LedSpriteProperty.Y, -1)
        }
    }
    while (obstacles.length > 0 && obstacles[0].get(LedSpriteProperty.X) == 0) {
        obstacles.removeAt(0).delete()
        zp += 1
    }
    for (let obstacle2 of obstacles) {
        obstacle2.change(LedSpriteProperty.X, -1)
    }
    if (ticks % 3 == 0) {
        emptyObstacleY = randint(0, 4)
        for (let index2 = 0; index2 <= 4; index2++) {
            if (index2 != emptyObstacleY) {
                obstacles.push(game.createSprite(4, index2))
            }
        }
    }
    for (let obstacle3 of obstacles) {
        if (obstacle3.get(LedSpriteProperty.X) == bird.get(LedSpriteProperty.X) && obstacle3.get(LedSpriteProperty.Y) == bird.get(LedSpriteProperty.Y)) {
            game.setScore(zp)
            game.gameOver()
        }
    }
    ticks += 1
    time = 1000 - ticks * 10
    if (time > 0) {
        basic.pause(time)
    } else {
        basic.pause(0)
    }
    bird.set(LedSpriteProperty.Blink, 300 - ticks * 10)
})
