import { AppWindow } from "../AppWindow";
import { OWGamesEvents } from "../../odk-ts/ow-games-events";
import { OWHotkeys } from "../../odk-ts/ow-hotkeys";
import { interestingFeatures, hotkeys, windowNames } from "../../consts";
import Controller from "../../modules/controller";
import Configuration from "../../modules/configuration";
import WindowState = overwolf.windows.WindowStateEx;

// The window displayed in-game while a Rocket League game is running.
// Like the background window, it also implements the Singleton design pattern.
class InGame extends AppWindow {
  private static _instance: InGame;
  private _rocketLeagueGameEventsListener: OWGamesEvents;
  private _controller: Controller;

  private constructor() {
    super(windowNames.inGame);

    this.setToggleHotkeyBehavior();
    this.setToggleHotkeyText();
    this.setConfigurationSave();

    this._rocketLeagueGameEventsListener = new OWGamesEvents({
      onInfoUpdates: this.onInfoUpdates.bind(this),
      onNewEvents: this.onNewEvents.bind(this)
    }, interestingFeatures);

    this.resetController();
  }

  public static instance() {
    if (!this._instance) { this._instance = new InGame(); }

    return this._instance;
  }

  public run() {
    this._rocketLeagueGameEventsListener.start();
  }

  private async onInfoUpdates(info) {
    const isOnline = await this._controller.isOnline();
    if (isOnline) { this._controller.info(info); }
  }

  private async onNewEvents(events) {
    const isOnline = await this._controller.isOnline();
    if (isOnline) {
      events.forEach(event => { this._controller.event(event); });
    }
  }

  private saveConfiguration() {
    const ipTextArea = <HTMLInputElement>document.getElementById('wled-ip');
    Configuration.setWledIp(ipTextArea.value);

    this.resetController();
  }

  // Displays the toggle minimize/restore hotkey in the window header
  private async setToggleHotkeyText() {
    const hotkeyText = await OWHotkeys.getHotkeyText(hotkeys.toggle);
    const hotkeyElem = document.getElementById('hotkey');
    hotkeyElem.textContent = hotkeyText;
  }

  // Sets toggleInGameWindow as the behavior for the hotkey
  private async setToggleHotkeyBehavior() {
    const toggleInGameWindow = async () => {
      const inGameState = await this.getWindowState();

      if (inGameState.window_state === WindowState.NORMAL ||
        inGameState.window_state === WindowState.MAXIMIZED) {
        this.currWindow.minimize();
      } else if (inGameState.window_state === WindowState.MINIMIZED ||
        inGameState.window_state === WindowState.CLOSED) {
        this.currWindow.restore();
      }
    }

    OWHotkeys.onHotkeyDown(hotkeys.toggle, toggleInGameWindow);
  }

  private setConfigurationSave() {
    (<HTMLButtonElement>document.querySelector('.save')).addEventListener('click', () => this.saveConfiguration());
  }

  private resetController() {
    this._controller = new Controller(Configuration.getWledIp(), this._controller?.currentInfo);
    this._controller.isOnline().then((online) => {
      const stateBadge = document.querySelector('.state-badge');
      const stateText = document.querySelector('.state-text');

      if (online) {
        stateBadge.classList.remove('state-badge-offline');
        stateBadge.classList.add('state-badge-online');
        stateText.innerHTML = 'Online';
      } else {
        stateBadge.classList.remove('state-badge-online');
        stateBadge.classList.add('state-badge-offline');
        stateText.innerHTML = 'Offline';
      }
    });
  }
}

InGame.instance().run();
