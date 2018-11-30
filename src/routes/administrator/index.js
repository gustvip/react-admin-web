/**
 * Created by joey on 2018/2/18
 */
import enumAuth from 'constants/enumAuth';
import enumRouter from 'constants/enumRouter';
import {AssembleRoute} from 'routes/routeTool';
import {MenuAndHeaderLayout} from 'templates/mainLayout';

import AdministratorAuthList from './routes/authList';
import AdministratorGroupList from './routes/groupList';

export default AssembleRoute([
	{
		auth: enumAuth.bPlatformCategoryAdministratorAuthList.value,
		layout: MenuAndHeaderLayout,
		path: enumRouter.administratorAuthList,
		component: AdministratorAuthList,
	},
	{
		auth: enumAuth.bPlatformCategoryAdministratorGroupList.value,
		layout: MenuAndHeaderLayout,
		path: enumRouter.administratorGroupList,
		component: AdministratorGroupList,
	},
]);
