import { routerRedux } from 'dva/router';
import { accountLogin, accountMe } from '../services/api';
import { setAuthority, setMe, getMe } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

import { notification } from 'antd';

export default {
    namespace: 'login',
    state: {
        status: undefined,
    },
    effects: {
        *login({ payload }, { call, put }) {
            const response = yield call(accountLogin, payload);
            
            if (response.status == 200){
                setAuthority(response.data);
                const responseMe = yield call(accountMe, {});
                if (responseMe.status == 200) {
                    setMe(responseMe.data);
                    yield put({
                        type: 'changeLoginStatus',
                        payload: {
                            token : response.data,
                            me: responseMe
                        },
                    });
                    //reloadAuthorized();
                    yield put(routerRedux.push('/'));
                }
            } else {
                notification.error({
                    message: `${response.data.message}`,
                    description: '',
                });
                /*
                const error = new Error(response.message);
                error.name = response.status;
                error.response = response;
                throw error;
                */
            }
            
        },
        *logout(_, { put, select }) {
            try {
                // get location pathname
                const urlParams = new URL(window.location.href);
                const pathname = yield select(state => state.routing.location.pathname);
                // add the parameters in the url
                urlParams.searchParams.set('redirect', pathname);
                window.history.replaceState(null, 'login', urlParams.href);
            } finally {
                yield put({
                    type: 'changeLoginStatus',
                    payload: {
                        status: false,
                        currentAuthority: false,
                    },
                });
                reloadAuthorized();
                yield put(routerRedux.push('/user/login'));
            }
        },
    },

    reducers: {
        changeLoginStatus(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
    },
};
