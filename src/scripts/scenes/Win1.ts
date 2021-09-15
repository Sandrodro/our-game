export default class Win extends Phaser.Scene {
  constructor() {
    super('Win1')
  }

  winText
  messages
  displayMessages = []
  level

  init(data) {
    this.messages = data.messages
    this.level = data.level
  }

  preload() {
    this.load.image('win1BG', 'assets/win1BG.png')
  }

  create() {
    this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'win1BG')
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

    let nextRect = this.add.rectangle(993, 525, 130, 86, 0xde3eed, 0).setInteractive({
      useHandCursor: true
    })

    nextRect.on('pointerdown', pointer => {
      if (this.level == 'job') {
        this.scene.start('jobWin2')
      } else if (this.level == 'house') {
        this.scene.start('homeWin2')
      }
    })
  }
}
