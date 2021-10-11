export default class About extends Phaser.Scene {
  constructor() {
    super('About')
  }

  create() {
    this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'about')

    let rect = this.add.rectangle(this.sys.canvas.width / 2, 800, 160, 90, 0xf66712, 0).setInteractive({
      useHandCursor: true
    })

    rect.on('pointerdown', () => {
      this.scene.start('howTo')
    })
  }
}
