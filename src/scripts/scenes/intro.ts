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

    let rect = this.add.rectangle(699, 703, 170, 110, 0xf66712, 0).setInteractive({
      useHandCursor: true
    })

    let about = this.add.rectangle(932, 703, 184, 110, 0xf66712, 0).setInteractive({
      useHandCursor: true
    })

    about.on('pointerdown', () => {
      this.scene.start('about')
    })

    rect.on('pointerdown', () => {
      this.scene.start('howTo')
    })

    space.on('down', () => {
      this.scene.start('howTo')
    })
  }
}
