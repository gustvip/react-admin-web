import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
export default function (App) {
	return (
		<LocaleProvider locale={zhCN}>
			<App/>
		</LocaleProvider>
	);
}
