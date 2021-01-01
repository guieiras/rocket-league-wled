class RocketLeague {
  constructor(wled, logger) {
    this.wled = wled
    this.logger = logger
    this.info = { team: '' }

    this.logger.info('Extension Started', '')
    this.logger.info('WLED', `Assigned IP ${this.wled.ip}`)
  }
}
