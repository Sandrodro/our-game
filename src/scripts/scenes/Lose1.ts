export default class Lose1 extends Phaser.Scene {
  constructor() {
    super('Lose1')
  }

  winText
  messages
  displayMessages = []

  init(data) {
    console.log(data)
    this.messages = data.messages
    console.log(this.messages)
  }

  preload() {
    this.load.image('lose1BG', 'assets/lose1BG.png')
  }

  create() {
    this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'lose1BG')
    this.messages.forEach(message => {
      this.displayMessages.push(message)
    })
    this.displayMessages.forEach((message, index) => {
      this.add.text(180, 250 + index * 80, message._text, {
        fontSize: '21px',
        fontFamily: 'BPG_Banner_QuadroSquare',
        align: 'center',
        wordWrap: {
          width: this.sys.game.canvas.width * 0.7
        },
        color: message.style.color
      })
    })
  }
}
