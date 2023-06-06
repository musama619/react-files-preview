import { useDispatch, useSelector } from "react-redux";
import { getNextFile, getPrevFile, storeFileState } from "./redux/fileSlice";
import {
    MdClose,
    MdDownload,
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import SlideCount from "./SlideCount";

const ZoomImage = () => {
    const dispatcher = useDispatch();
    const file = useSelector((state) => state.file.fileState);

    const hideZoom = () => {
        dispatcher(
            storeFileState({
                zoom: false,
                fileSrc: null,
                index: null,
                isImage: false,
                fileName: null,
            })
        );
    };
    const nextFile = () => {
        dispatcher(getNextFile());
    };
    const prevFile = () => {
        dispatcher(getPrevFile());
    };
    if (file.zoom) {
        return (
            <>
                <div className="flex flex-row  w-full bg-black h-12 shadow-lg shadow-gray-500">
                    <span className="text-white flex-1 flex items-center z-30 ml-14 ">{file.fileName}</span>
                    <button className="text-white text-sm z-30 mr-8 flex justify-center items-center hover:text-blue-400">
                        <span className="mr-1 text-lg mt-1 font-extralight">
                            <MdDownload />
                        </span>
                        Download
                    </button>
                    <button className="text-white text-sm z-30 mr-10 flex justify-center items-center hover:text-stone-400" onClick={hideZoom}>
                        <span className="mr-1 text-lg mt-1 font-extralight">
                            <MdClose />
                        </span>
                        Close
                    </button>
                </div>
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(0, 0, 0, 0.8)",
                        zIndex: 20,
                        overflow: "auto",
                    }}
                >
                    <button
                        onClick={prevFile}
                        className="text-white mr-56 rounded-full hover:bg-white hover:text-black text-5xl"
                    >
                        <MdOutlineKeyboardArrowLeft />
                    </button>

                    <div
                        className=" bg-slate-600 rounded-lg"
                        style={{
                            position: "relative",
                            minWidth: "120vh",
                            minHeight: "80vh",
                            maxWidth: "60vh",
                            maxHeight: "70vh",
                            borderRadius: "5px",
                            overflow: "hidden",
                        }}
                    >
                        {file.isImage ? (
                            <img
                                className="object-fill"
                                src={file.fileSrc}
                                alt="Zoomed Image"
                                style={{
                                    minWidth: "120vh",
                                    minHeight: "80vh",
                                }}
                            />
                        ) : (
                            <h1>{file.fileName}</h1>
                        )}
                    </div>
                    <button
                        onClick={nextFile}
                        className="text-white ml-56  rounded-full hover:bg-white hover:text-black text-5xl"
                    >
                        <MdOutlineKeyboardArrowRight />
                    </button>
                </div>
                <SlideCount />
            </>
        );
    }
    return <></>;
};

export default ZoomImage;