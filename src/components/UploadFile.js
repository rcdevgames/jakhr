import React, { useEffect } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import "./style.css";
registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageTransform
);

const UploadFile = ({ onImageUpload, file }) => {
  // const [file, setFile] = useState(null);

  const handleFileLoad = (file) => {
    try {
      const reader = new FileReader();

      // console.log(file);
      // if(file){
      reader.onloadend = () => {
        const base64String = reader.result;
        console.log(base64String);
        onImageUpload(base64String);
      };
      reader.readAsDataURL(file);
    } catch (error) {}
    // }
  };
  return (
    <div>
      <FilePond
        // server={serverEndpoint}
        files={file ? [file] : []}
        onupdatefiles={(fileItems) => {
          const selectedFile =
            fileItems && fileItems.length > 0 ? fileItems[0].file : null;
          handleFileLoad(selectedFile);
        }}
      />
    </div>
  );
};

export default UploadFile;
