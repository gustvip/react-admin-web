/**
 * Created by joey on 2018/2/18
 */

import EnumRouter from 'constants/EnumRouter'
import { AssembleRoute } from 'routes/routeTool'

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
