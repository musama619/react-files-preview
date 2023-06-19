import { Props } from "./interface";
import { Main } from "./Main";
import "./style.css";
import { FileProvider } from "../context/FileContext";

export const ReactFilesPreview: React.FC<Props> = (props) => {
	return (
		<FileProvider>
			<Main {...props} />
		</FileProvider>
	);
};
