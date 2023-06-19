import { useContext, useEffect, useState } from "react";
import { FileFooterProps } from "./types";
import { FileContext } from "../context/FileContext";
const FileFooter: React.FC<FileFooterProps> = ({ file, fileSrc }) => {
	const [fileSize, setFileSize] = useState<string | null>(null);

	useEffect(() => {
		if (file.size < 1000000) {
			setFileSize(Math.floor(file.size / 1000) + " KB");
		} else {
			setFileSize(Math.floor(file.size / 1000000) + " MB");
		}
	}, [file.size]);

	const nameArray = file.name.split(".");
	let fileName = nameArray[0];
	const extension = nameArray.pop();
	if (fileName.length > 20) {
		fileName =
			fileName.substring(0, 5) + ".." + fileName.substring(fileName.length - 3, fileName.length);
	}
	const result = fileName + "." + extension;

	const componentState = useContext(FileContext).state.componentState;
	return (
		<div className="relative ">
			<h5 className="text-[12px] mt-1 font-normal break-words dark:text-white">{result}</h5>
			{componentState.showFileSize && (
				<span data-testid="file-size" className="text-[10px] dark:text-white">
					{fileSize}
				</span>
			)}
			{componentState.downloadFile && fileSrc && (
				<a
					className="float-right absolute top-1 right-0 text-gray-500 dark:text-white"
					href={fileSrc}
					target="_blank"
					download
					rel="noreferrer"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
						<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
						<path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
					</svg>
				</a>
			)}
		</div>
	);
};

export default FileFooter;
