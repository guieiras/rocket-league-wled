import { Feature } from './index';
import { lobby } from '../wled/schemas';

const Lobby: Feature = ({ info, event, feature }, { wled }) => {
  if (event.name === 'started') { wled.request(lobby); }
  if (feature === 'match' && info.matchInfo && info.matchInfo.gameType === null) { wled.request(lobby); }
}

export default Lobby;
