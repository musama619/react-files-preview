import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { storeFileState } from "../redux/fileSlice";
import FileFooter from "./FileFooter";
import {
	BsFileMedical,
} from "react-icons/bs";
import { FilePreviewProps } from "./types";
import { filePreviewStyle } from "./FilePreviewStyle";

const imageFileTypes = ["image/jpeg", "image/jpg", "image/png"];

const FilePreview: React.FC<FilePreviewProps>=({ file, index }) => {
	const [fileSrc, setFileSrc] = useState<string | null>(null);
	useEffect(() => {
		const fileUrl = URL.createObjectURL(file);
		setFileSrc(fileUrl);
	}, [file]);

	const previewStyle = filePreviewStyle.filter((item) => item.type == file.type);
	const dispatcher = useDispatch();

	const setZoom = () => {
		dispatcher(
			storeFileState({
				zoom: true,
				fileSrc: fileSrc,
				index: index,
				isImage: imageFileTypes.includes(file.type),
				fileName: file.name,
				type: file.type,
				size: file.size,
			})
		);
	};

	return (
		<>
			<div
				onClick={() => setZoom()}
				className="border-solid border-slate-200 rounded-lg hover:shadow-lg  shadow-md hover:cursor-pointer"
			>
				{imageFileTypes.includes(file.type) ? (
					<img src={fileSrc!} className="object-fill h-32 w-44 scale-[0.9]"></img>
				) : (
					<div className="h-32 w-44 flex flex-col justify-center content-center items-center">
						<span
							className={`${
								previewStyle.length > 0 ? previewStyle[0].color : "bg-slate-400"
							} 
                        rounded flex w-16 justify-center h-20 items-center`}
						>
							{previewStyle.length > 0 ? (
								previewStyle[0].icon
							) : (
								<BsFileMedical className="text-white text-4xl" />
							)}
						</span>
					</div>
				)}
			</div>
			<div className="h-5 w-44">
				{fileSrc && <FileFooter file={file} fileSrc={fileSrc} />}
			</div>
		</>
	);
};

export default FilePreview;