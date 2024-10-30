import { STATUS } from '~/literals';

import { Topic } from '~/types';

export const description = 'Boilerplate with React and Redux with Redux Saga';
export const name = 'UST JOBPORTAL';
export const topic: Topic = {
  cached: false,
  data: [],
  message: '',
  status: STATUS.IDLE,
  updatedAt: 0,
};
