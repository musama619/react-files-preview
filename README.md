![react-files-preview](https://github.com/musama619/react-files-preview/blob/main/react-files-preview.png?raw=true)

<div align='center'>


[![Netlify Status](https://api.netlify.com/api/v1/badges/f1c6d960-e969-4396-bdaa-33e245a72bf6/deploy-status)](https://app.netlify.com/sites/react-file-view/deploys)&nbsp;![codeql](https://github.com/musama619/react-files-preview/workflows/CodeQL/badge.svg)&nbsp;[![npm](https://img.shields.io/npm/v/react-files-preview)](https://www.npmjs.com/package/react-files-preview)


</div>

# react-files-preview
A file view component for react.

## Installation 

### npm
```js 
npm i react-files-preview
```
### yarn
```js 
yarn add react-files-preview
```
## [Stackblitz - Check It Live](https://stackblitz.com/edit/vitejs-vite-xjck27?file=src%2FApp.tsx)

## Basic Usage

```js
import { ReactFilesPreview } from 'react-files-preview'
import 'react-files-preview/dist/style.css'  /* import css file*/

function App() {
  return (
    <>
      <ReactFilesPreview />
    </>
  )
}

export default App
```

## Usage with Tailwind CSS
If your project uses Tailwind CSS, you don’t need to import the CSS file directly. Instead, add the following path to the content array in your tailwind.config.js file:
```js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-files-preview/dist/*.js', // Add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Props

| Name | Type  |  Default  | Description |
| ------------ | --------- | ------------ | --------- |
| **`files`** |  File[] | [] | Pass array of file objects for default files   |
|  **`url`** | string  | null  |  Set image by passing image URL |
|  **`downloadFile`** | boolean  | true  | Enables file download |
| **`removeFile`** | boolean  | true  | Show file remove icon on file hover  |
|  **`showFileSize`** | boolean  | true  | Show file size under files  |
|  **`showSliderCount`** | boolean  | true  | Show slides count under file slider  |
|  **`disabled`** | boolean  | false  | If true, prevents user to add files by disabling the component  |
|  **`multiple`** | boolean  | true |  Accepts one or more files |
|  **`accept`** | string  |   | Comma-separated lists of file types. See [MIME Types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)  |
| **`maxFileSize`**  | number  |   |  Maximum allowed file size in bytes *e.g. 1024  x 1024 x 5 == 5MB*  |
|  **`maxFiles`** | number  |   | Maximum files allowed to be added   |
|  **`width`** | string  | basis-11/12   | Tailwind CSS **flex-basis** class https://tailwindcss.com/docs/flex-basis   |
| **`height`**  | string  |  | Tailwind CSS **height** class https://tailwindcss.com/docs/height  |
| **`fileWidth`**  |  string  |  w-44 |  Tailwind CSS **width** class https://tailwindcss.com/docs/width |
| **`fileHeight`**  | string  | h-32 |  Tailwind CSS **height** class https://tailwindcss.com/docs/height |
|  **`getFile`** | func  |   |  Returns all current files  |
| **`onChange`**  | func  |   | Returns selected file(s)  |
| **`onRemove`**  | func  |   | Returns the removed file  |
|  **`onError`** | func  |   | Returns error message as string  |
|  **`onClick`** | func  |   | Returns file on click  |
