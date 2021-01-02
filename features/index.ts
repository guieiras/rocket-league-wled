import WLED from '../modules/wled';

interface Received {
  info?: any;
  event?: any;
}

interface Dependencies {
  currentInfo: CurrentInfo;
  wled: WLED;
}

export type CurrentInfo = { team: string; };
export type Feature = ({ info, event }: Received, data: Dependencies) => void;

export default [];
