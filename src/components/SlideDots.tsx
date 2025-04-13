import { useContext } from "react";
import { FileContext } from "../context/FileContext";

const SlideDots = () => {
    const { state, dispatch } = useContext(FileContext);
    const { fileData, fileState } = state;
    const imageFileTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/tiff"];

    const handleDotClick = (index: number) => {
        dispatch({
            type: "STORE_FILE_STATE",
            payload: {
                ...fileState,
                index,
                fileSrc: URL.createObjectURL(fileData[index]),
                isImage: imageFileTypes.includes(fileData[index].type),
                fileName: fileData[index].name,
                type: fileData[index].type,
                size: fileData[index].size,
            },
        });
    };

    return (
        <div className="rfp-absolute rfp-bottom-5 rfp-right-0 rfp-left-0 rfp-flex rfp-items-center rfp-justify-center rfp-gap-2 rfp-mt-2">
            {fileData?.map((_, index) => (
                <div
                    key={index}
                    className={`rfp-w-2 rfp-h-2 rfp-rounded-full ${
                        fileState?.index === index ? "rfp-bg-white" : "rfp-bg-gray-500"
                    }`}
                    onClick={() => handleDotClick(index)}
                    style={{ cursor: "pointer" }}
                ></div>
            ))}
        </div>
    );
};

export default SlideDots;