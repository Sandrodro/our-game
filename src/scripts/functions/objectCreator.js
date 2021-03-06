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
          }, 1500)
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
  let bonusNames = ['bonus1', 'bonusBlue', 'bonusTarq', 'bonusSky', 'bonusGreen']

  if (group.getLength() == 0) {
    variable = group.get(false, false, image)
  }

  variable.setTexture(bonusNames[cl.bonusNumber])
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
        }, 1500)
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
  let types = !cl.liveUP ? ['speed', 'lives', 'shield'] : ['speed', 'shield']
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
        cl.liveUP = true
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
    repeat: cl.bonusRequired - 1,
    setXY: {
      x: 40,
      y: 95,
      stepX: 70
    }
  })
  return sky
}

export let createPlayer = cl => {
  cl.player = cl.physics.add.sprite(600, 750, 'dudeSheet').setFrame(0)
  cl.player.setBounce(0.2)
  cl.player.setCollideWorldBounds(true)
  cl.player.setScale(1.2)
  return cl.player
}

export let hitHelper = (cl) => {
  cl.bonusNumber += 1
  let t
  if (cl.level == 'job') {
    t = jobText.helperText[cl.bonusNumber - 1]
  } else if (cl.level == 'house') {
    cl.hitNumber = 0
    t = apartmentText.helperText[cl.bonusNumber - 1]
  }
  let message = new Phaser.GameObjects.Text(cl, cl.physicsWidth + 10, 0, t, {
    fontSize: cl.level == 'house' ? '23px' : '21px',
    color: '#4dbd94',
    fontFamily: 'BPG_Banner_QuadroSquare',
    wordWrap: {
      width: cl.gameWidth - cl.physicsWidth - 10
    }
  })

  let popBG = cl.add.rectangle(cl.physicsWidth / 2 + 135, cl.sys.canvas.height / 2 + 40, 840, 130, 0x0b1b2d, 0.7)
  let popMessage = new Phaser.GameObjects.Text(cl, cl.physicsWidth / 2 - 200, cl.sys.canvas.height / 2, t, {
    fontSize: '27px',
    color: '#4dbd94',
    fontFamily: 'BPG_Banner_QuadroSquare',
    wordWrap: {
      width: 750
    }
  })

  cl.add.existing(popMessage)

  window.setTimeout(() => {
    popMessage.destroy()
    popBG.destroy()
  }, 1500)

  cl.messages.unshift(message)

  cl.messages.forEach((text, index) => {
    text.setY(index * (cl.level == 'house' ? 130 : 140) + 40)

    if (text.displayList == null) {
      cl.add.existing(text)
    }
  })
  let bonusNames = ['bonus1', 'bonusBlue', 'bonusTarq', 'bonusSky', 'bonusGreen']
  cl.bonusGroup.children.entries[cl.bonusNumber - 1].setTexture(bonusNames[cl.bonusNumber - 1]).setScale(0.7)

  cl.player.setTint(0x068866)
  window.setTimeout(() => {
    cl.player.clearTint()
  }, 500)
}

export let hitObstacle = (cl) => {
  let t
  if (cl.level == 'job') {
    t = jobText.bombText[cl.hitNumber]
  }
  if (cl.level == 'house') {
    if (cl.hitNumber <= 2) {
      t = apartmentText.bombText[cl.bonusNumber][cl.hitNumber]
    } else {
      t = apartmentText.bombText[cl.bonusNumber[2]]
    }
  }
  cl.hitNumber += 1
  let message = new Phaser.GameObjects.Text(cl, cl.physicsWidth + 10, 0, t, {
    fontSize: cl.level == 'house' ? '23px' : '21px',
    fontFamily: 'BPG_Banner_QuadroSquare',
    color: '#f3673c',
    wordWrap: {
      width: cl.gameWidth - cl.physicsWidth - 10
    }
  })

  let popBG = cl.add.rectangle(cl.physicsWidth / 2 + 135, cl.sys.canvas.height / 2 + 40, 840, 130, 0x0b1b2d, 0.7)
  let popMessage = new Phaser.GameObjects.Text(cl, cl.physicsWidth / 2 - 200, cl.sys.canvas.height / 2, t, {
    fontSize: '27px',
    color: '#f3673c',
    fontFamily: 'BPG_Banner_QuadroSquare',
    wordWrap: {
      width: 750
    }
  })

  cl.add.existing(popMessage)

  window.setTimeout(() => {
    popMessage.destroy()
    popBG.destroy()
  }, 1500)

  cl.messages.unshift(message)

  cl.messages.forEach((text, index) => {
    text.setY(index * (cl.level == 'house' ? 130 : 140) + 40)

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
