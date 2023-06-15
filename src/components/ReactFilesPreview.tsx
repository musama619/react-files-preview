import { Provider } from "react-redux";
import store from "../../store";
import { Props } from "./interface";
import { Main } from "./Main";
import './style.css'
import { ReactElement } from "react";
export const ReactFilesPreview: (props: Props) => ReactElement = ({
	files,
	url,
	downloadFile,
	removeFile,
	showFileSize,
	showSliderCount,
	multiple,
	accept,
	maxFileSize,
	maxFiles,
	width,
	height,
	rounded,
	fileHeight,
	fileWidth,
	getFiles,
	onChange,
	onRemove,
	onError,
	onClick
}: Props) => {

	return (
		<Provider store={store}>
			<Main files={files}
				url={url}
				downloadFile={downloadFile}
				removeFile={removeFile}
				showFileSize={showFileSize}
				showSliderCount={showSliderCount}
				multiple={multiple}
				accept={accept}
				maxFileSize={maxFileSize}
				maxFiles={maxFiles}
				width={width}
				height={height}
				rounded={rounded}
				fileHeight={fileHeight}
				fileWidth={fileWidth}
				getFiles={getFiles}
				onChange={onChange}
				onRemove={onRemove}
				onError={onError}
				onClick={onClick}
			/>
		</Provider>
	);
};

