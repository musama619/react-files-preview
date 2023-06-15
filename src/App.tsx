import { ReactFilesPreview } from "./components/ReactFilesPreview";

function App() {

    return (
        <div className="App">
            <ReactFilesPreview files={[]} rounded={false} showFileSize={false} />
        </div>
    );
}

export default App;