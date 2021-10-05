export default class homeWin2 extends Phaser.Scene {
  constructor() {
    super('homeWin2')
  }

  create() {
    this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'winHome')

    let restartRect = this.add.rectangle(this.sys.game.canvas.width / 2, 792, 160, 100, 0xf89120, 0).setInteractive({
      useHandCursor: true
    })

    restartRect.on('pointerdown', pointer => {
      this.scene.start('Menu')
    })
  }
}
