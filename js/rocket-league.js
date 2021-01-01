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
}
