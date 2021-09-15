export default class jobWin2 extends Phaser.Scene {
  constructor() {
    super('jobWin2')
  }

  preload() {
    this.load.image('winJob', 'assets/winJob.png')
  }

  create() {
    this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'winJob')

    let restartRect = this.add.rectangle(this.sys.game.canvas.width / 2, 526, 110, 70, 0xf89120, 0).setInteractive({
      useHandCursor: true
    })

    restartRect.on('pointerdown', pointer => {
      this.scene.start('Menu')
    })
  }
}
