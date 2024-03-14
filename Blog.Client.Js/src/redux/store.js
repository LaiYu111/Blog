import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from 'redux-thunk';
import appReducer from "./reducers";


const initialState = {};

// thunk 中间件， 浏览器中 下载 react tooldev 可以看到状态 （可视化）
const middleware = [thunk];

const store = createStore(
	appReducer,
	initialState,
	compose(
		applyMiddleware(...middleware),
		// @ts-ignore
		(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
		// @ts-ignore
			window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
		compose
	)
);

export default store;
