export default class Win extends Phaser.Scene {
  constructor() {
    super('Win1')
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
    this.winText = this.add.text(400, 50, 'თქვენ გაიმარჯვეთ', { fontSize: '32px', color: '#000' })
    this.messages.forEach(message => {
      this.displayMessages.push(message)
    })
    this.displayMessages.forEach((message, index) => {
      this.add.text(this.sys.game.canvas.width / 2 - message.width / 2, 150 + index * 40, message._text, {
        fontSize: '28px',
        fontFamily: 'BPG_Banner_QuadroSquare',
        color: message.style.color
      })
    })
  }
}
