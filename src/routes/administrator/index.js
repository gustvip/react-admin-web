/**
 * Created by joey on 2018/2/18
 */
import enumAuth from 'constants/enumAuth';
import enumRouter from 'constants/enumRouter';
import {AssembleRoute} from 'routes/routeTool';
import {MenuAndHeaderLayout} from 'templates/mainLayout';

import AuthEnum from './routes/authEnum';
import AuthList from './routes/authList';

export default AssembleRoute([
	{
		auth: enumAuth.bPlatformCategoryAdministratorAuthList.value,
		layout: MenuAndHeaderLayout,
		path: enumRouter.administratorAuthEnum,
		component: AuthEnum,
	},
	{
		auth: enumAuth.bPlatformCategoryAdministratorGroupList.value,
		layout: MenuAndHeaderLayout,
		path: enumRouter.administratorAuthList,
		component: AuthList,
	},
]);
