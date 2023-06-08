import ReactDOM from 'react-dom/client'
import ReactFileView from './ReactFileView/ReactFileView.tsx'
import './css/index.css'
import { Provider } from 'react-redux'
import store from '../store.ts'
import ImageSlider from './ReactFileView/ImageSlider.js'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ImageSlider />
    <ReactFileView url={null} files={[]} />
  </Provider>
)
