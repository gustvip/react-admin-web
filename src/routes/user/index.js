/**
 * Created by joey on 2018/2/18
 */
import enumAuth from 'constants/enumAuth';
import enumRouter from 'constants/enumRouter';
import {AssembleRoute} from 'routes/routeTool';
import {MenuAndHeaderLayout} from 'templates/mainLayout';

import UserList from './routes/list';

export default AssembleRoute([
	{
		auth: enumAuth.bPlatformCategoryUserList.value,
		layout: MenuAndHeaderLayout,
		path: enumRouter.userList,
		component: UserList,
	},
]);
