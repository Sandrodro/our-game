export let createKeys = cl => {
  cl.w = cl.input.keyboard.addKey('W')
  cl.s = cl.input.keyboard.addKey('S')
  cl.a = cl.input.keyboard.addKey('A')
  cl.d = cl.input.keyboard.addKey('D')

  cl.up = cl.input.keyboard.addKey('UP')
  cl.down = cl.input.keyboard.addKey('DOWN')
  cl.left = cl.input.keyboard.addKey('LEFT')
  cl.right = cl.input.keyboard.addKey('RIGHT')
}

export let playerMove = cl => {
  if (cl.a.isDown || cl.left.isDown) {
    cl.player.setVelocityX(-350 - cl.speedUp)
  } else if (cl.d.isDown || cl.right.isDown) {
    cl.player.setVelocityX(350 + cl.speedUp)
  } else {
    cl.player.setVelocityX(0)
  }

  if (cl.w.isDown || cl.up.isDown) {
    cl.player.setVelocityY(-350 - cl.speedUp)
  } else if (cl.s.isDown || cl.down.isDown) {
    cl.player.setVelocityY(350 + cl.speedUp)
  } else {
    cl.player.setVelocityY(0)
  }
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
      variable.setVelocity(variable.body.velocity.x, 0)
    } else if (variable.x < (spriteWidth * 2) / 3) {
      variable.setY(variable.y + (Math.random() > 0.35 ? 30 : -25))
      variable.setVelocity(variable.body.velocity.x, 0)
    }
  }
}
