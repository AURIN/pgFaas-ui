import * as types from './types';

const setAppDimensions = (innerWidth, innerHeight) => {
  return {
    type: types.SET_APP_DIMENSIONS,
    innerWidth,
    innerHeight
  };
};

export {
  setAppDimensions
};
