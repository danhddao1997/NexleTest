import {PASSWORD_STRENGTH_CONDITIONS} from 'utils/constants';

export const getSecurityLevel = (value: string) => {
  const conditionsMatchedCount = PASSWORD_STRENGTH_CONDITIONS.filter(cond => {
    return !!value.match(cond);
  }).length;
  return conditionsMatchedCount;
};
