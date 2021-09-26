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

  bomb3
  bomb3Group

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

  loading

  preload() {
    this.load.image('bonusCircle', 'assets/bonusCircle.png')
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
    this.load.image('commentBG', 'assets/commentBG.png')
    this.load.image('jobBack', 'assets/jobBG.png')
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

    let progressBar = this.add.graphics()
    let progressBox = this.add.graphics()
    progressBox.fillStyle(0x222222, 0.8)
    progressBox.fillRect(440, 370, 320, 50)

    this.load.on('progress', val => {
      this.loadImage = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'loading')
      this.loading = this.add.text(
        this.sys.game.canvas.width / 2 - 65,
        this.sys.game.canvas.height / 2 + 150,
        'LOADING',
        {
          fontSize: '32px',
          color: '#F0F7FF'
        }
      )
      progressBar.clear()
      progressBar.fillStyle(0xffffff, 1)
      progressBar.fillRect(440, 370, 300 * val, 30)
    })

    this.load.on('complete', () => {
      this.loading.destroy()
      this.loadImage.destroy()
    })
  }

  create() {
    this.messages = []
    this.lives = 3
    this.bonusNumber = 0

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
      Math.random() * 500,
      Math.random() * 400,
      250,
      250,
      0.8
    )

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
      -250,
      -350,
      0.9
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
      300,
      0,
      0.8
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
      260,
      0.8
    )
    this.helperGroup = this.physics.add.group({
      defaultKey: 'bonus1'
    })
    this.helper = createHelper(this.helperGroup, this.helper, this, 'bonus1', Math.random() * 600, 200, 300, 300, 1.1)
    let types = ['speed', 'lives', 'shield']
    let randomPowerUp = Math.floor(Math.random() * 3)
    this.speedPowerUp = createPowerUp(this, types[randomPowerUp])
  }

  update() {
    playerMove(this)

    verticalMoverMovement(this.vertical_mover, this, this.vertical_mover.displayHeight)
    horizontalMoverMovement(this.horizontal_mover, this, this.horizontal_mover.displayWidth)

    if (this.bonusNumber == this.bonusRequired) {
      this.worldSpeedUp = 0
      this.shieldActive = false
      this.scene.start('Win1', { messages: this.messages, level: this.level })
    } else if (this.lives == 0) {
      this.worldSpeedUp = 0
      this.shieldActive = false
      this.scene.start('Lose1', { messages: this.messages, level: this.level })
    }

    this.yScroll += 2

    this.background.setTilePosition(0, this.yScroll)
  }
}
