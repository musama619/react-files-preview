# react-files-preview

![react-files-preview](https://github.com/musama619/react-files-preview/blob/main/react-files-preview.png?raw=true)

<p align="center">
  <a href="https://www.npmjs.com/package/react-files-preview">
    <img src="https://img.shields.io/npm/v/react-files-preview.svg" alt="NPM Version" />
  </a>
  <a href="https://www.npmjs.com/package/react-files-preview">
    <img src="https://img.shields.io/npm/dm/react-files-preview.svg" alt="NPM Downloads" />
  </a>
  <a href="https://github.com/musama619/react-files-preview/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/react-files-preview.svg" alt="License" />
  </a>
  <a href="https://github.com/musama619/react-files-preview/actions/workflows/CodeQL.yml">
    <img src="https://github.com/musama619/react-files-preview/workflows/CodeQL/badge.svg" alt="CodeQL" />
  </a>
</p>

A versatile React component to display and manage file previews, supporting various customization options.

## 📋 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Basic Usage](#-basic-usage)
- [Live Demo](#-live-demo)
- [Configuration Options](#️-configuration-options)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- 🖼️ **Visual File Representation:** Displays previews for various image file types.
- ✏️ **Integrated Image Editing:** Allows users to edit images using the features of `react-photo-editor` (brightness, contrast, rotate, flip, draw, etc.).
- 📤 **Drag and Drop Support:** Allows users to easily add files by dragging and dropping.
- 👆 **Interactive Image Slider**: Navigate through images with intuitive swiping gestures using mouse or touch.
- 🖱️ **Click to Browse:** Enables file selection through a standard file input dialog.
- 🗑️ **Remove Files:** Option to display a remove icon for individual files.
- ⬇️ **Download Files:** Functionality to enable downloading of displayed files.
- 🔢 **Slider Indicator:** Shows the dots or current slide number and total count for image sliders.
- 📏 **File Size Display:** Option to show the size of each file.
- ⚙️ **Customizable Styling:** Offers props for adjusting width, height, and rounded corners using Tailwind CSS classes.
- 🚫 **Disable Input:** Option to disable file selection.
- 📄 **Accept Specific Types:** Control which file types are accepted.
- 🔢 **Maximum File Limits:** Set constraints on the number and size of files.
- 🔄 **Controlled Component:** Accepts an array of `files` as a prop for controlled behavior.
- 👂 **Event Callbacks:** Provides callbacks for `onChange`, `onRemove`, `onError`, `onClick`, and `onDrop`.

## 📦 Installation

```bash
# Using npm
npm install react-files-preview

# Using yarn
yarn add react-files-preview

```

## 🚀 Basic Usage

```jsx
import React, { useState } from "react";
import { ReactFilesPreview } from "./components/ReactFilesPreview";

function App() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    console.log("Selected files:", newFiles);
    console.log("All files:", [...files, ...newFiles]);
  };

  const handleFileRemove = (removedFile: File) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== removedFile));
    console.log("Removed file:", removedFile);
  };

  return (
    <div>
      <ReactFilesPreview
        files={files}
        onChange={handleFileChange}
        onRemove={handleFileRemove}
        allowEditing
        multiple
      />
    </div>
  );
}

export default App;
```

## 📱 Live Demo

See it in action on [Stackblitz](https://stackblitz.com/edit/vitejs-vite-xjck27?file=src%2FApp.tsx)

## Props

| Name                  | Type    | Default        | Description                                                                                                                                     |
| --------------------- | ------- | ---------------| ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **`files`**           | File[]  | []             | Pass array of file objects for default files                                                                                                    |
| **`url`**             | string  | null           | Set image by passing image URL                                                                                                                  |
| **`downloadFile`**    | boolean | true           | Enables file download                                                                                                                           |
| **`removeFile`**      | boolean | true           | Show file remove icon on file hover                                                                                                             |
| **`showFileSize`**    | boolean | true           | Show file size under files                                                                                                                      |
| **`sliderIndicatorType`**  | string  | "dots"    | Slide indicator types `"dots"` \| `"count"` \| `"none"` | `"dots"`                                                                                 |
| **`disabled`**        | boolean | false          | If true, prevents user to add files by disabling the component                                                                                  |
| **`multiple`**        | boolean | true           | Accepts one or more files                                                                                                                       |
| **`accept`**          | string  |                | Comma-separated lists of file types. See [MIME Types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) |
| **`maxFileSize`**     | number  |                | Maximum allowed file size in bytes _e.g. 1024 x 1024 x 5 == 5MB_                                                                                |
| **`maxFiles`**        | number  |                | Maximum files allowed to be added                                                                                                               |
| **`width`**           | string  | rfp-basis-11/12| Tailwind CSS **flex-basis** class https://tailwindcss.com/docs/flex-basis                                                                       |
| **`height`**          | string  |                | Tailwind CSS **height** class https://tailwindcss.com/docs/height                                                                               |
| **`fileWidth`**       | string  | 11rem          | CSS **width** class                                                                                                                             |
| **`fileHeight`**      | string  | 8rem           | CSS **height** class                                                                                                                            |
| **`getFile`**         | func    |                | Returns all current files                                                                                                                       |
| **`onChange`**        | func    |                | Returns selected file(s)                                                                                                                        |
| **`onRemove`**        | func    |                | Returns the removed file                                                                                                                        |
| **`onError`**         | func    |                | Returns error message as string                                                                                                                 |
| **`onClick`**         | func    |                | Returns file on click                                                                                                                           |

## 🤝 Contributing

Contributions to `react-files-preview` are welcome! If you have any issues, feature requests, or improvements, please open an issue or submit a pull request on the [GitHub repository](https://github.com/musama619/react-files-preview).

### How to Contribute

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

### Reporting Issues

When reporting issues, please provide:

- A clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (browser, OS, etc.)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/musama619/react-files-preview/blob/main/LICENSE) file for details.
