/**
 * Created by joey on 2018/2/18
 */

import EnumRouter from "constants/enumRouter";
import {AssembleRoute} from "routes/routeTool";
import {MenuAndHeaderLayout} from "templates/mainLayout";
import TestDemo from "./routes/demo/index";
import Test1 from "./routes/test1/index";
import Test2 from "./routes/test2/index";
import Test3 from "./routes/test3/index";

export default AssembleRoute([
	{
		layout: MenuAndHeaderLayout,
		path: EnumRouter.testDemo,
		component: TestDemo,
	},
	{
		layout: MenuAndHeaderLayout,
		path: EnumRouter.test1,
		component: Test1,
	},
	{
		layout: MenuAndHeaderLayout,
		path: EnumRouter.test2,
		component: Test2,
	},
	{
		layout: MenuAndHeaderLayout,
		path: EnumRouter.test3,
		component: Test3,
	},
]);
