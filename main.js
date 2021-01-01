window.addEventListener('load', function () {
  var textarea = document.getElementById('logger');
  var wled = new WLED('rocket-league-led.local')
  var logger = new TextAreaLogger(textarea)

  var rocketLeague = new RocketLeague(wled, logger)

  var requestedFeatures = [
    'stats',
    'roster',
    'match',
    'me',
    'match_info'
  ];

  function registerEvents() {

  }

  function gameLaunched(gameInfoResult) {
    if (!gameInfoResult) { return false; }
    if (!gameInfoResult.gameInfo) { return false; }
    if (!gameInfoResult.runningChanged && !gameInfoResult.gameChanged) { return false; }
    if (!gameInfoResult.gameInfo.isRunning) { return false; }
    if (Math.floor(gameInfoResult.gameInfo.id / 10) != 10798) { return false; }

    return true;
  }

  function gameClosed(gameInfoResult) {
    if (!gameInfoResult) { return false; }
    if (!gameInfoResult.gameInfo) { return false; }
    if (!gameInfoResult.runningChanged) { return false; }
    if (gameInfoResult.gameInfo.isRunning) { return false; }

    return true;
  }

  function gameRunning(gameInfo) {
    if (!gameInfo) { return false; }
    if (!gameInfo.isRunning) { return false; }
    if (Math.floor(gameInfo.id / 10) != 10798) { return false; }

    return true;
  }

  function setFeatures() {
    overwolf.games.events.setRequiredFeatures(requestedFeatures, function (info) {
      if (info.status == "error") {
        window.setTimeout(setFeatures, 2000);
        return;
      }
    });
  }

  overwolf.games.onGameInfoUpdated.addListener(function (res) {
    if (gameLaunched(res)) {
      rocketLeague.launched();
      registerEvents();
      setTimeout(setFeatures, 1000);
    }

    if (gameClosed(res)) {
      rocketLeague.closed();
      setTimeout(() => { overwolf.windows.getMainWindow().close() }, 5000);
    }
  });

  overwolf.games.getRunningGameInfo(function (res) {
    if (gameRunning(res)) {
      rocketLeague.running();
      registerEvents();
      setTimeout(setFeatures, 1000);
    }
  });
});
