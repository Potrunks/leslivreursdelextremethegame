namespace SpriteKind {
    export const Clientpizza = SpriteKind.create()
    export const ProjectilePizza = SpriteKind.create()
    export const ProjectileTiramisu = SpriteKind.create()
    export const ProjectileTiramisuPlayer = SpriteKind.create()
    export const ClientLivre = SpriteKind.create()
    export const EnemyCalzone = SpriteKind.create()
}
namespace StatusBarKind {
    export const PizzaFuel = StatusBarKind.create()
    export const TiramisuFuel = StatusBarKind.create()
}
// Player projectile
controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (statusBarOfPizza.value == 0) {
        music.buzzer.play()
    } else {
        Pizza = sprites.create(assets.image`pizza`, SpriteKind.ProjectilePizza)
        Pizza.setPosition(Livreur.x - xPizza, Livreur.y - yPizza)
        Pizza.setVelocity(0, vyPizza)
        Pizza.setFlag(SpriteFlag.AutoDestroy, true)
        animation.runImageAnimation(
        Pizza,
        assets.animation`pizzaAnim`,
        200,
        true
        )
        statusBarOfPizza.value += -1
    }
})
// Quand joueur percute les Calzone
sprites.onOverlap(SpriteKind.Player, SpriteKind.EnemyCalzone, function (sprite, otherSprite) {
    sprite.setPosition(sprite.x + 20, sprite.y)
    otherSprite.setPosition(otherSprite.x - 20, otherSprite.y)
    animation.runMovementAnimation(
    sprite,
    animation.animationPresets(animation.shake),
    200,
    false
    )
    animation.runMovementAnimation(
    otherSprite,
    animation.animationPresets(animation.shake),
    200,
    false
    )
})
// Quand les Calzone tire sur le Joueur
sprites.onOverlap(SpriteKind.ProjectileTiramisu, SpriteKind.Player, function (sprite, otherSprite) {
    sprite.destroy()
    animation.runMovementAnimation(
    otherSprite,
    animation.animationPresets(animation.shake),
    200,
    false
    )
    info.changeLifeBy(-1)
})
// Quand joueur tire sur les Calzone
sprites.onOverlap(SpriteKind.ProjectileTiramisuPlayer, SpriteKind.EnemyCalzone, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.spray, 200)
    seuilPopCalzone = 5
})
controller.player1.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    if (statusBarOfTiramisu.value == 0) {
        music.buzzer.play()
    } else {
        Tiramisu = sprites.create(assets.image`tiramisu`, SpriteKind.ProjectileTiramisuPlayer)
        Tiramisu.setPosition(Livreur.x - xTiramisu, Livreur.y - yTiramisu)
        Tiramisu.setVelocity(vxTiramisu, 0)
        Tiramisu.setFlag(SpriteFlag.AutoDestroy, true)
        animation.runImageAnimation(
        Tiramisu,
        assets.animation`tiramisuAnim`,
        200,
        true
        )
        statusBarOfTiramisu.value += -1
    }
})
// Livraison de pizza
sprites.onOverlap(SpriteKind.ProjectilePizza, SpriteKind.Clientpizza, function (sprite, otherSprite) {
    otherSprite.setKind(SpriteKind.ClientLivre)
    otherSprite.setImage(assets.image`ClientLivre`)
    sprite.destroy()
    info.changeScoreBy(1)
})
let popCalzone = 0
let Client: Sprite = null
let popClient = 0
let Calzone: Sprite = null
let touchWall = 0
let Tiramisu: Sprite = null
let Pizza: Sprite = null
let statusBarOfTiramisu: StatusBarSprite = null
let statusBarOfPizza: StatusBarSprite = null
let yPizza = 0
let xPizza = 0
let vyPizza = 0
let yTiramisu = 0
let xTiramisu = 0
let vxTiramisu = 0
let seuilPopCalzone = 6
let clientLivre = 0
let Livreur: Sprite = null
vxTiramisu = -50
xTiramisu = 17
yTiramisu = 6
vyPizza = -50
xPizza = 13
yPizza = 19
let vxBg = -75
let seuilPopClient = 6
let yBarrier = 43
let castTiramisu
let seuilCastTiramisu = 6
// Intro
scene.setBackgroundColor(8)
game.splash("Les Livreurs de l'Extrême", "contre le clan Calzone")
// Create a true starting page with the logo of Les Livreurs de l'Extrême
// Create a introductive music
game.splash("Comment jouer?")
game.splash("IKJL", "pour bouger")
game.splash("Bouton Q", "pour livrer la pizza")
game.splash("Bouton E", "pour envoyer du Tiramisu")
game.splash("But: Livrer le plus", "de pizza")
game.splash("sans se faire tuer", "par les Calzone")
game.splash("Appuyez sur Q", "pour commencer")
info.startCountdown(60)
info.setScore(0)
// Background
// Need a music
scene.setBackgroundImage(assets.image`city`)
scroller.scrollBackgroundWithSpeed(vxBg, 0)
// Player
Livreur = sprites.create(assets.image`scooter`, SpriteKind.Player)
Livreur.setPosition(81, 100)
Livreur.setStayInScreen(true)
animation.runImageAnimation(
Livreur,
assets.animation`scooterAnim`,
100,
true
)
controller.player2.moveSprite(Livreur, 50, 50)
statusBarOfPizza = statusbars.create(10, 2, StatusBarKind.PizzaFuel)
statusBarOfPizza.attachToSprite(Livreur)
statusBarOfPizza.setOffsetPadding(-25, -35)
statusBarOfPizza.setColor(5, 2)
statusBarOfPizza.max = 3
statusBarOfTiramisu = statusbars.create(10, 2, StatusBarKind.TiramisuFuel)
statusBarOfTiramisu.attachToSprite(Livreur)
statusBarOfTiramisu.setOffsetPadding(-25, -30)
statusBarOfTiramisu.setColor(14, 2)
statusBarOfTiramisu.max = 3
// Pour empecher le joueur et enemy d'aller au dela de la rambarde
game.onUpdate(function () {
    if (Livreur.y <= yBarrier) {
        Livreur.setPosition(Livreur.x, Livreur.y = yBarrier+10)
        animation.runMovementAnimation(
        Livreur,
        animation.animationPresets(animation.shake),
        200,
        false
        )
        music.smallCrash.play()
        touchWall += 1
    }
    if (Calzone.y <= yBarrier) {
        Calzone.vy = 25
    }
})
// pop client
game.onUpdateInterval(2000, function () {
    popClient = randint(0, 10)
    if (popClient < seuilPopClient) {
        Client = sprites.create(assets.image`Client`, SpriteKind.Clientpizza)
        Client.setPosition(160, 24)
        Client.setVelocity(vxBg, 0)
        Client.setFlag(SpriteFlag.AutoDestroy, true)
    }
})
// Re-Fuel des jauges Pizza et Tiramisu
game.onUpdateInterval(5000, function () {
    statusBarOfPizza.value += 1
    statusBarOfTiramisu.value += 1
})
// Tiramisu lancé par les Calzone
game.onUpdateInterval(1000, function() {
    castTiramisu = randint(0, 10)
    if (castTiramisu < seuilCastTiramisu) {
        if (Calzone.y > Livreur.y - 20 && Calzone.y < Livreur.y + 20 && seuilPopCalzone == 0) {
            Tiramisu = sprites.create(assets.image`tiramisu`, SpriteKind.ProjectileTiramisu)
            Tiramisu.setPosition(Calzone.x + 20, Calzone.y)
            if (Livreur.x < Calzone.x) {
                Tiramisu.setVelocity(-20, 0)
            } else if (Livreur.x > Calzone.x) {
                Tiramisu.setVelocity(20, 0)
            }
            Tiramisu.setFlag(SpriteFlag.AutoDestroy, true)
            animation.runImageAnimation(
                Tiramisu,
                assets.animation`tiramisuAnim`,
                200,
                true
            )
        }
    }
})
// pop Calzone (toutes les 3sec si joueur en face des calzone, tiramisu tiré par les calzone)
game.onUpdateInterval(2000, function () {
    popCalzone = randint(0, 10)
    if (popCalzone < seuilPopCalzone) {
        Calzone = sprites.create(assets.image`calzone`, SpriteKind.EnemyCalzone)
        Calzone.setPosition(0, randint(54, 120))
        animation.runImageAnimation(
        Calzone,
        assets.animation`calzoneAnim`,
        100,
        true
        )
        seuilPopCalzone = 0
        Livreur.sayText("Les Calzone !!!", 1000, false)
    }
    if (Calzone.x > Livreur.x - 25) {
        Calzone.setVelocity(-25, randint(-25, 25))
    } else {
        Calzone.setVelocity(15, randint(-25, 25))
    }
    Calzone.setStayInScreen(true)
})
