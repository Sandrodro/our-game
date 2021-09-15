export default class loading extends Phaser.Scene {
  constructor() {
    super('loading')
  }

  create() {
    this.add.text(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'LOADING', {
      fontSize: '32px',
      color: '#000'
    })
  }
}
