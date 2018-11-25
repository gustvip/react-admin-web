/**
 * Created by joey on 17-8-30.
 */
import EnumRouter from 'constants/enumRouter';
import {AssembleRoute} from 'routes/routeTool';
import Login from './routes/login';

export default AssembleRoute([
	{
		path: EnumRouter.login,
		component: Login,
	},
]);
