import {
  createBomb,
  createBomb2,
  createHelper,
  createHorizontal,
  createVertical,
  verticalMoverMovement,
  horizontalMoverMovement,
  createCanvas,
  createPlayer,
  createKeys,
  playerMove
} from '../objectCreators/objectCreator'

export default class Level1 extends Phaser.Scene {
  constructor() {
    super('Level2')
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
    createPlayer(this)

    //bomb
    createBomb(this.bomb, this, 'bomb', 'ბომბს დაეტაკე!')
    //bomb2
    createBomb2(this.bomb2, this, 'bomb2', 'მეორე ბომბს დაეტაკე!')
    //vertical mover
    createVertical(this.vertical_mover, this, 'vertical', 'ვერტიკალურს დაეტაკე!')
    //Horizontal Mover
    createHorizontal(this.horizontal_mover, this, 'horizontal', 'ჰორიზონტალურს დაეტაკე!')
    //helper
    createHelper(this.helper, this, 'bomb', 'რაღაც კარგი მოხდა!')
  }

  update() {
    playerMove(this)
    verticalMoverMovement(this.vertical_mover, this)
    horizontalMoverMovement(this.vertical_mover, this)
  }
}
