import { jobText, apartmentText } from '../text'

export let createBomb = (group, variable, cl, image, x, y, xVel, yVel, scale = 1) => {
  if (group.getLength() == 0) {
    variable = group.get(image)
  }
  let collider = cl.physics.add.overlap(
    cl.player,
    group,
    () => {
      if (!cl.shieldActive) {
        variable.setActive(false)
        variable.setVisible(false)
        collider.destroy()
        hitObstacle(cl)
        let splash = cl.add.image(variable.x, variable.y, 'splashBomb').setScale(0.4)
        window.setTimeout(() => {
          splash.destroy()
        }, 130)
        if (cl.bonusNumber != cl.bonusRequired && cl.lives > 0) {
          window.setTimeout(() => {
            if (cl.bonusNumber != cl.bonusRequired && cl.lives > 0) {
              createBomb(group, variable, cl, image, x, y, xVel, yVel, scale)
            }
          }, 2000)
        }
        if (cl.bonusNumber != cl.bonusRequired && cl.lives > 0) {
          cl.scene.pause()
          window.setTimeout(() => {
            cl.scene.resume()
          }, 1300)
        }
      }
    },
    null,
    cl
  )
  let portal = cl.add.image(x, y, 'portal').setScale(6)

  if (cl.bonusNumber != cl.bonusRequired && cl.lives > 0) {
    window.setTimeout(() => {
      variable.setX(x)
      variable.setY(y)
      variable.setActive(true)
      variable.setVisible(true)
      variable.setScale(scale)
      variable.setBounce(1)
      variable.setCollideWorldBounds(true)
      variable.setVelocity(xVel, yVel)
      portal.destroy()
    }, 400)
  }
  return variable
}

export let increaseVelocity = variable => {
  if (variable.body.velocity.x > 0) {
    variable.body.setVelocityX(variable.body.velocity.x + 23)
  } else if (variable.body.velocity.x < 0) {
    variable.body.setVelocityX(variable.body.velocity.x - 23)
  }

  if (variable.body.velocity.y > 0) {
    variable.body.setVelocityY(variable.body.velocity.y + 23)
  } else if (variable.body.velocity.y < 0) {
    variable.body.setVelocityY(variable.body.velocity.y - 23)
  }
}

export let createHelper = (group, variable, cl, image, x, y, xVel, yVel, scale = 1) => {
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
      hitHelper(cl)
      let splash = cl.add.image(variable.x, variable.y, 'splashBonus').setScale(0.3)
      window.setTimeout(() => {
        splash.destroy()
      }, 130)
      if (cl.bonusNumber != cl.bonusRequired && cl.lives > 0) {
        window.setTimeout(() => {
          if (cl.bonusNumber != cl.bonusRequired && cl.lives > 0) {
            createHelper(group, variable, cl, image, x, y, xVel, yVel, scale)
          }
        }, 2600)
      }
      if (cl.bonusNumber != cl.bonusRequired && cl.lives > 0) {
        cl.scene.pause()
        window.setTimeout(() => {
          cl.scene.resume()
        }, 1300)
      }
    },
    null,
    cl
  )

  let portal = cl.add.image(x, y, 'portal').setScale(5)
  portal.setTint(0x60ac23)
  if (cl.bonusNumber != cl.bonusRequired && cl.lives > 0) {
    window.setTimeout(() => {
      variable.setX(x)
      variable.setY(y)
      variable.setActive(true)
      variable.setVisible(true)
      variable.setScale(scale)
      variable.setBounce(1)
      variable.setCollideWorldBounds(true)
      variable.setVelocity(xVel, yVel)
      portal.destroy()
    }, 400)
  }
  return variable
}

