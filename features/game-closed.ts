import { Feature } from './index';

const GameClosed: Feature = ({ event }, { wled }) => {
  if (event.name === 'closed') { wled.request({ PL: 1 }); }
}

export default GameClosed;
