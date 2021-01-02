import WLED from '../modules/wled';

interface Received {
  info?: any;
  event?: any;
}

interface Dependencies {
  wled: WLED;
}

export type Feature = ({ info, event }: Received, data: Dependencies) => void;

export default [];
