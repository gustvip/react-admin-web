/**
 * Created by joey on 2018/2/18
 */
import enumRouter from 'constants/enumRouter';
import {AssembleRoute} from 'routes/routeTool';
import {MenuAndHeaderLayout} from 'templates/mainLayout';
import TestDemo from './routes/demo/index';
import TestParseFile from './routes/parseFile/index';

export default AssembleRoute([
	{
		layout: MenuAndHeaderLayout,
		path: enumRouter.testDemo,
		component: TestDemo,
	},
	{
		layout: MenuAndHeaderLayout,
		path: enumRouter.testParseFile,
		component: TestParseFile,
	},
]);
