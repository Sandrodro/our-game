export default class Intro extends Phaser.Scene {
  constructor() {
    super('intro')
  }

  preload() {
    this.load.image('intro', 'assets/Intro.png')
    this.load.image('howTo', 'assets/howtoplay.png')
    this.load.image('about', 'assets/about.png')
  }

  create() {
    let space = this.input.keyboard.addKey('SPACE')

    this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'intro')

    let rect = this.add.rectangle(this.sys.canvas.width / 2 - 126, 703, 170, 110, 0xf66712, 0).setInteractive({
      useHandCursor: true
    })

    let aboutRect = this.add.rectangle(this.sys.canvas.width / 2 + 110, 703, 190, 110, 0xf788ab, 0).setInteractive({
      useHandCursor: true
    })

    rect.on('pointerdown', () => {
      this.scene.start('howTo')
    })

    aboutRect.on('pointerdown', () => {
      this.scene.start('About')
    })

    space.on('down', () => {
      this.scene.start('howTo')
    })
  }
}
