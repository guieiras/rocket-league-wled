import { Feature } from './index';

const SetTeamColor: Feature = ({ feature, info }, { currentInfo }) => {
  if (feature === 'me') {
    if (info?.me?.team === '1') { currentInfo.setTeam('blue'); }
    if (info?.me?.team === '2') { currentInfo.setTeam('orange'); }
  }
}

export default SetTeamColor;
