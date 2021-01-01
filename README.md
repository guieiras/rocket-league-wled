# Rocket League WLED Integration

Add ambient lighting using a LED strip and WLED based on Rocket League events

## Installing

This app is based on [Overwolf](https://www.overwolf.com). I hope it will be released on its App Store as soon as I finish it.

## Features

### Open Rocket League
When Rocket League is launched, load WLED preset 2

### Lobby
While you are waiting for a game, LEDs will intercalate between Blue and Orange

### In a game
During a game, LEDs will twinkle Blue or Orange based on your team (Team 1: Blue, Team 2: Orange)

### Score
When a team scores, LEDs will shake the color of the team that scored

### End game
When a game ends, LEDs will wave the color of the team that won

### Close Rocket League
When Rocket League is closed, reset WLED to preset 1

## Built With

* [Overwolf SDK](https://overwolf.github.io) - Base SDK to get Rocket League events
* [WLED](https://github.com/Aircoookie/WLED/wiki/HTTP-request-API) - WLED HTTP request API to integrate with WLED controller

## Authors

* **[Guilherme Eiras](https://github.com/guieiras)** - *Concept and initial work*
