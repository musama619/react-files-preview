import { useDispatch, useSelector } from "react-redux";
import { getNextFile, getPrevFile, storeFileState } from "./redux/fileSlice";

const ZoomImage = () => {

    const dispatcher = useDispatch();
    const file = useSelector(state => state.file.fileState)

    const hideZoom = () => {
        dispatcher(storeFileState({ zoom: false, fileSrc: null, index: null, isImage: false, fileName: null }))
    }
    const nextFile = () => {
        dispatcher(getNextFile())
    }
    const prevFile = () => {
        dispatcher(getPrevFile())
    }
    if (file.zoom) {
        return (
            <>
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
                        zIndex: 999,
                        overflow: "auto",
                    }}
                >
                    <button onClick={prevFile}>prev</button>
                    <div style={{
                        position: "relative",
                        minWidth: "auto",
                        minHeight: "auto",
                        maxWidth: "700px",
                        maxHeight: "900px",
                        border: "12px solid black",
                        borderRadius: "5px"
                    }}>
                        <button
                            onClick={hideZoom}
                            style={{
                                position: "absolute",
                                top: -20,
                                right: -15,
                                zIndex: 1,
                            }}
                        >
                            X
                        </button>

                        {file.isImage ?
                            <img
                                src={file.fileSrc}
                                alt="Zoomed Image"
                                style={{ maxWidth: "100%", maxHeight: "100%" }}
                            /> :
                            <h1>{file.fileName}</h1>
                        }
                    </div>
                    <button onClick={nextFile} >next</button>
                </div >
            </>
        );
    }
    return <></>
}

export default ZoomImage;