import createConstants from '@utils/createConstants';

export const TYPES = createConstants('MODULES', [
  'LOAD_MODULES',
  'LOAD_MODULES_SUCCESS'
]);

export const loadModules = id => ({
  type: TYPES.LOAD_MODULES,
  id
});