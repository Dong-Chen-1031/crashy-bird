input.onButtonPressed(Button.A, function () {
    bird.change(LedSpriteProperty.Y, -1)
})
input.onButtonPressed(Button.B, function () {
    bird.change(LedSpriteProperty.Y, 1)
})
let g03 = 0
let time = 0
let emptyObstacleY = 0
let zp = 0
let vu6 = 0
let bird: game.LedSprite = null
let index = 0
bird = game.createSprite(0, 2)
let ticks = 0
let obstacles: game.LedSprite[] = []
bird.set(LedSpriteProperty.Blink, 500)
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
        if (zp % 4 == 0) {
            music.playTone(659, music.beat(BeatFraction.Quarter))
            music.playTone(988, music.beat(BeatFraction.Quarter))
        }
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
            music.playTone(392, music.beat(BeatFraction.Quarter))
            music.playTone(349, music.beat(BeatFraction.Half))
            music.playTone(330, music.beat(BeatFraction.Whole))
            game.setScore(zp)
            game.gameOver()
        }
    }
    ticks += 1
    time = 1000 - ticks * 12
    if (time > 0) {
        basic.pause(time)
    } else {
        basic.pause(0)
    }
    g03 = 500 - ticks * 10
    if (g03 > 1) {
        bird.set(LedSpriteProperty.Blink, g03)
    } else {
        bird.set(LedSpriteProperty.Blink, 1)
    }
})
