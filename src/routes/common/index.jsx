/**
 * Created by joey on 17-8-30.
 */
import EnumRouter from 'constants/enumRouter';
import { DefaultLayout, AssembleRoute } from 'routes/routeTool';
import Login from './routes/login';
import Register from './routes/register';

export default AssembleRoute([
	{
		layout: DefaultLayout,
		path: EnumRouter.login,
		component: Login,
	},
	{
		layout: DefaultLayout,
		path: EnumRouter.register,
		component: Register,
	},
]);
