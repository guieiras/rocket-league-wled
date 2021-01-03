import { Feature } from './index';
import { win, lobby } from '../wled/schemas';

const Win: Feature = ({ event }, { currentInfo, wled }) => {
  if (event?.name === 'victory') { wled.request(win(currentInfo.currentTeam())); }
  if (event?.name === 'defeat') { wled.request(win(currentInfo.opposingTeam())); }

  setTimeout(() => { wled.request(lobby); }, 20000);
}

export default Win;
