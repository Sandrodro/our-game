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

export function verticalMoverMovement(variable, cl, spriteHeight) {
  if (variable) {
    if (variable.y < (spriteHeight * 2) / 3) {
      variable.setX(variable.x + (Math.random() > 0.35 ? 30 : -40))
    } else if (variable.y > cl.physicsHeight - (spriteHeight * 2) / 3) {
      variable.setX(variable.x + (Math.random() > 0.35 ? 30 : -40))
    }
  }
}

export let horizontalMoverMovement = (variable, cl, spriteWidth) => {
  if (variable) {
    if (variable.x > cl.physicsWidth - (spriteWidth * 2) / 3) {
      variable.setY(variable.y + (Math.random() > 0.35 ? 30 : -25))
      variable.setVelocity(-200, 0)
    } else if (variable.x < (spriteWidth * 2) / 3) {
      variable.setY(variable.y + (Math.random() > 0.35 ? 30 : -25))
      variable.setVelocity(200, 0)
    }
  }
}
