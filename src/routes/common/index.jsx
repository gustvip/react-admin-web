/**
 * Created by joey on 17-8-30.
 */
import EnumRouter from "constants/enumRouter";
import {AssembleRoute} from "routes/routeTool";
import Login from "./routes/login";
import Register from "./routes/register";

export default AssembleRoute([
	{
		path: EnumRouter.login,
		component: Login,
	},
	{
		path: EnumRouter.register,
		component: Register,
	},
]);
