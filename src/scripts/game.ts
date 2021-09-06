import 'phaser'
import Menu from './scenes/Menu'
import Level1 from './scenes/Level1'
import Level2 from './scenes/Level2'

const DEFAULT_WIDTH = 1100
const DEFAULT_HEIGHT = 600

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  backgroundColor: '#ffffff',
  parent: 'phaser-game',
  scene: [Menu, Level1, Level2],
  physics: {
    default: 'arcade'
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
