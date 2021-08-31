export default class Level1 extends Phaser.Scene {
  constructor() {
    super('Level1')
  }

  player
  cursors
  bomb
  bomb2
  horizontal_mover
  vertical_mover
  helper
  lives = 3
  liveText
  speedUp = 0
  screenWidth
  screenHeight

  //Movement Keys
  w
  a
  s
  d

  textContainer

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
    this.screenWidth = this.sys.game.canvas.width
    this.screenHeight = this.sys.game.canvas.height
    this.add.image(400, 300, 'sky')

    this.textContainer = document.getElementById('text')
    this.liveText = this.add.text(16, 16, `lives: ${this.lives}`, { fontSize: '32px', color: '#000' })

    this.createKeys()

    // player
    this.player = this.physics.add.sprite(400, 550, 'dude')
    this.player.setBounce(1.3)

    //vertical mover
    this.vertical_mover = this.createEntity(
      this.horizontal_mover,
      100,
      100,
      'vertical',
      () => {
        this.hitObstacle('ვერტიკალურს დაეტაკე!')
      },
      0,
      -200,
      0.5
    )

    //Horizontal Mover
    this.horizontal_mover = this.createEntity(
      this.horizontal_mover,
      100,
      100,
      'horizontal',
      () => {
        this.hitObstacle('ჰორიზონტალურს დაეტაკე!')
      },
      200,
      0,
      0.5
    )

    //bomb
    this.bomb = this.createEntity(
      this.bomb,
      Math.random() * 500,
      Math.random() * 40,
      'bomb',
      () => {
        this.hitObstacle('რაღაც ცუდი მოხდა!')
      },
      400,
      Math.random() * 180,
      2
    )

    //bomb2
    this.bomb2 = this.createEntity(
      this.bomb2,
      Math.random() * 300 + 500,
      Math.random() * 40,
      'bomb2',
      () => {
        this.hitObstacle('რაღაც კიდევ უფრო ცუდი მოხდა!')
      },
      -300,
      Math.random() * 180
    )

    //helper
    this.helper = this.createEntity(
      this.helper,
      400,
      100,
      'bomb',
      () => {
        this.hitHelper('რაღაც კარგი მოხდა!')
      },
      400,
      80,
      2
    )
    this.helper.setTint(0x60ac23)
  }

  update() {
    //Vertical Mover
    if (this.vertical_mover.y < -40) {
      this.vertical_mover.setX(this.vertical_mover.x + 50)
      this.vertical_mover.setVelocity(0, 200)
    } else if (this.vertical_mover.y > this.screenHeight + 40) {
      this.vertical_mover.setX(this.vertical_mover.x + 50)
      this.vertical_mover.setVelocity(0, -200)
    }

    //Horizontal Mover

    if (this.horizontal_mover.x > this.screenWidth + 40) {
      this.horizontal_mover.setY(this.horizontal_mover.y + 20)
      this.horizontal_mover.setVelocity(-200, 0)
    } else if (this.horizontal_mover.x < -40) {
      this.horizontal_mover.setY(this.horizontal_mover.y + 20)
      this.horizontal_mover.setVelocity(200, 0)
    }

    this.playerMove()
  }

  createKeys() {
    this.w = this.input.keyboard.addKey('W')
    this.s = this.input.keyboard.addKey('S')
    this.a = this.input.keyboard.addKey('A')
    this.d = this.input.keyboard.addKey('D')
  }

  createEntity(variable, x, y, imageName, func, xVel, yVel, scale = 1) {
    variable = this.physics.add.sprite(x, y, imageName).setScale(scale)
    this.physics.add.collider(this.player, variable, func, null, this)
    variable.setBounce(1)
    variable.setCollideWorldBounds(true)
    variable.setVelocity(xVel, yVel)
    return variable
  }

  hitObstacle(text) {
    const para = document.createElement('p')
    const node = document.createTextNode(text)
    para.appendChild(node)
    para.style.color = 'red'
    this.textContainer.appendChild(para)

    this.lives -= 1
    this.liveText.setText(`lives: ${this.lives}`)

    this.player.setTint(0xff0000)
  }

  hitHelper(text) {
    this.player.setTint(0x60ac23)

    const para = document.createElement('p')
    const node = document.createTextNode(text)
    para.appendChild(node)
    para.style.color = 'green'
    this.textContainer.appendChild(para)
    this.speedUp = 200
    window.setTimeout(() => {
      this.speedUp = 0
    }, 3000)
  }

  playerMove() {
    this.w.on('down', e => {
      this.player.setVelocityY(-200 - this.speedUp)
    })

    this.w.on('up', e => {
      this.player.setVelocityY(0)
    })

    this.s.on('down', e => {
      this.player.setVelocityY(200 + this.speedUp)
    })

    this.s.on('up', e => {
      this.player.setVelocityY(0)
    })

    this.a.on('down', e => {
      this.player.setVelocityX(-200 - this.speedUp)
    })

    this.a.on('up', e => {
      this.player.setVelocityX(0)
    })

    this.d.on('down', e => {
      this.player.setVelocityX(200 + this.speedUp)
    })

    this.d.on('up', e => {
      this.player.setVelocityX(0)
    })
  }
}
