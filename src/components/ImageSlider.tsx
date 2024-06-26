import SlideCount from "./SlideCount";
import { filePreviewStyle } from "./FilePreviewStyle";
import { FileContext } from "../context/FileContext";
import { useContext } from "react";

const ImageSlider = () => {
	const file = useContext(FileContext).state.fileState;
	const componentState = useContext(FileContext).state.componentState;
	const previewStyle = filePreviewStyle.filter((item) => item.type === file.type);
	const { dispatch } = useContext(FileContext);
	const hideZoom = () => {
		if (file.fileSrc) {
			URL.revokeObjectURL(file.fileSrc);
		}
		dispatch({
			type: "STORE_FILE_STATE",
			payload: {
				zoom: false,
				fileSrc: null,
				index: 0,
				isImage: false,
				fileName: null,
				type: null,
				size: 0,
			},
		});
	};

	const nextFile = () => {
		dispatch({ type: "GET_NEXT_FILE" });
	};

	const prevFile = () => {
		dispatch({ type: "GET_PREV_FILE" });
	};

	const toggleFullScreen = () => {
		const element = document.documentElement;
		if (!document.fullscreenElement) {
			if (element.requestFullscreen) {
				element.requestFullscreen();
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			}
		}
	};

	if (file.zoom) {
		return (
			<div>
				<div
					id="slider"
					className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-80 z-20"
				>
					<div
						id="slider-header"
						className="absolute top-0 left-0 right-0 flex justify-between items-center p-2 shadow-md shadow-gray-950 bg-black bg-opacity-80"
					>
						<span className="text-white flex-1 ml-14 max-sm:ml-1">{file.fileName}</span>
						<button
							className="text-white text-sm flex items-center mr-4  max-sm:mr-1 hover:bg-white hover:text-black rounded-lg pl-2 pr-2 pt-1 pb-1"
							onClick={toggleFullScreen}
							aria-label="toggle-fullscreen"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								className="h-4 stroke-2"
								viewBox="0 0 16 16"
							>
								<path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z" />
							</svg>
						</button>
						{file.fileSrc && componentState.downloadFile && (
							<a
								href={file.fileSrc}
								target="_blank"
								rel="noreferrer"
								download={file?.fileName}
								className="text-white text-sm flex items-center mr-4 max-sm:mr-1 hover:bg-white hover:text-black rounded-lg pl-2 pr-2 pt-1 pb-1"
							>
								<svg
									fill="none"
									stroke="currentColor"
									className="mr-1 h-4 stroke-2"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
									></path>
								</svg>
								Download
							</a>
						)}
						<button
							className="text-white text-sm flex items-center mr-2 max-sm:mr-0 hover:bg-white hover:text-black rounded-lg pl-2 pr-2 pt-1 pb-1"
							onClick={hideZoom}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="mr-1 w-4 h-4"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
							Close
						</button>
					</div>
					<button
						id="slider-prev-button"
						className="absolute top-1/2 left-1 ml-2 p-1 max-sm:top-3/4 transform -translate-y-1/2 z-20 text-white rounded-full hover:bg-white hover:text-black"
						onClick={prevFile}
						data-testid="prev-file"
					>
						<svg
							fill="none"
							className="h-10 w-10 stroke-white transform rotate-180 stroke-2 hover:stroke-black"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M8.25 4.5l7.5 7.5-7.5 7.5"
							></path>
						</svg>
					</button>
					<div
						id="file-slider"
						data-testid="image-slider"
						className={`${componentState.rounded && `rounded-lg`
							} relative w-[130vh] max-sm:w-96 max-md:w-[75vh] h-[78vh] max-sm:h-52 max-md:h-80   bg-slate-400 overflow-hidden transition-all delay-750 ease-in`}
					>
						{file.isImage ? (
							file.fileSrc && (
								<img className="object-fit w-full h-full " src={file.fileSrc} alt="Zoomed Image" />
							)
						) : (
							<span className="flex w-full h-full items-center justify-center text-4xl">
								<span
									className={`${previewStyle.length > 0 ? previewStyle[0].color : "bg-slate-400"
										} rounded flex justify-center  w-48 h-48 items-center`}
								>
									{previewStyle.length > 0 ? (
										previewStyle[0].icon
									) : (
										<svg
											data-testid="default-icon"
											xmlns="http://www.w3.org/2000/svg"
											className="h-10 w-40 text-4xl"
											viewBox="0 0 16 16"
										>
											<path d="M7 4.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm-.861 1.542 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V7.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V7s1.54-1.274 1.639-1.208zM5 9a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z" />
											<path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
										</svg>
									)}
								</span>
							</span>
						)}
					</div>
					<button
						id="slider-next-button"
						className="absolute top-1/2 mr-2 p-1 right-1 max-sm:top-3/4  transform -translate-y-1/2 text-white rounded-full hover:bg-white hover:text-black"
						onClick={nextFile}
						data-testid="next-file"
					>
						<svg
							fill="none"
							className=" stroke-white h-10 w-10 stroke-2 hover:stroke-black"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M8.25 4.5l7.5 7.5-7.5 7.5"
							></path>
						</svg>
					</button>
					{componentState.showSliderCount ? <SlideCount /> : <></>}
				</div>
			</div>
		);
	}
	return null;
};

export default ImageSlider;
