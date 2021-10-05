export default class About extends Phaser.Scene {
  constructor() {
    super('about')
  }

  create() {
    this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'about')

    let rect = this.add
      .rectangle(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2 + 80, 170, 110, 0xfd8912, 0)
      .setInteractive({
        useHandCursor: true
      })

    rect.on('pointerdown', () => {
      this.scene.start('howTo')
    })
  }
}
