
[![Netlify Status](https://api.netlify.com/api/v1/badges/f1c6d960-e969-4396-bdaa-33e245a72bf6/deploy-status)](https://app.netlify.com/sites/react-file-view/deploys)&nbsp;[![codecov](https://codecov.io/github/musama619/react-file-view/branch/main/graph/badge.svg?token=iBQkSenXLe)](https://codecov.io/github/musama619/react-file-view)

# react-files-preview
A file view component for react.

## Installation 

### Step: 1
```js 
npm i react-files-preview
```

### Step: 2
[Install Tailwindcss](https://tailwindcss.com/docs/installation)
 ###### (skip this step if you have tailwindcss already installed)

### Step: 3
Because `react-files-preview` uses [Tailwindcss](https://tailwindcss.com), you need to add `"./node_modules/react-files-preview/**/*.{html,ts,js}"` in  `tailwind.config.js` file:


```js
    /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        .....
        + "./node_modules/react-files-preview/**/*.{html,ts,js}" 
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
```
## Usage

```js
import { ReactFilesPreview } from 'react-files-preview'
function App() {
  return (
    <>
      <ReactFilesPreview files={[]} />
    </>
  )
}

export default App
```

[View Demo](https://react-files-preview.netlify.app/)

| Name | Type  |  Default  | Description |
| ------------ | --------- | ------------ | --------- |
| **`files`** |  File[] | [] | array of file objects   |
|  **`url`** | string  | null  |  image url |
|  **`downloadFile`** | boolean  | true  | enables file download |
| **`removeFile`** | boolean  | true  | shows file remove icon on file hover  |
|  **`showFileSize`** | boolean  | true  | shows file size under files  |
|  **`showSliderCount`** | boolean  | true  | shows slides count under file slider  |
|  **`multiple`** | boolean  | true |  accepts one or more files |
|  **`accept`** | string  |   | comma-separated lists of file types. See [MIME Types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)  |
| **`maxFileSize`**  | number  |   |  maximum allowed file size in bytes *e.g. 1024  x 1024 x 5 == 5MB*  |
|  **`maxFiles`** | number  |   |maximum files allowed to be added   |
|  **`width`** | string  | basis-11/12   | tailwind css **flex-basis** class https://tailwindcss.com/docs/flex-basis   |
| **`height`**  | string  |  | tailwind css **height** class https://tailwindcss.com/docs/height  |
| **`fileWidth`**  |  string  |  w-44 |  tailwind css **width** class https://tailwindcss.com/docs/width |
| **`fileHeight`**  | string  | h-32 |  tailwind css **height** class https://tailwindcss.com/docs/height |
|  **`getFile`** | func  |   |  returns all current files  |
| **`onChange`**  | func  |   | returns selected file(s)  |
| **`onRemove`**  | func  |   | returns the removed file  |
|  **`onError`** | func  |   | returns error message as string  |
|  **`onClick`** | func  |   | returns file on click  |