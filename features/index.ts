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

enum ColorTeam {
  Orange = 'orange',
  Blue = 'blue',
  None = ''
}
export class CurrentInfo {
  private team: ColorTeam;

  constructor({ team }: { team: string }) {
    this.setTeam(team);
  }

  currentTeam() {
    return this.team;
  }

  setTeam(team: string) {
    switch (team) {
      case 'blue':
        this.team = ColorTeam.Blue;
        return;
      case 'orange':
        this.team = ColorTeam.Orange;
        return;
      default:
        this.team = ColorTeam.None;
    }
  }

  opposingTeam() {
    if(this.team === 'blue') { return ColorTeam.Orange; }
    if(this.team === 'orange') { return ColorTeam.Blue; }

    return ColorTeam.None;
  };
};

export type Feature = ({ info, event }: Received, data: Dependencies) => void;

export default [GameClosed, Lobby, SetTeamColor, InGame];
