import WLED from '../modules/wled';
import InGame from './ingame';
import Lobby from './lobby';
import GameClosed from './game-closed';
import SetTeamColor from './set-team-color';

interface Received {
  feature?: string;
  info?: Record<string, OwGameInfo>;
  event?: Record<string, unknown>;
}

interface Dependencies {
  currentInfo: CurrentInfo;
  wled: WLED;
}

export interface OwGameInfo extends Record<string, unknown> {
  matchInfo?: Record<string, unknown>;
  matchState?: Record<string, unknown>;
}
export interface CurrentInfo { team: string; };
export type Feature = ({ info, event }: Received, data: Dependencies) => void;

export default [GameClosed, Lobby, SetTeamColor, InGame];
