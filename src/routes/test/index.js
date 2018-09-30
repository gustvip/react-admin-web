/**
 * Created by joey on 2018/2/18
 */

import EnumRouter from "constants/enumRouter";
import {AssembleRoute} from "routes/routeTool";
import {MenuAndHeaderLayout} from "templates/mainLayout";
import TestDemo from "./routes/demo/index";

export default AssembleRoute([
	{
		layout: MenuAndHeaderLayout,
		path: EnumRouter.testDemo,
		component: TestDemo,
	},
]);
