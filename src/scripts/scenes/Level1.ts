import { createBomb, createHelper, createCanvas, createPlayer, createPowerUp } from '../functions/objectCreator'

import { verticalMoverMovement, horizontalMoverMovement, createKeys } from '../functions/movement'

export default class Level1 extends Phaser.Scene {
  constructor() {
    super('Level1')
  }

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
  liveText

  bonusNumber = 0
  bonusText

  bonusRequired = 2

  speedUp = 0

  physicsWidth
  physicsHeight

  gameWidth
  gameHeight

  messages = []

  movers

  //Movement Keys
  w
  a
  s
  d

  preload() {
    this.load.image('horizontal', 'assets/v-police.png')
    this.load.image('powerup', 'assets/enemy-explosion-1.png')
    this.load.image('bomb2', 'assets/drone-1.png')
    this.load.image('vertical', 'assets/v-red.png')
    this.load.image('sky', 'assets/sky.png')
    this.load.image('star', 'assets/star.png')
    this.load.image('bomb', 'assets/bomb.png')
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 })
  }

  create() {
    createCanvas(this, 'sky')
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
      400,
      400,
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
      -400,
      -500,
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
      400,
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
      400,
      0.6
    )
    this.helperGroup = this.physics.add.group({
      defaultKey: 'vertical'
    })
    this.helper = createHelper(this.helperGroup, this.helper, this, 'bomb', 'რაღაც კარგი მოხდა!', 400, 200, 300, 300, 2)
    this.speedPowerUp = createPowerUp(this, 'inv')
  }

  update() {
    if (this.player.getBounds().contains(this.input.x, this.input.y)) {
      this.player.setVelocity(0, 0)
    } else {
      this.physics.moveTo(this.player, this.input.x, this.input.y, 430 + this.speedUp)
    }

    verticalMoverMovement(this.vertical_mover, this, this.vertical_mover.displayHeight)
    horizontalMoverMovement(this.horizontal_mover, this, this.horizontal_mover.displayWidth)

    if (this.bonusNumber == this.bonusRequired) {
      this.scene.start('Win1', { messages: this.messages })
    } else if (this.lives == 0) {
      this.scene.start('Lose1', { messages: this.messages })
    }
  }
}
