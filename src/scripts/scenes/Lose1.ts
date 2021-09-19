export default class Lose1 extends Phaser.Scene {
  constructor() {
    super('Lose1')
  }

  winText
  messages
  displayMessages = []
  level

  init(data) {
    this.messages = data.messages
    this.level = data.level
  }

  create() {
    this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'lose1BG')
    this.messages.forEach((message, i) => {
      if (i < 3) {
        this.displayMessages.unshift(message)
      }
    })
    this.displayMessages.reverse().forEach((message, index) => {
      let text = this.add.text((message.width * 2) / 3, 250 + index * 80, message._text, {
        fontSize: '23px',
        fontFamily: 'BPG_Banner_QuadroSquare',
        align: 'center',
        wordWrap: {
          width: this.sys.game.canvas.width * 0.7
        },
        color: message.style.color
      })
      text.setX(this.sys.game.canvas.width / 2 - text.width / 2)
    })

    let nextRect = this.add.rectangle(993, 525, 130, 86, 0xde3eed, 0).setInteractive({
      useHandCursor: true
    })

    nextRect.on('pointerdown', pointer => {
      if (this.level == 'job') {
        this.messages = []
        this.displayMessages = []
        this.scene.start('jobLose2')
      } else if (this.level == 'house') {
        this.messages = []
        this.displayMessages = []
        this.scene.start('homeLose2')
      }
    })
  }
}
