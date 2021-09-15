import { createBomb, createHelper, createCanvas, createPlayer, createPowerUp } from '../functions/objectCreator'

import { verticalMoverMovement, horizontalMoverMovement, createKeys, playerMove } from '../functions/movement'

export default class Level1 extends Phaser.Scene {
  constructor() {
    super('jobLevel')
  }

  level = 'job'

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

  //live n
  lives = 3
  liveGroup

  bonusNumber = 0
  bonusText

  bonusRequired = 3

  speedUp = 0

  physicsWidth
  physicsHeight

  gameWidth
  gameHeight

  messages = []

  movers

  background
  yScroll = 0

  //Movement Keys
  w
  a
  s
  d

  loading

  preload() {
    this.load.image('lose1BG', 'assets/lose1BG.png')
    this.load.image('win1BG', 'assets/win1BG.png')
    this.load.image('winJob', 'assets/winJob.png')
    this.load.image('loseJob', 'assets/loseJob.png')
    this.load.image('portal', 'assets/portal.png')
    this.load.image('speedUP', 'assets/speedUP.png')
    this.load.image('liveUP', 'assets/liveUP.png')
    this.load.image('shieldUP', 'assets/shieldUP.png')
    this.load.image('liveIcon', 'assets/liveIcon.png')
    this.load.image('splashBomb', 'assets/splash.png')
    this.load.image('splashBonus', 'assets/bonusSplash.png')
    this.load.image('horizontal', 'assets/v-police.png')
    this.load.image('commentBG', 'assets/commentBG.png')
    this.load.image('bomb2', 'assets/drone-1.png')
    this.load.image('vertical', 'assets/v-red.png')
    this.load.image('jobBack', 'assets/shuttle-2BG.png')
    this.load.image('bomb', 'assets/bomb.png')
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 })

    this.load.on('progress', () => {
      this.loading = this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'LOADING', {
        fontSize: '32px',
        color: '#000'
      })
    })

    this.load.on('complete', () => {
      this.loading.destroy()
    })
  }

  create() {
    this.lives = 3

    this.background = createCanvas(this, 'jobBack')
    this.add.image(950, 300, 'commentBG')
    createKeys(this)

    // player
    this.player = createPlayer(this)
    // bomb
    this.bombGroup = this.physics.add.group({
      defaultKey: 'bomb'
    })

    this.bomb = createBomb(
      this.bombGroup,
      this.bomb,
      this,
      'bomb',
      'ბომბს დაეტაკე!',
      Math.random() * 500,
      Math.random() * 400,
      300,
      300,
      2.5
    )
    this.bomb2Group = this.physics.add.group({
      defaultKey: 'bomb2'
    })
    this.bomb2 = createBomb(
      this.bomb2Group,
      this.bomb2,
      this,
      'bomb2',
      'მეორე ბომბს დაეტაკე!',
      Math.random() * 500 + 200,
      Math.random() * 200,
      -300,
      -400,
      1.1
    )

    this.horizontal_moverGroup = this.physics.add.group({
      defaultKey: 'horizontal'
    })
    this.horizontal_mover = createBomb(
      this.horizontal_moverGroup,
      this.horizontal_mover,
      this,
      'horizontal',
      'ჰორიზონტალურს დაეტაკე!',
      50,
      50,
      300,
      0,
      0.6
    )

    this.vertical_moverGroup = this.physics.add.group({
      defaultKey: 'vertical'
    })
    this.vertical_mover = createBomb(
      this.vertical_moverGroup,
      this.vertical_mover,
      this,
      'vertical',
      'ვერტიკალურს დაეტაკე!',
      70,
      500,
      0,
      300,
      0.6
    )
    this.helperGroup = this.physics.add.group({
      defaultKey: 'vertical'
    })
    this.helper = createHelper(this.helperGroup, this.helper, this, 'bomb', 'რაღაც კარგი მოხდა!', 400, 200, 300, 300, 2)
    let types = ['speed', 'lives', 'shield']
    let randomPowerUp = Math.floor(Math.random() * 3)
    this.speedPowerUp = createPowerUp(this, types[randomPowerUp])
  }

  update() {
    playerMove(this)

    verticalMoverMovement(this.vertical_mover, this, this.vertical_mover.displayHeight)
    horizontalMoverMovement(this.horizontal_mover, this, this.horizontal_mover.displayWidth)

    if (this.bonusNumber == this.bonusRequired) {
      this.scene.start('Win1', { messages: this.messages, level: this.level })
    } else if (this.lives == 0) {
      this.scene.start('Lose1', { messages: this.messages, level: this.level })
    }

    this.yScroll += 2

    this.background.setTilePosition(0, this.yScroll)
  }
}
