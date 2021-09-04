export default class Menu extends Phaser.Scene {
  constructor() {
    super('Menu')
  }

  Level1
  Level2

  create() {
    this.Level1 = this.add.text(200, 300, 'სამსახურის ძებნა', { fontSize: '32px', color: '#000' }).setInteractive()
    this.Level2 = this.add.text(200, 500, 'ბინის ძებნა', { fontSize: '32px', color: '#000' }).setInteractive()

    this.Level1.on('pointerdown', pointer => {
      this.scene.start('Level1')
    })
    this.Level2.on('pointerdown', pointer => {
      this.scene.start('Level2')
    })
  }
}
