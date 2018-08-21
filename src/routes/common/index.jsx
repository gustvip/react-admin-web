/**
 * Created by joey on 17-8-30.
 */
import EnumRouter from 'constants/enumRouter';
import { DefaultLayout, AssembleRoute } from 'routes/route_tool';
import Login from './routes/login';

export default AssembleRoute([
	{
		layout: DefaultLayout,
		path: EnumRouter.login,
		component: Login,
	},
]);
