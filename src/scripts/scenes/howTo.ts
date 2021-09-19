export default class howTo extends Phaser.Scene {
  constructor() {
    super('howTo')
  }

  create() {
    this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'howTo')

    let rect = this.add.rectangle(985, 537, 110, 70, 0xf66712, 0).setInteractive({
      useHandCursor: true
    })

    rect.on('pointerdown', () => {
      this.scene.start('Menu')
    })
  }
}
