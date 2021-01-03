import { Feature } from './index';

const SetTeamColor: Feature = ({ feature, info }, { currentInfo }) => {
  if (feature === 'me') {
    if (info?.me?.team === '1') { currentInfo.team = 'blue'; }
    if (info?.me?.team === '2') { currentInfo.team = 'orange'; }
  }
}

export default SetTeamColor;
