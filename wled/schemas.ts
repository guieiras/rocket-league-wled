import * as color from './colors'
import * as effect from './effects'

const bluePalette = {
  CL: color.primaryBlue,
  C2: color.secondaryBlue,
  C3: color.black
}

const orangePalette = {
  CL: color.primaryOrange,
  C2: color.secondaryOrange,
  C3: color.black
}

export const lobby = {
  CL: color.primaryOrange,
  C2: color.primaryBlue,
  C3: color.black,
  FX: effect.running2,
  SX: 20,
  IX: 90
};

export function ingame(team: string) {
  return {
    ...(team === 'orange' ? orangePalette : bluePalette),
    FX: effect.twinkleUp,
    SX: 210,
    IX: 170
  };
};
