/**
 * Created by joey on 2018/2/18
 */

import EnumRouter from 'constants/enumRouter'
import { AssembleRoute, DefaultLayout } from 'routes/routeTool'

import TestDemo from './routes/demo'

export default AssembleRoute([
	{
		layout: DefaultLayout,
		path: EnumRouter.testDemo,
		component: TestDemo,
	},
])
