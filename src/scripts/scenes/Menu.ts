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
    let jobRect = this.add.rectangle(571, 326, 370, 228, 0xde3eed, 0).setInteractive({
      useHandCursor: true
    })
    let apartmentRect = this.add.rectangle(1081, 326, 370, 228, 0xff0000, 0).setInteractive({
      useHandCursor: true
    })

    let menuRect = this.add.rectangle(this.sys.canvas.width / 2, 775, 380, 90, 0xde3eed, 0).setInteractive({
      useHandCursor: true
    })

    jobRect.on('pointerdown', () => {
      this.scene.start('jobLevel')
    })
    apartmentRect.on('pointerdown', () => {
      this.scene.start('houseLevel')
    })

    menuRect.on('pointerdown', () => {
      this.scene.start('howTo')
    })
  }
}
