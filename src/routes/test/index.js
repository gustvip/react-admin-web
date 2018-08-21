/**
 * Created by joey on 2018/2/18
 */

import EnumRouter from 'constants/enumRouter'
import { AssembleRoute, DefaultLayout } from 'routes/route_tool'

import TestDemo from './routes/demo'

export default AssembleRoute([
	{
		layout: DefaultLayout,
		path: EnumRouter.test_demo,
		component: TestDemo,
	},
])
