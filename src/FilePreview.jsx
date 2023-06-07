import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { storeFileState } from "./redux/fileSlice";
import FileFooter from "./FileFooter";
import { BsFileEarmarkText, BsFileMedical, BsFilePdfFill, BsFiletypeCsv, BsFiletypeDoc, BsFiletypeDocx, BsFiletypeMp3, BsFiletypeMp4, BsFiletypeXls, BsFiletypeXlsx } from "react-icons/bs";
import PropTypes from "prop-types";

const imageFileTypes = ["image/jpeg", "image/jpg", "image/png"];
const fileIcons = [
	{
		type: "application/pdf",
		icon: <BsFilePdfFill className="text-white text-4xl" />,
		color: "bg-red-500"
	},
	{
		type: "text/csv",
		icon: <BsFiletypeCsv className="text-white text-4xl" />,
		color: "bg-emerald-600"
	},
	{
		type: "text/plain",
		icon: <BsFileEarmarkText className="text-white text-4xl" />,
		color: "bg-slate-500"
	},
	{
		type: "application/msword",
		icon: <BsFiletypeDoc className="text-white text-4xl" />,
		color: "bg-sky-600"
	},
	{
		type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		icon: <BsFiletypeDocx className="text-white text-4xl" />,
		color: "bg-sky-600"
	},
	{
		type: "audio/mpeg",
		icon: <BsFiletypeMp3 className="text-white text-4xl" />,
		color: "bg-cyan-500"
		
	},
	{
		type: "video/mp4",
		icon: <BsFiletypeMp4 className="text-white text-4xl" />,
		color: "bg-violet-500"
	},
	{
		type: "application/vnd.ms-excel",
		icon: <BsFiletypeXls className="text-white text-4xl" />,
		color: "bg-emerald-600"
	},
	{
		type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		icon: <BsFiletypeXlsx className="text-white text-4xl" />,
		color: "bg-emerald-600"
	},
]

const FilePreview = ({ file, index }) => {
	const [fileSrc, setFileSrc] = useState(null);
	useEffect(() => {
		const fileUrl = URL.createObjectURL(file);
		setFileSrc(fileUrl);
	}, [file]);

	const filePreviewStyle = fileIcons.filter(i => i.type == file.type)
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
					<img src={fileSrc} className="object-fill h-32 w-44 scale-[0.9]"></img>
				) : (
					<div className="h-32 w-44 flex flex-col justify-center content-center items-center">
						<span
							className={`${filePreviewStyle.length > 0 ? filePreviewStyle[0].color : "bg-slate-400"
								} 
                        rounded flex w-16 justify-center h-20 items-center`}
						>
							{filePreviewStyle.length > 0 ? filePreviewStyle[0].icon : <BsFileMedical className="text-white text-4xl"/>}
						</span>
					</div>
				)}
			</div>
			<div className="h-5 w-44">
				<FileFooter file={file} fileSrc={fileSrc} />
			</div>
		</>
	);
};

export default FilePreview;

FilePreview.propTypes = {
	file: PropTypes.instanceOf(File),
	index: PropTypes.number,
};
