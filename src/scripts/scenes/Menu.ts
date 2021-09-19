export default class Menu extends Phaser.Scene {
  constructor() {
    super('Menu')
  }

  Level1
  Level2

  preload() {
    this.load.image('levelSelect', 'assets/shuttle-horizontal-1100x600.png')
    this.load.image('loading', 'assets/LOADING.png')
  }

  create() {
    this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'levelSelect')
    let jobRect = this.add.rectangle(385, 283, 245, 153, 0xde3eed, 0).setInteractive({
      useHandCursor: true
    })
    let apartmentRect = this.add.rectangle(715, 282, 245, 153, 0xff0000, 0).setInteractive({
      useHandCursor: true
    })

    jobRect.on('pointerdown', pointer => {
      this.scene.start('jobLevel')
    })
    apartmentRect.on('pointerdown', pointer => {
      this.scene.start('houseLevel')
    })
  }
}
