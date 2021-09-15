import 'phaser'
import Menu from './scenes/Menu'
import Level1 from './scenes/Level1'
import Level2 from './scenes/Level2'
import Win1 from './scenes/Win1'
import Lose1 from './scenes/Lose1'
import homeLose2 from './scenes/homeLose2'
import jobLose2 from './scenes/jobLose2'
import homeWin2 from './scenes/homeWin2'
import jobWin2 from './scenes/jobWin2'
import loading from './scenes/loading'

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
  scene: [Menu, Level1, Level2, Win1, Lose1, homeLose2, jobLose2, homeWin2, jobWin2, loading],
  physics: {
    default: 'arcade'
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
