import { useContext, useEffect, useState } from "react";
import { FileFooterProps } from "./types";
import { FileContext } from "../context/FileContext";
const FileFooter: React.FC<FileFooterProps> = ({ file, fileSrc, index, isImage }) => {
	const [fileSize, setFileSize] = useState<string | null>(null);

	useEffect(() => {
		if (file.size < 1000000) {
			setFileSize(Math.floor(file.size / 1000) + " KB");
		} else {
			setFileSize(Math.floor(file.size / 1000000) + " MB");
		}
	}, [file]);

	const nameArray = file.name.split(".");
	let fileName = nameArray[0];
	const extension = nameArray.pop();
	if (fileName.length > 20) {
		fileName =
			fileName.substring(0, 5) + ".." + fileName.substring(fileName.length - 3, fileName.length);
	}
	const result = fileName + "." + extension;
	const componentState = useContext(FileContext).state.componentState;
	const { dispatch } = useContext(FileContext);

	const setIsEditing = () => {
		dispatch({
			type: "SET_IMAGE_EDITOR_DATA",
			payload: {
				isEditing: true,
				file: file,
				index: index,
			},
		});
	};
	return (
		<div className="rfp-relative ">
			<h5 className="rfp-text-[12px] rfp-mt-1 rfp-font-normal rfp-break-words rfp-text-black dark:rfp-text-slate-100">
				{result}
			</h5>
			{componentState.showFileSize && (
				<span
					data-testid="file-size"
					className="rfp-text-[10px] rfp-text-black dark:rfp-text-slate-100"
				>
					{fileSize}
				</span>
			)}
			{componentState.downloadFile && fileSrc && (
				<a
					className="rfp-float-right rfp-absolute rfp-top-1 rfp-right-0 rfp-text-gray-500 dark:rfp-text-white"
					href={fileSrc}
					target="_blank"
					download={file?.name}
					rel="noreferrer"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4"
						fill="currentColor"
						viewBox="0 0 16 16"
					>
						<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
						<path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
					</svg>
				</a>
			)}
			{componentState.allowEditing && !componentState.disabled && isImage && (
				<button
					className="rfp-float-right rfp-absolute rfp-top-1 rfp-right-5 rfp-text-gray-500 dark:rfp-text-white"
					onClick={setIsEditing}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="h-4 w-4"
						viewBox="0 0 16 16"
					>
						<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
						<path
							fillRule="evenodd"
							d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
						/>
					</svg>
				</button>
			)}
		</div>
	);
};

export default FileFooter;
