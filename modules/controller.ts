import WLED from './wled';
import features, { CurrentInfo, Feature } from '../features/index';

export default class Controller {
  public currentInfo: CurrentInfo;
  private wled: WLED;
  private modules: Feature[];
  private _isOnline: boolean = false;

  constructor(ip: string, currentInfo?: CurrentInfo) {
    this.wled = new WLED(ip);
    this.modules = features;
    this.currentInfo = currentInfo || { team: '' };
  }

  async isOnline(): Promise<boolean> {
    if (this._isOnline) { return this._isOnline; }

    const connected = await this.wled.isConnected();

    this._isOnline = connected;
    return connected;
  }

  async info(info: Record<string, unknown>, feature: string) {
    if (!await this.isOnline()) { return; }
    this.modules.forEach((module) => { module({ feature, info }, this.data()) });
  }

  async event(event) {
    if (!await this.isOnline()) { return; }
    this.modules.forEach((module) => { module({ event }, this.data()) });
  }

  async started() {
    if (!await this.isOnline()) { return; }
    this.event({ name: 'started' });
  }

  async closed() {
    if (!await this.isOnline()) { return; }
    this.event({ name: 'closed' });
  }

  private data() {
    return { wled: this.wled, currentInfo: this.currentInfo };
  }
}
