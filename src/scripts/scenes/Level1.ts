import { createBomb, createHelper, createCanvas, createPlayer } from '../functions/objectCreator'

import { verticalMoverMovement, horizontalMoverMovement, createKeys, playerMove } from '../functions/movement'

export default class Level1 extends Phaser.Scene {
  constructor() {
    super('Level1')
  }

  // player avatar
  player

  //enemies
  bomb
  bomb2
  horizontal_mover
  vertical_mover

  //bonuses
  helper

  //live n
  lives = 3
  liveText
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
    this.bomb = createBomb(
      this.bomb,
      this,
      'bomb',
      'ბომბს დაეტაკე!',
      Math.random() * 500,
      Math.random() * 400,
      400,
      400,
      2
    )

    this.bomb2 = createBomb(
      this.bomb2,
      this,
      'bomb2',
      'მეორე ბომბს დაეტაკე!',
      Math.random() * 500 + 200,
      Math.random() * 200,
      -400,
      -500,
      1
    )

    this.horizontal_mover = createBomb(
      this.horizontal_mover,
      this,
      'horizontal',
      'ჰორიზონტალურს დაეტაკე!',
      50,
      50,
      400,
      0,
      0.5
    )

    this.vertical_mover = createBomb(
      this.vertical_mover,
      this,
      'vertical',
      'ვერტიკალურს დაეტაკე!',
      70,
      500,
      0,
      400,
      0.5
    )
    console.log(this.bomb)
    this.helper = createHelper(this.helper, this, 'bomb', 'რაღაც კარგი მოხდა!', 400, 200, 300, 300, 2)
  }

  update() {
    playerMove(this)
    verticalMoverMovement(this.vertical_mover, this, this.vertical_mover.displayHeight)
    horizontalMoverMovement(this.horizontal_mover, this, this.horizontal_mover.displayWidth)
  }
}
