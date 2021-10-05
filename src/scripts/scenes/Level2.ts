import {
  increaseVelocity,
  createBomb,
  createHelper,
  createCanvas,
  createPlayer,
  createPowerUp
} from '../functions/objectCreator'

import { verticalMoverMovement, horizontalMoverMovement, createKeys, playerMove } from '../functions/movement'

export default class Level1 extends Phaser.Scene {
  constructor() {
    super('houseLevel')
  }

  level = 'house'

  // player avatar
  player

  //enemies
  bomb
  bombGroup

  bomb2
  bomb2Group

  horizontal_mover
  horizontal_moverGroup

  vertical_mover
  vertical_moverGroup

  //bonuses
  helperGroup
  helper

  //Power Ups

  speedPowerUp
  livePowerUp
  shieldPowerUp

  shieldActive = false

  //live n
  lives = 3
  liveGroup

  bonusNumber = 0
  bonusText
  bonusGroup

  bonusRequired = 3

  speedUp = 0

  physicsWidth
  physicsHeight

  gameWidth
  gameHeight

  messages = []

  movers

  loadImage

  background
  yScroll = 0

  space
  pauseState = 'running'

  //Movement Keys
  w
  a
  s
  d

  up
  down
  left
  right

  worldSpeedUp

  preload() {
    this.load.image('bonusCircle', 'assets/bonusCircle.png')
    this.load.image('lose1BG', 'assets/lose1BG.png')
    this.load.image('win1BG', 'assets/win1BG.png')
    this.load.image('winHome', 'assets/winHome.png')
    this.load.image('loseHome', 'assets/loseHome.png')
    this.load.image('portal', 'assets/portal.png')
    this.load.image('speedUP', 'assets/speedUP.png')
    this.load.image('liveUP', 'assets/liveUP.png')
    this.load.image('shieldUP', 'assets/shieldUP.png')
    this.load.image('liveIcon', 'assets/liveIcon.png')
    this.load.image('splashBomb', 'assets/splash.png')
    this.load.image('splashBonus', 'assets/bonusSplash.png')
    this.load.image('commentBG', 'assets/commentBG.png')
    this.load.image('homeBack', 'assets/homeBG.png')
    this.load.image('bonus1', 'assets/bonus2.png')
    this.load.image('verticalBomb', 'assets/verticalBomb.png')
    this.load.image('horizontalBomb', 'assets/horizontalBomb.png')
    this.load.image('bomb2', 'assets/bomb2.png')
    this.load.image('bomb', 'assets/bomb.png')
    this.load.image('bonusCount', 'assets/randomBonus.png')
    this.load.spritesheet('dudeSheet', 'assets/dudeSheet.png', {
      frameWidth: 50,
      frameHeight: 71
    })

    let backRect
    let loadRect

    this.load.on('start', val => {
      this.loadImage = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'loading')
      backRect = this.add.rectangle(
        this.sys.game.canvas.width / 2,
        this.sys.game.canvas.height / 2 + 250,
        200,
        50,
        0xff78ab,
        1
      )
      loadRect = this.add.rectangle(
        this.sys.game.canvas.width / 2,
        this.sys.game.canvas.height / 2 + 250,
        1,
        40,
        0xffffff,
        1
      )
    })

    this.load.on('progress', val => {
      loadRect.displayWidth = val * 200
    })

    this.load.on('complete', () => {
      this.loadImage.destroy()
    })
  }

  create() {
    this.lives = 3
    this.bonusNumber = 0
    this.messages = []

    this.background = createCanvas(this, 'homeBack')
    this.add.image(1425, 450, 'commentBG')
    createKeys(this)

    // player
    this.player = createPlayer(this)
    // bomb
    this.bombGroup = this.physics.add.group({
      defaultKey: 'bomb'
    })

    this.bomb = createBomb(this.bombGroup, this.bomb, this, 'bomb', Math.random() * 500, Math.random() * 400, 300, 300)
    this.bomb2Group = this.physics.add.group({
      defaultKey: 'bomb2'
    })
    this.bomb2 = createBomb(
      this.bomb2Group,
      this.bomb2,
      this,
      'bomb2',
      Math.random() * 500 + 200,
      Math.random() * 200,
      -300,
      -400
    )

    this.horizontal_moverGroup = this.physics.add.group({
      defaultKey: 'horizontalBomb'
    })
    this.horizontal_mover = createBomb(
      this.horizontal_moverGroup,
      this.horizontal_mover,
      this,
      'horizontalBomb',
      50,
      50,
      320,
      0
    )

    this.vertical_moverGroup = this.physics.add.group({
      defaultKey: 'verticalBomb'
    })
    this.vertical_mover = createBomb(
      this.vertical_moverGroup,
      this.vertical_mover,
      this,
      'verticalBomb',
      70,
      500,
      0,
      300
    )
    this.helperGroup = this.physics.add.group({
      defaultKey: 'bonus1'
    })
    this.helper = createHelper(this.helperGroup, this.helper, this, 'bonus1', Math.random() * 600, 200, 300, 300)
    let types = ['speed', 'lives', 'shield']
    let randomPowerUp = Math.floor(Math.random() * 3)
    this.speedPowerUp = createPowerUp(this, types[randomPowerUp])

    this.space = this.input.keyboard.addKey('SPACE')

    this.space.on('down', () => {
      if (this.pauseState == 'running') {
        this.physics.pause()
        this.pauseState = 'paused'
      } else {
        this.physics.resume()
        this.pauseState = 'running'
      }
    })
    // როცა ნიტა პაუზის დიზაინს მოგცემს, ახალი სცენა გააკეთე პაუზისთვის და პაუზის გამოჩენისას
    // ამ სცენას დააპაუზებ, გადახვალ პაუზის სცენაში და მერე რიზიუმ თუ მოგინდება
    // პაუზის სცენიდან გააგრძელებ ამ სცენას

    let acc = this.time.addEvent({
      delay: 7000,
      callback: () => {
        increaseVelocity(this.bomb2)
        increaseVelocity(this.bomb)
        increaseVelocity(this.helper)
        increaseVelocity(this.horizontal_mover)
      },
      callbackScope: this,
      loop: true
    })
  }

  update() {
    playerMove(this)

    verticalMoverMovement(this.vertical_mover, this, this.vertical_mover.displayHeight)
    horizontalMoverMovement(this.horizontal_mover, this, this.horizontal_mover.displayWidth)

    if (this.bonusNumber == this.bonusRequired) {
      this.worldSpeedUp = 0
      this.shieldActive = false
      this.pauseState = 'running'
      this.scene.start('Win1', { messages: this.messages, level: this.level })
    } else if (this.lives == 0) {
      this.worldSpeedUp = 0
      this.shieldActive = false
      this.pauseState = 'running'
      this.scene.start('Lose1', { messages: this.messages, level: this.level })
    }

    this.yScroll += 2

    this.background.setTilePosition(0, this.yScroll)
  }
}
