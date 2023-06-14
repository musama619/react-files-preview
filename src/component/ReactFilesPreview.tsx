import { Provider } from "react-redux";
import store from "../../store";
import { Props } from "./intefaces";
import { Main } from "./Main";
import './style.css'
export const ReactFilesPreview: React.FC<Props> = (props) => {

	return (
		<Provider store={store}>
			<Main {...props} />
		</Provider>
	);
};

