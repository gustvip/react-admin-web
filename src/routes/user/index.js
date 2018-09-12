/**
 * Created by joey on 2018/2/18
 */

import EnumRouter from 'constants/enumRouter';
import { AssembleRoute } from 'routes/routeTool';

import UserList from './routes/list';

import userListReducer from './reducers/list';

export default AssembleRoute([
	{
		path: EnumRouter.userList,
		component: UserList,
		reducers: [{ name: 'userListReducer', reducer: userListReducer }],
	},
]);
