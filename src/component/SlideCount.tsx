import { useSelector } from "react-redux";
import { RootState } from "../../store";
const SlideCount = () => {
	const fileData = useSelector((state: RootState) => state.file.fileData);
	const fileState = useSelector((state: RootState) => state.file.fileState);
	return (
		<div className="h-24 absolute bottom-5 right-0 left-0 flex items-center justify-center z-40">
			{fileState?.index !== null && (
				<div className="text-white z-40 self-end top-8 text-1xl">{`${fileState.index + 1} of ${fileData?.length
					}`}</div>
			)}
		</div>
	);
};

export default SlideCount;
