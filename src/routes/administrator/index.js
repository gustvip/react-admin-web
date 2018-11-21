/**
 * Created by joey on 2018/2/18
 */

import EnumRouter from 'constants/enumRouter';
import {AssembleRoute} from 'routes/routeTool';
import {MenuAndHeaderLayout} from 'templates/mainLayout';

import AdministratorAuthList from './routes/authList';
import AdministratorGroupList from './routes/groupList';

export default AssembleRoute([
	{
		layout: MenuAndHeaderLayout,
		path: EnumRouter.administratorAuthList,
		component: AdministratorAuthList,
	},
	{
		layout: MenuAndHeaderLayout,
		path: EnumRouter.administratorGroupList,
		component: AdministratorGroupList,
	},
]);
