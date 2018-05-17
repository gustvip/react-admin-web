/**
 * Created by joey on 2018/2/18
 */

import EnumRouter from 'constants/enum_router'
import { AssembleRoute } from 'routes/route_tool'

/**
 * 组件
 */
import UserList from './routes/list'

/**
 * reducers
 */
import userListReducer from './reducers/list'

export default AssembleRoute([
	{
		path: EnumRouter.user_list,
		component: UserList,
		reducers: [{name: 'userListReducer', reducer: userListReducer}],
	},
])
