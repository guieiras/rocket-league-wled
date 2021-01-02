import WLED from './wled';
import features, { CurrentInfo, Feature } from '../features/index';

export default class Controller {
  private wled: WLED;
  private features: Feature[];
  public currentInfo: CurrentInfo;

  constructor(ip: string, currentInfo?: CurrentInfo) {
    this.wled = new WLED(ip);
    this.features = features;
    this.currentInfo = currentInfo || { team: '' };
  }

  isOnline() {
    return this.wled.isConnected();
  }

  info(info) {
    this.features.forEach((feature) => { feature({ info }, this.data()) });
  }

  event(event) {
    this.features.forEach((feature) => { feature({ event }, this.data()) });
  }

  private data() {
    return { wled: this.wled, currentInfo: this.currentInfo };
  }
}
