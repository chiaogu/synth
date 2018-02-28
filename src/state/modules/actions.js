import createConstants from '@utils/createConstants';

export const TYPES = createConstants('MODULES', [
  'LOAD_MODULES',
  'LOAD_MODULES_SUCCESS'
]);

export const loadModules = presetId => ({
  type: TYPES.LOAD_MODULES,
  presetId
});

export const loadModulesSuccess = result => ({
  type: TYPES.LOAD_MODULES_SUCCESS,
  modules: result
});