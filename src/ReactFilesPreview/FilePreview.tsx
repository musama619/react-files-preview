import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { storeFileState } from "../redux/fileSlice";
import FileFooter from "./FileFooter";
import { BsFileMedical } from "react-icons/bs";
import { FilePreviewProps } from "./types";
import { filePreviewStyle } from "./FilePreviewStyle";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const imageFileTypes = ["image/jpeg", "image/jpg", "image/png"];

const FilePreview: React.FC<FilePreviewProps> = ({ file, index }) => {
	const [fileSrc, setFileSrc] = useState<string | null>(null);
	useEffect(() => {
		const fileUrl = URL.createObjectURL(file);
		setFileSrc(fileUrl);
	}, [file]);

	const previewStyle = filePreviewStyle.filter((item) => item.type == file.type);
	const componentState = useSelector((state: RootState) => state.file.componentState);
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
				data-testid="file-preview"
				onClick={() => setZoom()}
				className={`${componentState.rounded && "rounded-lg"} border-solid border-slate-200 hover:shadow-lg  shadow-md hover:cursor-pointer`}
			>
				{imageFileTypes.includes(file.type) ? (
					fileSrc && <img data-testid="image-preview" src={fileSrc} className={`${componentState.fileHeight} ${componentState.fileWidth} object-fill scale-[0.9]`}></img>
				) : (
					<div data-testid="file-icon-preview" className={`${componentState.fileHeight} ${componentState.fileWidth} flex flex-col justify-center content-center items-center`}>
						<span
							className={`${previewStyle.length > 0 ? previewStyle[0].color : "bg-slate-400"} 
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
			<div className="h-5 w-44">{fileSrc && <FileFooter file={file} fileSrc={fileSrc} />}</div>
		</>
	);
};

export default FilePreview;