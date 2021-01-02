import WLED from './wled';
import features, { Feature } from '../features/index';

export default class Controller {
  private wled: WLED;
  private features: Feature[];

  constructor(ip: string) {
    this.wled = new WLED(ip);
    this.features = features;
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
    return { wled: this.wled };
  }
}
