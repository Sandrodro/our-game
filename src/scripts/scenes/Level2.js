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

  hitNumber = 0

  bonusNumber = 0
  bonusText
  bonusGroup

  bonusRequired = 5

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

  liveUP = false

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

  acc

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
    this.load.image('bonusBlue', 'assets/bonus-blue.png')
    this.load.image('bonusTarq', 'assets/bonus-tarq.png')
    this.load.image('splashBonus', 'assets/bonusSplash.png')
    this.load.image('commentBG', 'assets/commentBG.png')
    this.load.image('bonusSky', 'assets/bonus-sky.png')
    this.load.image('homeBack', 'assets/homeBG.png')
    this.load.image('bonus1', 'assets/bonus2.png')
    this.load.image('verticalBomb', 'assets/verticalBomb.png')
    this.load.image('horizontalBomb', 'assets/horizontalBomb.png')
    this.load.image('bomb2', 'assets/bomb2.png')
    this.load.image('bomb', 'assets/bomb.png')
    this.load.image('pause', 'assets/pause.png')
    this.load.image('bonusGreen', 'assets/bonus-green.png')
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
        this.sys.game.canvas.height / 2 + 310,
        200,
        50,
        0xff78ab,
        1
      )
      loadRect = this.add.rectangle(
        this.sys.game.canvas.width / 2,
        this.sys.game.canvas.height / 2 + 310,
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
    this.liveUP = false
    this.hitNumber = 0
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

    let pauseScreen
    let cont
    let menu
    this.space.on('down', () => {
      if (this.pauseState == 'running') {
        this.physics.pause()
        this.pauseState = 'paused'
        pauseScreen = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'pause')
        cont = this.add.rectangle(615, this.sys.game.canvas.height / 2, 293, 90, 0xde3eed, 0).setInteractive({
          useHandCursor: true
        })
        menu = this.add.rectangle(1030, this.sys.game.canvas.height / 2, 293, 90, 0xde3eed, 0).setInteractive({
          useHandCursor: true
        })

        cont.on('pointerdown', () => {
          this.physics.resume()
          this.pauseState = 'running'
          pauseScreen.destroy()
          menu.destroy()
          cont.destroy()
        })

        menu.on('pointerdown', () => {
          this.scene.start('Menu')
          this.pauseState = 'running'
          pauseScreen.destroy()
          menu.destroy()
          cont.destroy()
        })
      } else {
        this.physics.resume()
        this.pauseState = 'running'
        pauseScreen.destroy()
        menu.destroy()
        cont.destroy()
      }
    })
    this.acc = this.time.addEvent({
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
      this.hitNumber = 0
      this.bonusNumber = 0
      this.shieldActive = false
      this.liveUP = false
      this.pauseState = 'running'
      this.bomb.destroy()
      this.bomb2.destroy()
      this.horizontal_mover.destroy()
      this.vertical_mover.destroy()
      this.helper.destroy()
      this.speedPowerUp.destroy()
      this.background.destroy()
      this.player.destroy()
      this.helperGroup.destroy()
      this.vertical_moverGroup.destroy()
      this.horizontal_moverGroup.destroy()
      this.bombGroup.destroy()
      this.bomb2Group.destroy()
      this.acc.destroy()
      this.scene.start('Win1', { messages: this.messages, level: this.level })
    } else if (this.lives == 0) {
      this.worldSpeedUp = 0
      this.hitNumber = 0
      this.bonusNumber = 0
      this.shieldActive = false
      this.liveUP = false
      this.pauseState = 'running'
      this.bomb.destroy()
      this.bomb2.destroy()
      this.horizontal_mover.destroy()
      this.vertical_mover.destroy()
      this.helper.destroy()
      this.speedPowerUp.destroy()
      this.background.destroy()
      this.player.destroy()
      this.helperGroup.destroy()
      this.vertical_moverGroup.destroy()
      this.horizontal_moverGroup.destroy()
      this.bombGroup.destroy()
      this.bomb2Group.destroy()
      this.acc.destroy()
      this.scene.start('Lose1', { messages: this.messages, level: this.level })
    }

    if (this.pauseState == 'running') {
      this.yScroll += 2
      this.background.setTilePosition(0, this.yScroll)
    }
  }
}
