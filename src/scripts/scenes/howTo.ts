export default class howTo extends Phaser.Scene {
  constructor() {
    super('howTo')
  }

  create() {
    let space = this.input.keyboard.addKey('SPACE')

    this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'howTo')

    let rect = this.add.rectangle(1477, 804, 160, 100, 0xf66712, 0).setInteractive({
      useHandCursor: true
    })

    rect.on('pointerdown', () => {
      this.scene.start('Menu')
    })

    space.on('down', () => {
      this.scene.start('Menu')
    })
  }
}
