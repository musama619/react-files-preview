import { useSelector } from "react-redux";

const SlideCount = () => {
    const fileData = useSelector(state => state.file.fileData)
    const fileState = useSelector(state => state.file.fileState)
    return (
        <div className="h-24 absolute bottom-5 right-0 left-0 flex items-center justify-center z-40">
            <div className="text-white z-40 self-end top-8 text-1xl">{`${fileState.index + 1} of ${fileData?.length}`}</div>
        </div>
    );
}

export default SlideCount;