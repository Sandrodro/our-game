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

  //Movement Keys
  w
  a
  s
  d

  gameOverText

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
    let sky = this.add.image(400, 300, 'sky')
    this.physicsWidth = sky.width
    this.physicsHeight = sky.height
    this.physics.world.setBounds(0, 0, this.physicsWidth, this.physicsHeight)

    this.gameWidth = this.sys.game.canvas.width
    this.gameHeight = this.sys.game.canvas.height

    this.liveText = this.add.text(16, 16, `lives: ${this.lives}`, { fontSize: '32px', color: '#000' })

    this.createKeys()

    // player
    this.player = this.physics.add.sprite(400, 550, 'dude')
    this.player.setBounce(0.2)
    this.player.setCollideWorldBounds(true)

    //bomb
    this.createBomb(this.bomb)
    //bomb2
    this.createBomb2(this.bomb2)
    //vertical mover
    this.createVertical(this.vertical_mover)
    //Horizontal Mover
    this.createHorizontal(this.horizontal_mover)
    //helper
    this.createHelper(this.helper)
  }

  update() {
    this.playerMove()

    //Vertical Mover
    if (this.vertical_mover) {
      if (this.vertical_mover.y < 50) {
        this.vertical_mover.setX(this.vertical_mover.x + (Math.random() > 0.35 ? 30 : -40))
        this.vertical_mover.setVelocity(0, 200)
      } else if (this.vertical_mover.y > this.physicsHeight - 50) {
        this.vertical_mover.setX(this.vertical_mover.x + (Math.random() > 0.35 ? 30 : -40))
        this.vertical_mover.setVelocity(0, -200)
      }
    }

    //Horizontal Mover

    if (this.horizontal_mover) {
      if (this.horizontal_mover.x > this.physicsWidth - 70) {
        this.horizontal_mover.setY(this.horizontal_mover.y + (Math.random() > 0.35 ? 30 : -25))
        this.horizontal_mover.setVelocity(-200, 0)
      } else if (this.horizontal_mover.x < 70) {
        this.horizontal_mover.setY(this.horizontal_mover.y + (Math.random() > 0.35 ? 30 : -25))
        this.horizontal_mover.setVelocity(200, 0)
      }
    }
  }

  createEntity(variable, x, y, imageName, func, xVel, yVel, scale = 1, collide) {
    variable = this.physics.add.sprite(x, y, imageName).setScale(scale)
    this.physics.add.collider(this.player, variable, func, null, this)
    variable.setBounce(1)
    variable.setCollideWorldBounds(collide)
    variable.setVelocity(xVel, yVel)
    return variable
  }

  createBomb(variable) {
    variable = this.createEntity(
      variable,
      Math.random() * 500,
      Math.random() * 40,
      'bomb',
      () => {
        this.hitObstacle('რაღაც ცუდი მოხდა!', variable)
        variable.destroy()
        window.setTimeout(() => {
          this.createBomb(variable)
        }, 2000)
      },
      400,
      Math.random() * 180,
      2,
      true
    )
  }

  createBomb2(variable) {
    variable = this.createEntity(
      variable,
      Math.random() * 300 + 500,
      Math.random() * 40,
      'bomb2',
      () => {
        this.hitObstacle('რაღაც კიდევ უფრო ცუდი მოხდა!', variable)
        variable.destroy()
        window.setTimeout(() => {
          this.createBomb2(variable)
        }, 2000)
      },
      -300,
      Math.random() * 180,
      1,
      true
    )
  }

  createHelper(variable) {
    variable = this.createEntity(
      variable,
      400,
      100,
      'bomb',
      () => {
        this.hitHelper('რაღაც კარგი მოხდა!', variable)
      },
      400,
      80,
      2,
      true
    )
    variable.setTint(0x60ac23)
  }

  createHorizontal(variable) {
    variable = this.createEntity(
      variable,
      400,
      100,
      'horizontal',
      () => {
        this.hitObstacle('ჰორიზონტალურს დაეტაკე!', variable)
        variable.destroy()
        window.setTimeout(() => {
          this.createHorizontal(variable)
        }, 2000)
      },
      200,
      0,
      0.5,
      true
    )
  }

  createVertical(variable) {
    variable = this.createEntity(
      variable,
      100,
      300,
      'vertical',
      () => {
        this.hitObstacle('ვერტიკალურს დაეტაკე!', variable)
        variable.destroy()
        window.setTimeout(() => {
          this.createVertical(variable)
        }, 2000)
      },
      0,
      -200,
      0.5,
      true
    )
  }

  createKeys() {
    this.w = this.input.keyboard.addKey('W')
    this.s = this.input.keyboard.addKey('S')
    this.a = this.input.keyboard.addKey('A')
    this.d = this.input.keyboard.addKey('D')
  }

  hitObstacle(text, variable) {
    let message = new Phaser.GameObjects.Text(this, this.physicsWidth + 10, 0, text, {
      fontSize: '20px',
      color: '#000',
      wordWrap: {
        width: this.gameWidth - this.physicsWidth
      }
    })

    this.messages.unshift(message)

    this.messages.forEach((text, index) => {
      text.setY(index * 60 + 15)

      if (text.displayList == null) {
        this.add.existing(text)
      }
    })

    this.lives -= 1
    this.liveText.setText(`lives: ${this.lives}`)

    this.player.setTint(0xff0000)
  }

  hitHelper(text, variable) {
    let message = new Phaser.GameObjects.Text(this, this.physicsWidth + 10, 0, text, {
      fontSize: '20px',
      color: '#000',
      wordWrap: {
        width: this.gameWidth - this.physicsWidth
      }
    })

    this.messages.unshift(message)

    this.messages.forEach((text, index) => {
      text.setY(index * 60 + 15)

      if (text.displayList == null) {
        this.add.existing(text)
      }
    })

    this.player.setTint(0x60ac23)

    this.speedUp = 200
    window.setTimeout(() => {
      this.speedUp = 0
    }, 3000)
    variable.destroy()
    window.setTimeout(() => {
      this.createHelper(variable)
    }, 2000)
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
