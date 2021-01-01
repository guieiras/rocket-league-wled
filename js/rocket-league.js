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

  celebrateGoal() {
    this.logger.info('Game', 'Our team scored')

    if (this.info.team === 'blue') { this.blueTeamGoal() }
    else if (this.info.team === 'orange') { this.orangeTeamGoal() }
  }

  regretGoal() {
    this.logger.info('Game', 'Opposing team scored')

    if (this.info.team === 'blue') { this.orangeTeamGoal() }
    else if (this.info.team === 'orange') { this.blueTeamGoal() }
  }

  victory() {
    this.logger.info('Game', 'Victory')

    if (this.info.team === 'blue') { this.blueWins() }
    else if (this.info.team === 'orange') { this.orangeWins() }

    setTimeout(() => { this.lobby() }, 20000)
  }

  defeat() {
    this.logger.info('Game', 'Defeat')

    if (this.info.team === 'blue') { this.orangeWins() }
    else if (this.info.team === 'orange') { this.blueWins() }

    setTimeout(() => { this.lobby() }, 20000)
  }

  blueTeamGoal() {
    this.logger.info('Game', 'Goal scored by blue team')
    this.wled.request({ CL: 'h1400d6', C2: 'h002b6e', C3: 'h000000', FX: 54, SX: 255, IX: 75 })
  }

  orangeTeamGoal() {
    this.logger.info('Game', 'Goal scored by orange team')
    this.wled.request({ CL: 'he04a00', C2: 'h803302', C3: 'h000000', FX: 54, SX: 255, IX: 75 })
  }

  blueWins() {
    this.logger.info('Game', 'Blue team wins')
    this.wled.request({ CL: 'h1400d6', C2: 'h002b6e', C3: 'h000000', FX: 40, SX: 255, IX: 170 })
  }

  orangeWins() {
    this.logger.info('Game', 'Orange team wins')
    this.wled.request({ CL: 'he04a00', C2: 'h803302', C3: 'h000000', FX: 40, SX: 255, IX: 170 })
  }
}
