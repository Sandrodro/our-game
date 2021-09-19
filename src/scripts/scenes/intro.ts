export default class Intro extends Phaser.Scene {
  constructor() {
    super('intro')
  }

  preload() {
    this.load.image('intro', 'assets/Intro.png')
    this.load.image('howTo', 'assets/howtoplay.png')
  }

  create() {
    this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'intro')

    let rect = this.add.rectangle(this.sys.canvas.width / 2, 423, 110, 70, 0xf66712, 0).setInteractive({
      useHandCursor: true
    })

    rect.on('pointerdown', () => {
      this.scene.start('howTo')
    })
  }
}
