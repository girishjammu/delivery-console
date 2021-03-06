/* eslint import/prefer-default-export: "off" */

import { SERVICE_INFO_RECEIVE, USER_RECEIVE } from 'console/state/action-types';
import { makeNormandyApiRequest } from 'console/state/network/actions';

export function fetchServiceInfo() {
  return async dispatch => {
    const requestId = 'fetch-service-info';
    const serviceInfo = await dispatch(makeNormandyApiRequest(requestId, 'v2/service_info/'));

    dispatch({
      type: SERVICE_INFO_RECEIVE,
      serviceInfo,
    });

    if (!serviceInfo.user) {
      throw new Error('No user provided in service_info');
    }

    dispatch({
      type: USER_RECEIVE,
      user: serviceInfo.user,
    });
  };
}
