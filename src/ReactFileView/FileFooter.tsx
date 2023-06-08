import { MdDownload } from "react-icons/md";
import { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { FileFooterProps } from "./types";

const FileFooter: React.FC<FileFooterProps>=({ file, fileSrc }) => {
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

	return (
		<div className="relative ">
			<h5 className="text-[12px] mt-1 font-normal break-words">{result}</h5>
			<h5 className="text-[10px]">{fileSize}</h5>
			<a
				className="float-right absolute top-1 right-0 text-gray-500"
				href={fileSrc!}
				target="_blank"
				rel="noreferrer"
			>
				<MdDownload />
			</a>
		</div>
	);
};

export default FileFooter;

// FileFooter.propTypes = {
// 	file: PropTypes.instanceOf(File),
// 	fileSrc: PropTypes.string,
// };
