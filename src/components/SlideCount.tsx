import { useContext } from "react";
import { FileContext } from "../context/FileContext";
const SlideCount = () => {
	const fileData = useContext(FileContext).state.fileData;
	const fileState = useContext(FileContext).state.fileState;

	return (
		<div
			id="slider-count"
			className="rfp-absolute rfp-bottom-5 rfp-right-0 rfp-left-0 rfp-flex rfp-items-center rfp-justify-center rfp-z-50"
		>
			{fileState?.index !== null && (
				<div className="rfp-text-white rfp-text-1xl">{`${fileState.index + 1} of ${
					fileData?.length
				}`}</div>
			)}
		</div>
	);
};

export default SlideCount;
