import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNextFile, getPrevFile, storeFileState } from "./redux/fileSlice";
import { MdClose, MdDownload, MdFilePresent, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import SlideCount from "./SlideCount";
import { BsFileEarmarkText, BsFilePdfFill } from "react-icons/bs";

const ZoomImage = () => {
    const dispatch = useDispatch();
    const file = useSelector((state) => state.file.fileState);

    const hideZoom = () => {
        dispatch(storeFileState({
            zoom: false,
            fileSrc: null,
            index: null,
            isImage: false,
            fileName: null,
            type: null
        }));
    };

    const nextFile = () => {
        dispatch(getNextFile());
    };

    const prevFile = () => {
        dispatch(getPrevFile());
    };

    if (file.zoom) {
        return (
            <>
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-80 z-20">
                    <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-2 shadow-md shadow-gray-950 bg-black bg-opacity-80">
                        <span className="text-white flex-1 ml-14">{file.fileName}</span>
                        <button className="text-white text-sm flex items-center mr-4 hover:bg-white hover:text-black rounded-lg  pl-2 pr-2 pt-1 pb-1">
                            <MdDownload className="text-lg mt-1 font-extralight" />
                            Download
                        </button>
                        <button className="text-white text-sm flex items-center mr-2 hover:bg-white hover:text-black rounded-lg pl-2 pr-2 pt-1 pb-1" onClick={hideZoom}>
                            <MdClose className="text-lg mt-1 font-extralight" />
                            Close
                        </button>
                    </div>
                    <button className="absolute top-1/2 left-1 transform -translate-y-1/2 text-white rounded-full hover:bg-white hover:text-black text-5xl" onClick={prevFile}>
                        <MdOutlineKeyboardArrowLeft />
                    </button>
                    <div className="relative w-[130vh] max-sm:w-96 max-md:w-[75vh] h-[78vh] max-sm:h-52 max-md:h-80  rounded-lg bg-slate-400 overflow-hidden">
                        {file.isImage ? (
                            <img className="object-fit w-full h-full" src={file.fileSrc} alt="Zoomed Image" />
                        ) : (
                            <span className="flex w-full h-full items-center justify-center text-4xl">
                                {/* <MdFilePresent />
                                {file.fileName} */}
                                <span className={`${file.type == "application/pdf" ? "bg-red-500" : "bg-slate-500"} 
                        rounded flex justify-center  w-48 h-48 items-center`}>
                                    {file.type == "application/pdf" ? <BsFilePdfFill className="text-white text-4xl" /> : <BsFileEarmarkText className="text-white text-4xl" />}
                                </span>
                            </span>
                        )}
                    </div>
                    <button className="absolute top-1/2 right-1 transform -translate-y-1/2 text-white rounded-full hover:bg-white hover:text-black text-5xl" onClick={nextFile}>
                        <MdOutlineKeyboardArrowRight />
                    </button>
                </div>
                <SlideCount />
            </>
        );
    }
    return null;
};

export default ZoomImage;
