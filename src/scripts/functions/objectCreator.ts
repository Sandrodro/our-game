import { jobText, apartmentText } from '../text'

export let createBomb = (group, variable, cl, image, text, x, y, xVel, yVel, scale = 1) => {
  if (group.getLength() == 0) {
    variable = group.get(image)
  }
  let collider = cl.physics.add.overlap(
    cl.player,
    group,
    () => {
      console.log(variable.x)
      variable.setActive(false)
      variable.setVisible(false)
      collider.destroy()
      hitObstacle(text, cl)
      let splash = cl.add.image(variable.x, variable.y, 'splashBomb').setScale(0.3)
      window.setTimeout(() => {
        splash.destroy()
      }, 130)
      window.setTimeout(() => {
        if (cl.bonusNumber != cl.bonusRequired) {
          createBomb(group, variable, cl, image, text, x, y, xVel, yVel, scale)
        }
      }, 2000)
    },
    null,
    cl
  )
  let portal = cl.add.image(x, y, 'portal').setScale(5)

  window.setTimeout(() => {
    variable.setX(x)
    variable.setY(y)
    variable.setActive(true)
    variable.setVisible(true)
    variable.setTint(0xff0000)
    variable.setScale(scale)
    variable.setBounce(1)
    variable.setCollideWorldBounds(true)
    variable.setVelocity(xVel, yVel)
    portal.destroy()
  }, 400)
  return variable
}

export let createHelper = (group, variable, cl, image, text, x, y, xVel, yVel, scale = 1) => {
  if (group.getLength() == 0) {
    variable = group.get(false, false, image)
  }
  let collider = cl.physics.add.overlap(
    cl.player,
    group,
    () => {
      variable.setActive(false)
      variable.setVisible(false)
      collider.destroy()
      hitHelper(text, cl)
      let splash = cl.add.image(variable.x, variable.y, 'splashBonus').setScale(0.2)
      window.setTimeout(() => {
        splash.destroy()
      }, 130)
      window.setTimeout(() => {
        if (cl.bonusNumber != cl.bonusRequired) {
          createHelper(group, variable, cl, image, text, x, y, xVel, yVel, scale)
        }
      }, 2000)
    },
    null,
    cl
  )

  let portal = cl.add.image(x, y, 'portal').setScale(5)
  portal.setTint(0x60ac23)

  window.setTimeout(() => {
    variable.setX(x)
    variable.setY(y)
    variable.setActive(true)
    variable.setVisible(true)
    variable.setScale(scale)
    variable.setBounce(1)
    variable.setTint(0x60ac23)
    variable.setCollideWorldBounds(true)
    variable.setVelocity(xVel, yVel)
    portal.destroy()
  }, 400)
  return variable
}

export let createPowerUp = (cl, type) => {
  let imageName
  let tint
  let types = ['speed', 'lives', 'shield']
  type == 'speed'
    ? ((imageName = 'speedUP'), (tint = 0x3dbdd3))
    : type == 'lives'
    ? ((imageName = 'liveUP'), (tint = 0x21edcb))
    : ((imageName = 'shieldUP'), (tint = 0xd8122e))

  let powerUp = cl.physics.add.sprite(
    Math.random() * cl.physicsWidth * 0.9,
    Math.random() * cl.physicsHeight * 0.9,
    imageName
  )
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
        }, 3100)
      } else if (type == 'lives') {
        cl.lives += 1
        cl.player.setTint(tint)
        let xLoc = cl.liveGroup.getLast(true).x + 70
        let yLoc = cl.liveGroup.getLast(true).y
        cl.liveGroup.create(xLoc, yLoc, 'liveIcon')
        window.setTimeout(() => cl.player.clearTint(), 200)
      } else {
        cl.player.body.checkCollision.none = true
        cl.player.setTint(tint)
        window.setTimeout(() => {
          cl.player.body.checkCollision.none = false
          cl.player.clearTint()
        }, 3100)
      }

      powerUp.setActive(false)
      powerUp.setVisible(false)
      collider.destroy()
      window.setTimeout(() => {
        let randomPowerUp = Math.floor(Math.random() * 3)
        createPowerUp(cl, types[randomPowerUp])
      }, 6000)
    },
    null,
    cl
  )

  return powerUp
}

export let createCanvas = (cl, imageName) => {
  let sky = cl.add.tileSprite(400, 300, 800, 600, imageName)
  cl.physicsWidth = sky.width
  cl.physicsHeight = sky.height
  cl.physics.world.setBounds(0, 0, cl.physicsWidth, cl.physicsHeight)

  cl.gameWidth = cl.sys.game.canvas.width
  cl.gameHeight = cl.sys.game.canvas.height

  cl.liveGroup = cl.add.group({
    key: 'liveIcon',
    repeat: 2,
    setXY: {
      x: 40,
      y: 50,
      stepX: 70
    }
  })
  cl.bonusText = cl.add.text(16, 80, `Bonus Collected: ${cl.bonusNumber} / ${cl.bonusRequired}`, {
    fontSize: '32px',
    color: '#000'
  })

  return sky
}

export let createPlayer = cl => {
  cl.player = cl.physics.add.sprite(400, 550, 'dude')
  cl.player.setBounce(0.2)
  cl.player.setCollideWorldBounds(true)
  console.log(cl.player)
  return cl.player
}

export let hitHelper = (text, cl) => {
  let t = jobText.helperText[Math.floor(Math.random() * jobText.helperText.length)]
  let message = new Phaser.GameObjects.Text(cl, cl.physicsWidth + 10, 0, t, {
    fontSize: '16px',
    color: '#068866',
    fontFamily: 'BPG_Banner_QuadroSquare',
    wordWrap: {
      width: cl.gameWidth - cl.physicsWidth - 10
    }
  })

  cl.messages.unshift(message)

  cl.messages.forEach((text, index) => {
    text.setY(index * 85 + 15)

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
  let t = jobText.bombText[Math.floor(Math.random() * jobText.bombText.length)]
  let message = new Phaser.GameObjects.Text(cl, cl.physicsWidth + 10, 0, t, {
    fontSize: '16px',
    fontFamily: 'BPG_Banner_QuadroSquare',
    color: '#ff3d32',
    wordWrap: {
      width: cl.gameWidth - cl.physicsWidth - 10
    }
  })

  cl.messages.unshift(message)

  cl.messages.forEach((text, index) => {
    text.setY(index * 85 + 15)

    if (text.displayList == null) {
      cl.add.existing(text)
    }
  })

  cl.lives -= 1
  cl.liveGroup.getLast(true).destroy()

  cl.player.setTint(0xff3d32)
  window.setTimeout(() => {
    cl.player.clearTint()
  }, 500)
}
