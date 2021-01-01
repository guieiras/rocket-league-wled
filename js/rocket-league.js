class RocketLeague {
  constructor(wled, logger) {
    this.wled = wled
    this.logger = logger
    this.info = { team: '' }

    this.logger.info('Extension Started', '')
    this.logger.info('WLED', `Assigned IP ${this.wled.ip}`)
  }

  launched() {
    this.logger.info('Rocket League', 'Launched')
    this.lobby()
  }

  running() {
    this.logger.info('Rocket League', 'Running')
    this.lobby()
  }

  closed() {
    this.logger.info('Rocket League', 'Closed')
    this.wled.request({ PL: 1 })

    setTimeout(() => { overwolf.windows.getMainWindow().close() }, 5000)
  }

  lobby() {
    this.logger.info('Info', 'Waiting for game')
    this.wled.request({ CL: 'he04a00', C2: 'h1400d6', C3: 'h000000', FX: 37, SX: 20, IX: 190 })
  }

  setBlueTeam() {
    this.info.team = 'blue'
    this.inGame()
  }

  setOrangeTeam() {
    this.info.team = 'orange'
    this.inGame()
  }

  inGame() {
    this.logger.info('Game', `Playing on ${this.info.team || '<unknown>'} team`)

    if (this.info.team === 'blue') {
      this.wled.request({ CL: 'h1400d6', C2: 'h002b6e', C3: 'h000000', FX: 106, SX: 210, IX: 170 })
    } else if (this.info.team === 'orange') {
      this.wled.request({ CL: 'he04a00', C2: 'h803302', C3: 'h000000', FX: 106, SX: 210, IX: 170 })
    }
  }
}
