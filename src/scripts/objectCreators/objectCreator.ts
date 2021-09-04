export let createEntity = (physics, player, variable, x, y, imageName, func, xVel, yVel, scale = 1, collide) => {
  variable = physics.add.sprite(x, y, imageName).setScale(scale)
  physics.add.collider(player, variable, func, null, this)
  variable.setBounce(1)
  variable.setCollideWorldBounds(collide)
  variable.setVelocity(xVel, yVel)
  return variable
}

export let createBomb = (variable, cl, image, text) => {
  variable = createEntity(
    cl.physics,
    cl.player,
    variable,
    Math.random() * 500,
    Math.random() * 40,
    image,
    () => {
      hitObstacle(text, cl)
      variable.destroy()
      window.setTimeout(() => {
        createBomb(variable, cl, image, text)
      }, 2000)
    },
    400,
    Math.random() * 180,
    2,
    true
  )
}

export let createBomb2 = (variable, cl, image, text) => {
  variable = createEntity(
    cl.physics,
    cl.player,
    variable,
    Math.random() * 300 + 500,
    Math.random() * 40,
    image,
    () => {
      hitObstacle(text, cl)
      variable.destroy()
      window.setTimeout(() => {
        createBomb2(variable, cl, image, text)
      }, 2000)
    },
    -300,
    Math.random() * 180,
    1,
    true
  )
}

export let createHelper = (variable, cl, image, text) => {
  variable = createEntity(
    cl.physics,
    cl.player,
    variable,
    400,
    100,
    image,
    () => {
      hitHelper(text, cl)
      variable.destroy()
      window.setTimeout(() => {
        createHelper(variable, cl, image, text)
      }, 2000)
    },
    400,
    80,
    2,
    true
  )
  variable.setTint(0x60ac23)
}

export let createHorizontal = (variable, cl, image, text) => {
  variable = createEntity(
    cl.physics,
    cl.player,
    variable,
    400,
    100,
    image,
    () => {
      hitObstacle(text, cl)
      variable.destroy()
      window.setTimeout(() => {
        createHorizontal(variable, cl, image, text)
      }, 2000)
    },
    200,
    0,
    0.5,
    true
  )
}

export let createVertical = (variable, cl, image, text) => {
  variable = createEntity(
    cl.physics,
    cl.player,
    variable,
    100,
    300,
    image,
    () => {
      hitObstacle(text, cl)
      variable.destroy()
      window.setTimeout(() => {
        createVertical(variable, cl, image, text)
      }, 2000)
    },
    0,
    -200,
    0.5,
    true
  )
}

export let verticalMoverMovement = (variable, cl) => {
  if (variable) {
    if (variable.y < 50) {
      variable.setX(variable.x + (Math.random() > 0.35 ? 30 : -40))
      variable.setVelocity(0, 200)
    } else if (variable.y > cl.physicsHeight - 50) {
      variable.setX(variable.x + (Math.random() > 0.35 ? 30 : -40))
      variable.setVelocity(0, -200)
    }
  }
}

export let horizontalMoverMovement = (variable, cl) => {
  if (variable) {
    if (variable.x > cl.physicsWidth - 70) {
      variable.setY(variable.y + (Math.random() > 0.35 ? 30 : -25))
      variable.setVelocity(-200, 0)
    } else if (variable.x < 70) {
      variable.setY(variable.y + (Math.random() > 0.35 ? 30 : -25))
      variable.setVelocity(200, 0)
    }
  }
}

export let createCanvas = (cl, imageName) => {
  let sky = cl.add.image(400, 300, imageName)
  cl.physicsWidth = sky.width
  cl.physicsHeight = sky.height
  cl.physics.world.setBounds(0, 0, cl.physicsWidth, cl.physicsHeight)

  cl.gameWidth = cl.sys.game.canvas.width
  cl.gameHeight = cl.sys.game.canvas.height

  cl.liveText = cl.add.text(16, 16, `lives: ${cl.lives}`, { fontSize: '32px', color: '#000' })
}

export let createPlayer = cl => {
  cl.player = cl.physics.add.sprite(400, 550, 'dude')
  cl.player.setBounce(0.2)
  cl.player.setCollideWorldBounds(true)
}

export let hitHelper = (text, cl) => {
  let message = new Phaser.GameObjects.Text(cl, cl.physicsWidth + 10, 0, text, {
    fontSize: '20px',
    color: '#000',
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

  cl.player.setTint(0x60ac23)

  cl.speedUp = 200
  window.setTimeout(() => {
    cl.speedUp = 0
  }, 3000)
}

export let hitObstacle = (text, cl) => {
  let message = new Phaser.GameObjects.Text(cl, cl.physicsWidth + 10, 0, text, {
    fontSize: '20px',
    color: '#000',
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

  cl.player.setTint(0xff0000)
}

export let createKeys = cl => {
  cl.w = cl.input.keyboard.addKey('W')
  cl.s = cl.input.keyboard.addKey('S')
  cl.a = cl.input.keyboard.addKey('A')
  cl.d = cl.input.keyboard.addKey('D')
}

export let playerMove = cl => {
  cl.w.on('down', e => {
    cl.player.setVelocityY(-200 - cl.speedUp)
  })

  cl.w.on('up', e => {
    cl.player.setVelocityY(0)
  })

  cl.s.on('down', e => {
    cl.player.setVelocityY(200 + cl.speedUp)
  })

  cl.s.on('up', e => {
    cl.player.setVelocityY(0)
  })

  cl.a.on('down', e => {
    cl.player.setVelocityX(-200 - cl.speedUp)
  })

  cl.a.on('up', e => {
    cl.player.setVelocityX(0)
  })

  cl.d.on('down', e => {
    cl.player.setVelocityX(200 + cl.speedUp)
  })

  cl.d.on('up', e => {
    cl.player.setVelocityX(0)
  })
}
