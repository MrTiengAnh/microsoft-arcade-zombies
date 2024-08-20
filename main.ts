namespace SpriteKind {
    export const Boss = SpriteKind.create()
}
function CreateGameLevel () {
    tiles.setTilemap(tilemap`level1`)
    health = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . 1 1 1 1 1 1 1 1 . . . . 
        . . . . 1 1 1 2 2 1 1 1 . . . . 
        . . . . 1 1 1 2 2 1 1 1 . . . . 
        . . . . 1 2 2 2 2 2 2 1 . . . . 
        . . . . 1 2 2 2 2 2 2 1 . . . . 
        . . . . 1 1 1 2 2 1 1 1 . . . . 
        . . . . 1 1 1 2 2 1 1 1 . . . . 
        . . . . 1 1 1 1 1 1 1 1 . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Food)
    health.setPosition(250, 58)
}
sprites.onOverlap(SpriteKind.Boss, SpriteKind.Player, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.right.isPressed()) {
        shootingdirectionX = 1
    }
    if (controller.left.isPressed()) {
        shootingdirectionX = -1
    }
    if (controller.down.isPressed()) {
        shootingdirectionY = 1
    }
    if (controller.up.isPressed()) {
        shootingdirectionY = -1
    }
    if (shootingdirectionX != 0 || shootingdirectionY != 0) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 7 7 7 . . . . . . . 
            . . . . . 7 7 7 7 7 . . . . . . 
            . . . . . 7 7 7 7 7 . . . . . . 
            . . . . . . 7 7 7 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, shootingdirectionX * 200, shootingdirectionY * 200)
        music.pewPew.play()
        shootingdirectionX = 0
        shootingdirectionY = 0
    }
})
function SpawnPlayer () {
    mySprite = sprites.create(img`
        ........................
        .....ffff...............
        ...fff22fff.............
        ..fff2222fff............
        .fffeeeeeefff...........
        .ffe222222eef...........
        .fe2ffffff2ef...........
        .ffffeeeeffff...........
        ffefbf44fbfeff..........
        fee41fddf14eef..........
        .ffffdddddeef...........
        fddddf444eef............
        fbbbbf2222f4e...........
        fbbbbf2222fd4...........
        .fccf45544f44...........
        ..ffffffff..............
        ....ff..ff..............
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        `, SpriteKind.Player)
    controller.moveSprite(mySprite)
    scene.cameraFollowSprite(mySprite)
    info.setScore(0)
    info.setLife(100)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Boss, function (sprite, otherSprite) {
    BossHP += -1
    sprite.destroy()
    if (BossHP == 0) {
        Boss.destroy()
        game.splash("YOU WIN")
        game.over(true)
    }
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    music.bigCrash.play()
    info.changeScoreBy(10)
    if (info.score() == 160) {
        Spawn_Boss()
    }
})
scene.onHitWall(SpriteKind.Boss, function (sprite, location) {
    tiles.setWallAt(location, false)
    tiles.setTileAt(location, sprites.dungeon.darkGroundCenter)
})
function spawnzombies () {
    listofzombies = [
    sprites.create(img`
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        .........88888..........
        .........86868..........
        .........86668..........
        .........8888...........
        ..........868...........
        .........66666..........
        .........6.686..........
        .........6.686..........
        .........6.686..........
        ...........686..........
        ...........68...........
        ..........668...........
        ..........6.66..........
        .........66..6..........
        .........6...6..........
        .........6...6..........
        .........6...6..........
        .............6..........
        `, SpriteKind.Enemy),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 7 7 7 7 . . . . . . 
        . . . . . 7 7 7 7 7 7 . . . . . 
        . . . . . 7 e e e e 7 . . . . . 
        . . . . . 7 7 7 7 7 7 . . . . . 
        . . . . . . . f 7 . . . . . . . 
        . . . . . . . f 7 . . . . . . . 
        . . . . . . 7 f 7 . . . . . . . 
        . . . . . . 7 f f f . . . . . . 
        . . . . . . f f 7 7 . . . . . . 
        . . . . . . f 7 7 7 . . . . . . 
        . . . . . . f . . 7 . . . . . . 
        . . . . . . f . . 7 . . . . . . 
        `, SpriteKind.Enemy),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 4 6 6 f . . . . . . 
        . . . . . 4 6 6 f 6 f . . . . . 
        . . . . . 4 6 6 f 6 6 . . . . . 
        . . . . . 6 6 6 6 6 6 . . . . . 
        . . . . . . . 6 4 . . . . . . . 
        . . . . . . . 6 4 . . . . . . . 
        . . . . . . 4 6 4 . . . . . . . 
        . . . . . . 4 6 f 6 . . . . . . 
        . . . . . . f 6 6 6 . . . . . . 
        . . . . . . f 4 6 6 . . . . . . 
        . . . . . . f . . 6 . . . . . . 
        . . . . . . f . . 6 . . . . . . 
        `, SpriteKind.Enemy),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 4 2 2 2 . . . . . . 
        . . . . . 4 8 8 8 2 2 . . . . . 
        . . . . . 8 8 8 8 2 2 . . . . . 
        . . . . . 8 8 8 2 2 2 . . . . . 
        . . . . . . . f 2 . . . . . . . 
        . . . . . . . f 2 . . . . . . . 
        . . . . . . 4 8 2 . . . . . . . 
        . . . . . . 8 8 2 f . . . . . . 
        . . . . . . 8 8 2 2 . . . . . . 
        . . . . . . f 4 4 2 . . . . . . 
        . . . . . . f . . 2 . . . . . . 
        . . . . . . f . . 2 . . . . . . 
        `, SpriteKind.Enemy),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 4 4 4 f . . . . . . 
        . . . . . 4 4 f f b f . . . . . 
        . . . . . 4 f f b b b . . . . . 
        . . . . . b b b b b b . . . . . 
        . . . . . . . b 4 . . . . . . . 
        . . . . . . . b 4 . . . . . . . 
        . . . . . . 4 b 4 . . . . . . . 
        . . . . . . 4 b f f . . . . . . 
        . . . . . . b b b b . . . . . . 
        . . . . . . b b b b . . . . . . 
        . . . . . . b . . b . . . . . . 
        . . . . . . f . . b . . . . . . 
        `, SpriteKind.Enemy),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 4 c c f . . . . . . 
        . . . . . 4 4 c c c c . . . . . 
        . . . . . 4 f f f c c . . . . . 
        . . . . . c c c c c 4 . . . . . 
        . . . . . . . f c . . . . . . . 
        . . . . . . . f c . . . . . . . 
        . . . . . . c f c . . . . . . . 
        . . . . . . c f c f . . . . . . 
        . . . . . . c c c c . . . . . . 
        . . . . . . f c c c . . . . . . 
        . . . . . . f . . c . . . . . . 
        . . . . . . f . . c . . . . . . 
        `, SpriteKind.Enemy),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 4 4 4 f . . . . . . 
        . . . . . 4 4 f f 4 f . . . . . 
        . . . . . 4 f f f f 4 . . . . . 
        . . . . . 4 4 4 4 4 4 . . . . . 
        . . . . . . . f 4 . . . . . . . 
        . . . . . . . f 4 . . . . . . . 
        . . . . . . 4 f 4 . . . . . . . 
        . . . . . . 4 f f f . . . . . . 
        . . . . . . f f 4 4 . . . . . . 
        . . . . . . f 4 4 4 . . . . . . 
        . . . . . . f . . 4 . . . . . . 
        . . . . . . f . . 4 . . . . . . 
        `, SpriteKind.Enemy),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 4 4 4 f . . . . . . 
        . . . . . 4 4 f f 4 f . . . . . 
        . . . . . 4 f f f f 4 . . . . . 
        . . . . . 4 4 4 4 4 4 . . . . . 
        . . . . . . . f 4 . . . . . . . 
        . . . . . . . f 4 . . . . . . . 
        . . . . . . 4 f 4 . . . . . . . 
        . . . . . . 4 f f f . . . . . . 
        . . . . . . f f 4 4 . . . . . . 
        . . . . . . f 4 4 4 . . . . . . 
        . . . . . . f . . 4 . . . . . . 
        . . . . . . f . . 4 . . . . . . 
        `, SpriteKind.Enemy),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 4 a a f . . . . . . 
        . . . . . 4 4 f a a a . . . . . 
        . . . . . 4 f f a a a . . . . . 
        . . . . . 4 4 4 a a a . . . . . 
        . . . . . . . f a . . . . . . . 
        . . . . . . . f a . . . . . . . 
        . . . . . . a f a . . . . . . . 
        . . . . . . a a a f . . . . . . 
        . . . . . . f f a a . . . . . . 
        . . . . . . f 4 a a . . . . . . 
        . . . . . . f . . a . . . . . . 
        . . . . . . f . . a . . . . . . 
        `, SpriteKind.Enemy),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 4 4 4 f . . . . . . 
        . . . . . 4 4 e e 4 f . . . . . 
        . . . . . 4 e e e e 4 . . . . . 
        . . . . . 4 4 e e 4 4 . . . . . 
        . . . . . . . e e . . . . . . . 
        . . . . . . . e e . . . . . . . 
        . . . . . . 4 f e e . . . . . . 
        . . . . . . 4 f e e . . . . . . 
        . . . . . . f f 4 e . . . . . . 
        . . . . . . f 4 4 e . . . . . . 
        . . . . . . f . . e . . . . . . 
        . . . . . . f . . e . . . . . . 
        `, SpriteKind.Enemy),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . e e e e . . . . . . . 
        . . . . e e e e e e . . . . . . 
        . . . e e e e e e e e . . . . . 
        . . . . e e e e e e . . . . . . 
        . . . . . f . . f . . . . . . . 
        . . . . . f . . f . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . 2 2 2 2 2 7 2 2 2 2 2 2 . . 
        . 2 2 2 2 2 7 7 7 2 2 2 2 2 2 . 
        . . . . . 7 7 7 7 7 . . . . . . 
        . . . . . 7 7 7 7 7 . . . . . . 
        . . . . . 7 7 7 7 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 4 4 4 . . . . . . . 
        . . . . 4 4 4 4 4 4 4 . . . . . 
        . . . . 4 2 4 4 4 2 4 . . . . . 
        . . . . 4 4 4 4 4 4 4 . . . . . 
        . . . . . 4 4 4 4 . . . . . . . 
        . . . . . . 4 . 4 . . . . . . . 
        . . . . . 4 4 4 4 . . . . . . . 
        . . . . . 4 4 4 4 4 . . . . . . 
        . . . . . 4 4 4 4 4 . . . . . . 
        . . . . . . . . . 4 . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 3 3 . . . . . . . . . 
        . . . 3 3 3 3 3 3 . . . . . . . 
        . . 3 3 3 3 3 3 3 3 . . . . . . 
        . . 3 3 3 3 3 3 3 3 . . . . . . 
        . . 3 3 3 3 3 3 3 . . . . . . . 
        . . . 3 3 3 3 3 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 6 6 6 . . . . . . . 
        . . . . . 6 6 6 6 6 . . . . . . 
        . . . . 6 6 6 6 6 6 6 . . . . . 
        . . . . 6 6 6 6 6 6 6 6 . . . . 
        . . . 6 6 6 6 6 6 6 6 6 . . . . 
        . . . 6 6 6 6 6 6 6 6 6 . . . . 
        . . . 6 6 6 6 6 6 6 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 8 8 . . . . . . . 
        . . . . . . 8 8 8 8 . . . . . . 
        . . . . . . 8 8 8 8 8 . . . . . 
        . . . . . 8 8 8 8 8 8 . . . . . 
        . . . . 8 8 8 8 8 8 . . . . . . 
        . . . . 8 8 8 8 8 8 . . . . . . 
        . . . . . 8 8 8 8 . . . . . . . 
        . . . . . . 8 8 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    ]
    for (let value of listofzombies) {
        value.setPosition(randint(0, 300), randint(0, 300))
        value.follow(mySprite, randint(10, 60))
    }
}
info.onLifeZero(function () {
    mySprite.destroy()
    music.wawawawaa.play()
    game.over(false)
    game.reset()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    music.powerUp.play()
    health.destroy()
    info.changeLifeBy(50)
})
function Spawn_Boss () {
    Boss = sprites.create(img`
        ........................
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .....fffc1111111f.......
        ...fc111cd1111111f......
        ...f1b1b1b1111dddf......
        ...fbfbffcf11fcddf......
        ......fcf111111bbf......
        .......ccbdb1b1fcf......
        .......fffbfbfdff.......
        ........ffffffff........
        ........fffffffffff.....
        .........fffffc111cf....
        .........fffff1b1b1f....
        ..........ffffbfbfbf....
        ...........ffff.........
        ........................
        ........................
        ........................
        `, SpriteKind.Boss)
    Boss.setPosition(31, 20)
    BossHP = 10
    Boss.follow(mySprite, 70)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    music.knock.play()
    info.changeLifeBy(-1)
})
let listofzombies: Sprite[] = []
let Boss: Sprite = null
let BossHP = 0
let mySprite: Sprite = null
let projectile: Sprite = null
let shootingdirectionY = 0
let shootingdirectionX = 0
let health: Sprite = null
SpawnPlayer()
CreateGameLevel()
spawnzombies()
