/**
 * Created by joey on 2018/2/18
 */

import EnumRouter from 'constants/enumRouter'
import { AssembleRoute } from 'routes/route_tool'

import UserList from './routes/list'

import userListReducer from './reducers/list'

export default AssembleRoute([
	{
		path: EnumRouter.user_list,
		component: UserList,
		reducers: [{name: 'userListReducer', reducer: userListReducer}],
	},
])
