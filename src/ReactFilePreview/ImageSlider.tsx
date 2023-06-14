import { useDispatch, useSelector } from "react-redux";
import { getNextFile, getPrevFile, storeFileState } from "../redux/fileSlice";
import {
	MdClose,
	MdDownload,
	MdOutlineKeyboardArrowLeft,
	MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import SlideCount from "./SlideCount";
import { BsFileMedical } from "react-icons/bs";
import { RootState } from "../../store";
import { filePreviewStyle } from "./FilePreviewStyle";

const ImageSlider = () => {
	const dispatch = useDispatch();
	const file = useSelector((state: RootState) => state.file.fileState);
	const componentState = useSelector((state: RootState) => state.file.componentState);
	const previewStyle = filePreviewStyle.filter((item) => item.type == file.type);

	const hideZoom = () => {
		dispatch(
			storeFileState({
				zoom: false,
				fileSrc: null,
				index: 0,
				isImage: false,
				fileName: null,
				type: null,
				size: 0,
			})
		);
	};

	const nextFile = () => {
		dispatch(getNextFile());
	};

	const prevFile = () => {
		dispatch(getPrevFile());
	};

	if (file.zoom) {
		return (
			<div>
				<div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-80 z-20">
					<div className="absolute top-0 left-0 right-0 flex justify-between items-center p-2 shadow-md shadow-gray-950 bg-black bg-opacity-80">
						<span className="text-white flex-1 ml-14">{file.fileName}</span>
						<button className="text-white text-sm flex items-center mr-4 hover:bg-white hover:text-black rounded-lg  pl-2 pr-2 pt-1 pb-1">
							<MdDownload className="text-lg mt-1 font-extralight" />
							Download
						</button>
						<button
							className="text-white text-sm flex items-center mr-2 hover:bg-white hover:text-black rounded-lg pl-2 pr-2 pt-1 pb-1"
							onClick={hideZoom}
						>
							<MdClose className="text-lg mt-1 font-extralight" />
							Close
						</button>
					</div>
					<button
						className="absolute top-1/2 left-1 transform -translate-y-1/2 text-white rounded-full hover:bg-white hover:text-black text-5xl"
						onClick={prevFile}
						data-testid="prev-file"
					>
						<MdOutlineKeyboardArrowLeft />
					</button>
					<div
						data-testid="image-slider"
						className={`${componentState.rounded && `rounded-lg`} relative w-[130vh] max-sm:w-96 max-md:w-[75vh] h-[78vh] max-sm:h-52 max-md:h-80   bg-slate-400 overflow-hidden transition-all delay-750 ease-in`}
					>
						{file.isImage ? (
							file.fileSrc && <img className="object-fit w-full h-full " src={file.fileSrc} alt="Zoomed Image" />
						) : (
							<span className="flex w-full h-full items-center justify-center text-4xl">
								<span
									className={`${
										previewStyle.length > 0 ? previewStyle[0].color : "bg-slate-400"
									} rounded flex justify-center  w-48 h-48 items-center`}
								>
									{previewStyle.length > 0 ? (
										previewStyle[0].icon
									) : (
										<BsFileMedical data-testid="default-icon" className="text-white text-4xl" />
									)}
								</span>
							</span>
						)}
					</div>
					<button
						className="absolute top-1/2 right-1 transform -translate-y-1/2 text-white rounded-full hover:bg-white hover:text-black text-5xl"
						onClick={nextFile}
						data-testid="next-file"
					>
						<MdOutlineKeyboardArrowRight />
					</button>
				</div>
				{componentState.showSliderCount ? <SlideCount /> : <></>}
			</div>
		);
	}
	return null;
};

export default ImageSlider;
