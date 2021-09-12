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

  create() {
    this.winText = this.add.text(400, 50, 'თქვენ დამარცხდით', { fontSize: '32px', color: '#000' })
    this.messages.forEach(message => {
      this.displayMessages.push(message)
    })
    this.displayMessages.forEach((message, index) => {
      this.add.text(100, 150 + index * 80, message._text, {
        fontSize: '28px',
        fontFamily: 'BPG_Banner_QuadroSquare',
        align: 'center',
        wordWrap: {
          width: this.sys.game.canvas.width * 0.9
        },
        color: message.style.color
      })
    })
  }
}
