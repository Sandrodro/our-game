export let createBomb = (variable, cl, image, text, x, y, xVel, yVel, scale = 1, collide = true) => {
  variable = cl.physics.add.sprite(x, y, image).setScale(scale)
  cl.physics.add.collider(
    cl.player,
    variable,
    () => {
      hitObstacle(text, cl)
      variable.destroy()
      window.setTimeout(() => {
        variable = createBomb(variable, cl, image, text, x, y, xVel, yVel, scale, collide)
      }, 2000)
    },
    null,
    cl
  )
  variable.setBounce(1)
  variable.setCollideWorldBounds(collide)
  variable.setVelocity(xVel, yVel)
  variable.setActive(true)
  variable.setVisible(true)
  return variable
}

export let createHelper = (variable, cl, image, text, x, y, xVel, yVel, scale = 1, collide = true) => {
  variable = cl.physics.add.sprite(x, y, image).setScale(scale)
  cl.physics.add.collider(
    cl.player,
    variable,
    () => {
      hitHelper(text, cl)
      variable.destroy()
      window.setTimeout(() => {
        variable = createHelper(variable, cl, image, text, x, y, xVel, yVel, scale, collide)
      }, 2000)
    },
    null,
    cl
  )
  variable.setBounce(1)
  variable.setCollideWorldBounds(collide)
  variable.setVelocity(xVel, yVel)
  variable.setTint(0x60ac23)
  variable.setActive(true)
  variable.setVisible(true)
  return variable
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
  return cl.player
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
