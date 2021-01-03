import WLED from '../modules/wled';
import Lobby from './lobby';
import GameClosed from './game-closed';

interface OwGameInfo extends Record<string, unknown> {
  matchInfo?: Record<string, unknown>;
  matchState?: Record<string, unknown>;
}
interface Received {
  feature?: string;
  info?: Record<string, OwGameInfo>;
  event?: Record<string, unknown>;
}

interface Dependencies {
  currentInfo: CurrentInfo;
  wled: WLED;
}

export type CurrentInfo = { team: string; };
export type Feature = ({ info, event }: Received, data: Dependencies) => void;

export default [GameClosed, Lobby];
