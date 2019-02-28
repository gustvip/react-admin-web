/**
 * Created by joey on 2018/2/18
 */
import enumAuth from 'constants/enumAuth';
import enumRouter from 'constants/enumRouter';
import {AssembleRoute} from 'routes/routeTool';
import {MenuAndHeaderLayout} from 'templates/mainLayout';

import AdministratorAuthEnumList from './routes/authEnumList';
import AdministratorGroupList from './routes/groupList';

export default AssembleRoute([
	{
		auth: enumAuth.bPlatformCategoryAdministratorAuthList.value,
		layout: MenuAndHeaderLayout,
		path: enumRouter.administratorAuthEnumList,
		component: AdministratorAuthEnumList,
	},
	{
		auth: enumAuth.bPlatformCategoryAdministratorGroupList.value,
		layout: MenuAndHeaderLayout,
		path: enumRouter.administratorGroupList,
		component: AdministratorGroupList,
	},
]);
