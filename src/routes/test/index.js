/**
 * Created by joey on 2018/2/18
 */
import enumAuth from 'constants/enumAuth';
import enumRouter from 'constants/enumRouter';
import {AssembleRoute} from 'routes/routeTool';
import {MenuAndHeaderLayout} from 'templates/mainLayout';
import TestDemo from './routes/demo/index';
import TestParseFile from './routes/parseFile/index';

export default AssembleRoute([
	{
		auth: enumAuth.bPlatformCategoryTestDemo.value,
		layout: MenuAndHeaderLayout,
		path: enumRouter.testDemo,
		component: TestDemo,
	},
	{
		auth: enumAuth.bPlatformCategoryTestParseFile.value,
		layout: MenuAndHeaderLayout,
		path: enumRouter.testParseFile,
		component: TestParseFile,
	},
]);
