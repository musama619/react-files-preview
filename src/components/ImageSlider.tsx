import SlideCount from "./SlideCount";
import { filePreviewStyle } from "./FilePreviewStyle";
import { FileContext } from "../context/FileContext";
import { useContext, useRef, useState, useCallback } from "react";
import SlideDots from "./SlideDots";

const ImageSlider = () => {
	const file = useContext(FileContext).state.fileState;
	const componentState = useContext(FileContext).state.componentState;
	const previewStyle = filePreviewStyle.filter((item) => item.type === file.type);
	const { dispatch } = useContext(FileContext);

	const sliderRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const [pointerDownTime, setPointerDownTime] = useState(0);

	const swipeDistance = 100;
	const swipeSpeed = 50;
	const animationDuration = 10;

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

	const animateSlide = useCallback(
		(direction: "next" | "prev", callback: () => void): void => {
			if (isAnimating || !sliderRef.current) return;

			setIsAnimating(true);
			const distance = direction === "next" ? -window.innerWidth : window.innerWidth;

			sliderRef.current.style.transition = `transform ${animationDuration}ms cubic-bezier(0.1, 0.7, 1.0, 0.1)`;
			sliderRef.current.style.transform = `translateX(${distance}px)`;

			setTimeout(() => {
				callback();
				if (sliderRef.current) {
					sliderRef.current.style.transition = "none";
					sliderRef.current.style.transform = "translateX(0)";
				}
				setTimeout(() => {
					setIsAnimating(false);
				}, 50);
			}, animationDuration);
		},
		[isAnimating],
	);

	const nextFile = useCallback(() => {
		animateSlide("next", () => {
			dispatch({ type: "GET_NEXT_FILE" });
			resetTransform();
		});
	}, [animateSlide, dispatch]);

	const prevFile = useCallback(() => {
		animateSlide("prev", () => {
			dispatch({ type: "GET_PREV_FILE" });
			resetTransform();
		});
	}, [animateSlide, dispatch]);

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

	const resetTransform = () => {
		if (sliderRef.current) {
			sliderRef.current.style.transform = "translateX(0)";
		}
	};

	const handlePointerDown = (e: React.PointerEvent): void => {
		if (isAnimating) return;

		e.preventDefault();
		setStartX(e.clientX);
		setIsDragging(true);
		setPointerDownTime(Date.now());

		if (sliderRef.current) {
			sliderRef.current.style.transition = "none";
			sliderRef.current.setPointerCapture(e.pointerId);
		}
	};

	const handlePointerMove = (e: React.PointerEvent): void => {
		if (!isDragging || isAnimating) return;

		const deltaX = e.clientX - startX;
		const resistance = 3;
		const translateX = deltaX / resistance;

		if (sliderRef.current) {
			sliderRef.current.style.transform = `translateX(${translateX}px)`;
		}
	};
	const handlePointerUp = (e: React.PointerEvent): void => {
		if (!isDragging || isAnimating) return;

		setIsDragging(false);
		const endX = e.clientX;
		const deltaX = endX - startX;
		const deltaTime = Date.now() - pointerDownTime;
		const velocity = Math.abs(deltaX) / deltaTime;

		const isFastSwipe = velocity > swipeSpeed;
		const isFarEnough = Math.abs(deltaX) > swipeDistance;

		if (isFastSwipe || isFarEnough) {
			if (deltaX < 0) {
				nextFile();
			} else {
				prevFile();
			}
		} else {
			if (sliderRef.current) {
				sliderRef.current.style.transition = `transform ${animationDuration}ms ease-out`;
				sliderRef.current.style.transform = "translateX(0)";
			}
		}

		if (sliderRef.current) {
			sliderRef.current.releasePointerCapture(e.pointerId);
		}
	};
	const handlePointerCancel = (e: React.PointerEvent): void => {
		if (isDragging) {
			setIsDragging(false);
			resetTransform();

			if (sliderRef.current) {
				sliderRef.current.releasePointerCapture(e.pointerId);
			}
		}
	};

	if (file.zoom) {
		return (
			<div>
				<div
					id="slider"
					className="rfp-fixed rfp-top-0 rfp-left-0 rfp-right-0 rfp-bottom-0 rfp-flex rfp-items-center rfp-justify-center rfp-bg-black rfp-bg-opacity-80 rfp-z-20"
				>
					<div
						id="slider-header"
						className="rfp-absolute rfp-top-0 rfp-left-0 rfp-right-0 rfp-flex rfp-justify-between rfp-items-center rfp-p-2 rfp-shadow-md rfp-shadow-gray-950 rfp-bg-black rfp-bg-opacity-80"
					>
						<span className="rfp-text-white rfp-flex-1 rfp-ml-2 rfp-max-sm:ml-1">
							{file.fileName}
						</span>
						<button
							className="rfp-text-white rfp-text-sm rfp-flex rfp-items-center rfp-mr-4 rfp-max-sm:mr-1 hover:rfp-bg-white hover:rfp-text-black rfp-rounded-lg rfp-pl-2 rfp-pr-2 rfp-pt-1 rfp-pb-1"
							onClick={toggleFullScreen}
							aria-label="toggle-fullscreen"
							title="Toggle Fullscreen"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								className="rfp-h-4 rfp-stroke-2"
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
								className="rfp-text-white rfp-text-sm rfp-flex rfp-items-center rfp-mr-4 max-sm:rfp-mr-1 hover:rfp-bg-white hover:rfp-text-black rfp-rounded-lg rfp-pl-2 rfp-pr-2 rfp-pt-1 rfp-pb-1"
								title="Download File"
								aria-label="download-file"
							>
								<svg
									fill="none"
									stroke="currentColor"
									className="rfp-mr-1 rfp-h-4 rfp-stroke-2"
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
							className="rfp-text-white rfp-text-sm rfp-flex rfp-items-center rfp-mr-2 max-sm:rfp-mr-0 hover:rfp-bg-white hover:rfp-text-black rfp-rounded-lg rfp-pl-2 rfp-pr-2 rfp-pt-1 rfp-pb-1"
							onClick={hideZoom}
							aria-label="close-slider"
							title="Close Slider"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="rfp-mr-1 rfp-w-4 rfp-h-4"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
							Close
						</button>
					</div>
					<button
						id="slider-prev-button"
						className="rfp-absolute rfp-top-1/2 rfp-left-1 rfp-ml-2 rfp-p-1 rfp-transform -rfp-translate-y-1/2 rfp-z-20 rfp-text-white rfp-rounded-full rfp-max-sm:rfp-top-auto rfp-max-sm:rfp-bottom-4 rfp-max-sm:rfp-left-4"
						onClick={prevFile}
						data-testid="prev-file"
						aria-label="prev-file"
						title="Previous File"
					>
						<svg
							fill="none"
							className="rfp-stroke-gray-300 hover:rfp-stroke-white rfp-h-8 rfp-w-8 rfp-transform rfp-rotate-180 rfp-stroke-2"
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
						id="file-slider-container"
						ref={containerRef}
						className="rfp-relative rfp-w-[90vw] rfp-max-w-[130vh] rfp-h-[80vh] rfp-max-h-[80vh] rfp-overflow-hidden"
					>
						<div
							id="file-slider"
							ref={sliderRef}
							data-testid="image-slider"
							className={`${
								componentState.rounded && `rfp-rounded-lg`
							} rfp-relative rfp-w-full rfp-h-full rfp-overflow-hidden rfp-will-change-transform`}
							onPointerDown={handlePointerDown}
							onPointerMove={handlePointerMove}
							onPointerUp={handlePointerUp}
							onPointerCancel={handlePointerCancel}
							style={{
								cursor: isDragging ? "grabbing" : "grab",
								WebkitUserSelect: "none",
								userSelect: "none",
								touchAction: "none",
							}}
						>
							{file.isImage ? (
								file.fileSrc && (
									<img
										className="rfp-w-full rfp-h-full rfp-object-contain rfp-max-w-full rfp-max-h-full"
										src={file.fileSrc}
										alt="Zoomed Image"
										draggable="false"
									/>
								)
							) : (
								<span className="rfp-flex rfp-w-full rfp-h-full rfp-items-center rfp-justify-center rfp-text-4xl">
									<span
										className={`${
											previewStyle.length > 0 ? previewStyle[0].color : "rfp-bg-slate-400"
										} rfp-rounded rfp-flex rfp-justify-center rfp-w-48 rfp-h-48 rfp-items-center`}
									>
										{previewStyle.length > 0 ? (
											previewStyle[0].icon
										) : (
											<svg
												data-testid="default-icon"
												xmlns="http://www.w3.org/2000/svg"
												className="rfp-h-10 rfp-w-40 rfp-text-4xl"
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
					</div>
					<button
						id="slider-next-button"
						className="rfp-absolute rfp-top-1/2 rfp-mr-2 rfp-p-1 rfp-right-1 rfp-transform -rfp-translate-y-1/2 rfp-rounded-full rfp-max-sm:rfp-top-auto rfp-max-sm:rfp-bottom-4 rfp-max-sm:rfp-right-4 "
						onClick={nextFile}
						data-testid="next-file"
						aria-label="next-file"
						title="Next File"
					>
						<svg
							fill="none"
							className="rfp-stroke-gray-300 hover:rfp-stroke-white rfp-h-8 rfp-w-8 rfp-stroke-2"
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
					{componentState.sliderIndicatorType == 'count' ? <SlideCount /> : <SlideDots />}
					
				</div>
			</div>
		);
	}
	return null;
};

export default ImageSlider;
