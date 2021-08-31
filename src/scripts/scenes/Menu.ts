export default class Menu extends Phaser.Scene {
  constructor() {
    super('Menu')
  }

  Level1

  create() {
    this.Level1 = this.add.text(200, 300, 'სამსახურის ძებნა', { fontSize: '32px', color: '#000' }).setInteractive()

    this.Level1.on('pointerdown', pointer => {
      console.log('PRESSED')
      this.scene.start('Level1')
    })
  }
}
