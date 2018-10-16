/**
 * Created by joey on 2018/2/18
 */

import EnumRouter from "constants/enumRouter";
import {AssembleRoute} from "routes/routeTool";
import {MenuAndHeaderLayout} from "templates/mainLayout";

import UserList from "./routes/list";

export default AssembleRoute([
	{
		layout: MenuAndHeaderLayout,
		path: EnumRouter.userList,
		component: UserList,
	},
]);
