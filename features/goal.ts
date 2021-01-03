import { Feature } from './index';
import { goal } from '../wled/schemas';

const Goal: Feature = ({ event }, { currentInfo, wled }) => {
  if (event?.name === 'teamGoal') { wled.request(goal(currentInfo.currentTeam())); }
  if (event?.name === 'opposingTeamGoal') { wled.request(goal(currentInfo.opposingTeam())); }
}

export default Goal;
