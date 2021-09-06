export let createBomb = (group, variable, cl, image, text, x, y, xVel, yVel, scale = 1, collide = true) => {
  if (group.getLength() == 0) {
    variable = group.get(x, y, image)
  }
  let collider = cl.physics.add.overlap(
    cl.player,
    group,
    () => {
      console.log(group.getLength())
      variable.setActive(false)
      variable.setVisible(false)
      collider.destroy()
      hitObstacle(text, cl)
      window.setTimeout(() => {
        createBomb(group, variable, cl, image, text, x, y, xVel, yVel, scale, collide)
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
  variable.setCollideWorldBounds(collide)
  variable.setVelocity(xVel, yVel)
  return variable
}

export let createHelper = (group, variable, cl, image, text, x, y, xVel, yVel, scale = 1, collide = true) => {
  if (group.getLength() == 0) {
    variable = group.get(x, y, image)
  }
  let collider = cl.physics.add.overlap(
    cl.player,
    group,
    () => {
      console.log(group.getLength())
      variable.setActive(false)
      variable.setVisible(false)
      collider.destroy()
      hitHelper(text, cl)
      window.setTimeout(() => {
        createBomb(group, variable, cl, image, text, x, y, xVel, yVel, scale, collide)
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
  variable.setCollideWorldBounds(collide)
  variable.setVelocity(xVel, yVel)
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
