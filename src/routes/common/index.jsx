/**
 * Created by joey on 17-8-30.
 */
import enumRouter from 'constants/enumRouter';
import {AssembleRoute} from 'routes/routeTool';
import Login from './routes/login';
import NoPermit from './routes/noPermit';

export default AssembleRoute([
	{
		path: enumRouter.login,
		component: Login,
	},
	{
		path: enumRouter.noPermit,
		component: NoPermit,
	},
]);
