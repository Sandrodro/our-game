export default class Menu extends Phaser.Scene {
  constructor() {
    super('Menu')
  }

  Level1
  Level2

  preload() {
    this.load.image('levelSelect', 'assets/shuttle-horizontal-1100x600.png')
  }

  create() {
    let select = this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'levelSelect').setScale(0.5)
    // this.Level1 = this.add
    //   .text(200, 300, 'სამსახურის ძებნა', { fontSize: '32px', fontFamily: 'BPG_Banner_QuadroSquare', color: '#000' })
    //   .setInteractive()
    // this.Level2 = this.add
    //   .text(200, 500, 'ბინის ძებნა', { fontSize: '32px', fontFamily: 'BPG_Banner_QuadroSquare', color: '#000' })
    //   .setInteractive()

    let jobRect = this.add.rectangle(385, 283, 250, 150, 0xde3eed, 0).setInteractive()
    let apartmentRect = this.add.rectangle(720, 282, 250, 150, 0xff0000, 0).setInteractive()

    jobRect.on('pointerdown', pointer => {
      this.scene.start('Level1')
    })
    apartmentRect.on('pointerdown', pointer => {
      this.scene.start('Level2')
    })
  }
}
