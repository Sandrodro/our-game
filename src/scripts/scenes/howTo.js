export default class howTo extends Phaser.Scene {
  constructor() {
    super('howTo')
  }

  create() {
    let space = this.input.keyboard.addKey('SPACE')

    this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'howTo')

    let rect = this.add.rectangle(1447, 790, 170, 120, 0xf66712, 0).setInteractive({
      useHandCursor: true
    })

    let aboutRect = this.add.rectangle(210, 795, 190, 110, 0xf66712, 0).setInteractive({
      useHandCursor: true
    })

    aboutRect.on('pointerdown', () => {
      this.scene.start('About')
    })

    rect.on('pointerdown', () => {
      this.scene.start('Menu')
    })

    space.on('down', () => {
      this.scene.start('Menu')
    })
  }
}
