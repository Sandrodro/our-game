export default class jobLose2 extends Phaser.Scene {
  constructor() {
    super('jobLose2')
  }

  create() {
    this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'loseJob')

    let restartRect = this.add.rectangle(this.sys.game.canvas.width / 2, 526, 110, 70, 0xf89120, 0).setInteractive({
      useHandCursor: true
    })

    restartRect.on('pointerdown', pointer => {
      this.scene.start('Menu')
    })
  }
}
