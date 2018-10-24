import * as types from '../actions/types';
import { take, put } from 'redux-saga/effects';
import { initDimensions } from '../../RadarChart/actions/index';
import {
  initInputContainerDimensions,
  initOutputContainerDimensions
} from '../../ChartContainer/actions/index.js';
import { LAYOUT_DIMENSIONS } from '../../../config.js';

/**
 */
const initApp = function* _initApp () {
  const action = yield take(types.SET_APP_DIMENSIONS);
};

module.exports = {
  initApp: initApp
};

