import { Feature } from './index';
import { ingame } from '../wled/schemas';

const InGame: Feature = ({ feature, info }, { currentInfo, wled }) => {
  if (feature === 'me' && info?.me?.team) { wled.request(ingame(currentInfo.currentTeam())); }
  if (info?.matchInfo?.gameState === 'Countdown') { wled.request(ingame(currentInfo.currentTeam())); }
  if (info?.matchState?.started === 'true') { wled.request(ingame(currentInfo.currentTeam())); }
}

export default InGame;
