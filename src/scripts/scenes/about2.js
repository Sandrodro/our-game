export default class About2 extends Phaser.Scene {
  constructor() {
    super('About2')
  }

  create() {
    this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'about2')

    let rect = this.add.rectangle(this.sys.canvas.width / 2 + 100, 560, 370, 90, 0xf66712, 0).setInteractive({
      useHandCursor: true
    })

    let prevRect = this.add.rectangle(this.sys.canvas.width / 2 - 215, 560, 160, 100, 0xf66712, 0).setInteractive({
      useHandCursor: true
    })

    rect.on('pointerdown', () => {
      this.scene.start('howTo')
    })

    prevRect.on('pointerdown', () => {
      this.scene.start('About')
    })
  }
}
