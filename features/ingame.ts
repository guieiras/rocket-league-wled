import { Feature } from './index';
import { ingame } from '../wled/schemas';

const InGame: Feature = ({ feature, info }, { currentInfo, wled }) => {
  if (feature === 'me' && info.me && info.me.team) { wled.request(ingame(currentInfo.team)); }
  if (info.matchInfo && info.matchInfo.gameState === 'Countdown') { wled.request(ingame(currentInfo.team)); }
  if (info.matchState && info.matchState.started === 'true') { wled.request(ingame(currentInfo.team)); }
}

export default InGame;