export let createPowerUp = (cl, type) => {
  let imageName
  let types = ['speed', 'lives', 'shield']
  type == 'speed' ? (imageName = 'speedUP') : type == 'lives' ? (imageName = 'liveUP') : (imageName = 'shieldUP')

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
        cl.player.setFrame(2)
        cl.speedUp = 200
        window.setTimeout(() => {
          cl.speedUp = 0
          cl.player.setFrame(0)
        }, 3100)
      } else if (type == 'lives') {
        cl.lives += 1
        cl.player.setTint(0x21edcb)
        let xLoc = cl.liveGroup.getLast(true).x + 70
        let yLoc = cl.liveGroup.getLast(true).y
        cl.liveGroup.create(xLoc, yLoc, 'liveIcon')
        window.setTimeout(() => cl.player.clearTint(), 200)
      } else {
        cl.shieldActive = true
        cl.player.setFrame(1)
        window.setTimeout(() => {
          cl.shieldActive = false
          cl.player.setFrame(0)
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
  let sky = cl.add.tileSprite(600, 450, 1200, 900, imageName)
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
  cl.bonusGroup = cl.add.group({
    key: 'bonusCircle',
    repeat: 2,
    setXY: {
      x: 40,
      y: 95,
      stepX: 70
    }
  })
  return sky
}

export let createPlayer = cl => {
  cl.player = cl.physics.add.sprite(400, 550, 'dudeSheet').setFrame(0)
  cl.player.setBounce(0.2)
  cl.player.setCollideWorldBounds(true)
  cl.player.setScale(1.2)
  return cl.player
}

export let hitHelper = cl => {
  let t
  if (cl.level == 'job') {
    t = jobText.helperText[Math.floor(Math.random() * jobText.helperText.length)]
    if (cl.messages.includes(t)) {
      t = jobText.helperText[Math.floor(Math.random() * jobText.helperText.length)]
    }
  } else if (cl.level == 'house') {
    t = apartmentText.helperText[Math.floor(Math.random() * apartmentText.helperText.length)]
    if (cl.messages.includes(t)) {
      t = apartmentText.helperText[Math.floor(Math.random() * apartmentText.helperText.length)]
    }
  }
  let message = new Phaser.GameObjects.Text(cl, cl.physicsWidth + 10, 0, t, {
    fontSize: cl.level == 'house' ? '21px' : '23px',
    color: '#068866',
    fontFamily: 'BPG_Banner_QuadroSquare',
    wordWrap: {
      width: cl.gameWidth - cl.physicsWidth - 10
    }
  })

  let popMessage = new Phaser.GameObjects.Text(cl, cl.physicsWidth / 2 - 200, cl.sys.canvas.height / 2, t, {
    fontSize: '27px',
    color: '#068866',
    fontFamily: 'BPG_Banner_QuadroSquare',
    wordWrap: {
      width: 750
    }
  })

  cl.add.existing(popMessage)

  window.setTimeout(() => {
    popMessage.destroy()
  }, 1300)

  cl.messages.unshift(message)

  cl.messages.forEach((text, index) => {
    text.setY(index * (cl.level == 'house' ? 100 : 100) + 20)

    if (text.displayList == null) {
      cl.add.existing(text)
    }
  })

  cl.bonusNumber += 1
  cl.bonusGroup.children.entries[cl.bonusNumber - 1].setTexture('bonusCount')

  cl.player.setTint(0x068866)
  window.setTimeout(() => {
    cl.player.clearTint()
  }, 500)
}

export let hitObstacle = cl => {
  let t
  if (cl.level == 'job') {
    t = jobText.bombText[Math.floor(Math.random() * jobText.bombText.length)]
    if (cl.messages.includes(t)) {
      t = jobText.bombText[Math.floor(Math.random() * jobText.bombText.length)]
    }
  }
  if (cl.level == 'house') {
    t = apartmentText.bombText[Math.floor(Math.random() * apartmentText.bombText.length)]
    if (cl.messages.includes(t)) {
      t = apartmentText.bombText[Math.floor(Math.random() * apartmentText.bombText.length)]
    }
  }
  let message = new Phaser.GameObjects.Text(cl, cl.physicsWidth + 10, 0, t, {
    fontSize: cl.level == 'house' ? '21px' : '23px',
    fontFamily: 'BPG_Banner_QuadroSquare',
    color: '#ff3d32',
    wordWrap: {
      width: cl.gameWidth - cl.physicsWidth - 10
    }
  })

  let popMessage = new Phaser.GameObjects.Text(cl, cl.physicsWidth / 2 - 200, cl.sys.canvas.height / 2, t, {
    fontSize: '27px',
    color: '#ff3d32',
    fontFamily: 'BPG_Banner_QuadroSquare',
    wordWrap: {
      width: 750
    }
  })

  cl.add.existing(popMessage)

  window.setTimeout(() => {
    popMessage.destroy()
  }, 1300)

  cl.messages.unshift(message)

  cl.messages.forEach((text, index) => {
    text.setY(index * (cl.level == 'house' ? 100 : 100) + 20)

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
