import { useContext } from "react";
import { FileContext } from "../context/FileContext";
const SlideCount = () => {

	const fileData = useContext(FileContext).state.fileData;
	const fileState = useContext(FileContext).state.fileState;

	return (
		<div id="slider-count" className="absolute bottom-5 right-0 left-0 flex items-center justify-center z-50">
			{fileState?.index !== null && (
				<div className="text-white text-1xl">{`${fileState.index + 1} of ${fileData?.length
					}`}</div>
			)}
		</div>
	);
};

export default SlideCount;
