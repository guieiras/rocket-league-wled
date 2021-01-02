import { Feature } from './index';
import { lobby } from '../wled/schemas';

const Lobby: Feature = ({ event }, { wled }) => {
  if (event.name === 'started') { wled.request(lobby); }
}

export default Lobby;
