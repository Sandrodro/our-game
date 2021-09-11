import { jobText, apartmentText } from '../text'

export let createBomb = (group, variable, cl, image, text, x, y, xVel, yVel, scale = 1) => {
  if (group.getLength() == 0) {
    variable = group.get(x, y, image)
  }
  let collider = cl.physics.add.overlap(
    cl.player,
    group,
    () => {
      variable.setActive(false)
      variable.setVisible(false)
      collider.destroy()
      hitObstacle(text, cl)
      window.setTimeout(() => {
        if (cl.bonusNumber != cl.bonusRequired) {
          createBomb(group, variable, cl, image, text, x, y, xVel, yVel, scale)
        }
      }, 2000)
    },
    null,
    cl
  )
  variable.setX(x)
  variable.setY(y)
  variable.setActive(true)
  variable.setVisible(true)
  variable.setTint(0xff0000)
  variable.setScale(scale)
  variable.setBounce(1)
  variable.setCollideWorldBounds(true)
  variable.setVelocity(xVel, yVel)
  return variable
}

export let createHelper = (group, variable, cl, image, text, x, y, xVel, yVel, scale = 1) => {
  if (group.getLength() == 0) {
    variable = group.get(x, y, image)
  }
  let collider = cl.physics.add.overlap(
    cl.player,
    group,
    () => {
      variable.setActive(false)
      variable.setVisible(false)
      collider.destroy()
      hitHelper(text, cl)
      window.setTimeout(() => {
        if (cl.bonusNumber != cl.bonusRequired) {
          createHelper(group, variable, cl, image, text, x, y, xVel, yVel, scale)
        }
      }, 2000)
    },
    null,
    cl
  )
  variable.setX(x)
  variable.setY(y)
  variable.setActive(true)
  variable.setVisible(true)
  variable.setScale(scale)
  variable.setBounce(1)
  variable.setTint(0x60ac23)
  variable.setCollideWorldBounds(true)
  variable.setVelocity(xVel, yVel)
  return variable
}

export let createPowerUp = (cl, type) => {
  let tint
  let types = ['speed', 'lives', 'shield']
  type == 'speed' ? (tint = 0xde3eed) : type == 'lives' ? (tint = 0x6a3eed) : (tint = 0x3e8ded)

  let powerUp = cl.physics.add.sprite(
    (Math.random() * cl.sys.game.canvas.width * 2) / 3,
    (Math.random() * cl.sys.game.canvas.height * 2) / 3,
    'powerup'
  )
  powerUp.setTint(tint)
  let collider = cl.physics.add.overlap(
    cl.player,
    powerUp,
    () => {
      if (type == 'speed') {
        cl.speedUp = 200
        cl.player.setTint(tint)
        window.setTimeout(() => {
          cl.speedUp = 0
          cl.player.clearTint()
        }, 2500)
      } else if (type == 'lives') {
        cl.lives += 1
        cl.liveText.setText(`lives: ${cl.lives}`)
      } else {
        cl.player.body.checkCollision.none = true
        cl.player.setTint(tint)
        window.setTimeout(() => {
          console.log(cl.player)
          cl.player.body.checkCollision.none = false
          cl.player.clearTint()
        }, 2000)
      }

      powerUp.setActive(false)
      powerUp.setVisible(false)
      collider.destroy()
      window.setTimeout(() => {
        let randomPowerUp = Math.floor(Math.random() * 3)
        createPowerUp(cl, types[randomPowerUp])
      }, 5000)
    },
    null,
    cl
  )

  return powerUp
}

export let createCanvas = (cl, imageName) => {
  let sky = cl.add.image(400, 300, imageName)
  cl.physicsWidth = sky.width
  cl.physicsHeight = sky.height
  cl.physics.world.setBounds(0, 0, cl.physicsWidth, cl.physicsHeight)

  cl.gameWidth = cl.sys.game.canvas.width
  cl.gameHeight = cl.sys.game.canvas.height

  cl.liveText = cl.add.text(16, 16, `lives: ${cl.lives}`, { fontSize: '32px', color: '#000' })
  cl.bonusText = cl.add.text(16, 80, `Bonus Collected: ${cl.bonusNumber} / ${cl.bonusRequired}`, {
    fontSize: '32px',
    color: '#000'
  })
}

export let createPlayer = cl => {
  cl.player = cl.physics.add.sprite(400, 550, 'dude')
  cl.player.setBounce(0.2)
  cl.player.setCollideWorldBounds(true)
  return cl.player
}

export let hitHelper = (text, cl) => {
  let t = jobText.helperText[Math.floor(Math.random() * jobText.helperText.length)]
  let message = new Phaser.GameObjects.Text(cl, cl.physicsWidth + 15, 0, t, {
    fontSize: '16px',
    color: '#068866',
    fontFamily: 'BPG_Banner_QuadroSquare',
    wordWrap: {
      width: cl.gameWidth - cl.physicsWidth
    }
  })

  cl.messages.unshift(message)

  cl.messages.forEach((text, index) => {
    text.setY(index * 60 + 15)

    if (text.displayList == null) {
      cl.add.existing(text)
    }
  })

  cl.bonusNumber += 1
  cl.bonusText.setText(`Bonus Collected: ${cl.bonusNumber} / ${cl.bonusRequired}`)

  cl.player.setTint(0x068866)
  window.setTimeout(() => {
    cl.player.clearTint()
  }, 500)
}

export let hitObstacle = (text, cl) => {
  let t = apartmentText.helperText[Math.floor(Math.random() * apartmentText.helperText.length)]
  let message = new Phaser.GameObjects.Text(cl, cl.physicsWidth + 15, 0, t, {
    fontSize: '16px',
    fontFamily: 'BPG_Banner_QuadroSquare',
    color: '#ff3d32',
    wordWrap: {
      width: cl.gameWidth - cl.physicsWidth
    }
  })

  cl.messages.unshift(message)

  cl.messages.forEach((text, index) => {
    text.setY(index * 60 + 15)

    if (text.displayList == null) {
      cl.add.existing(text)
    }
  })

  cl.lives -= 1
  cl.liveText.setText(`lives: ${cl.lives}`)

  cl.player.setTint(0xff3d32)
  window.setTimeout(() => {
    cl.player.clearTint()
  }, 500)
}
