import React from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import { BeakerIcon } from '@heroicons/react/24/solid'
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import './style.css'
registerPlugin(FilePondPluginImagePreview, FilePondPluginImageResize, FilePondPluginImageTransform);

const UploadFile = ({ onUpload }) => {
  const handleUpload = (files) => {
    // processing upload
    // const uploadedFile = files[0];
    // const formData = new FormData();
    // formData.append('file', uploadedFile.file);

    // fetch('http://localhost:8000/upload', {
    //   method: 'POST',
    //   body: formData
    // })
    // .then(response => response.json())
    // .then(data => {
    //   onUpload(data.url); // panggil callback onUpload dengan URL gambar yang diunggah
    // })
    // .catch(error => {
    //   console.error(error);
    // });
  }

  return (
    <div>
      <FilePond
        allowMultiple={false}
        // server={{
        //   process: {
        //     url: 'http://localhost:8000/upload' // URL endpoint API upload Anda
        //   }
        // }}
        allowProcess={false} 
        onprocessfiles={handleUpload}
        labelIdle='Drag and drop file ke sini atau <br/> <span class="btn btn-primary">Unggah</span>'
        imageResizeTargetSize='205x273'
        imageResizeMode='contain'
        imageResizeUpscale={false}
        plugins={[
          FilePondPluginImagePreview,
          FilePondPluginImageResize,
          FilePondPluginImageTransform
        ]}
        imageTransformMinZoom={0.1}
        imageTransformMaxZoom={5}
        imageTransformZoomStep={0.01}
      />
    </div>
  );
};

export default UploadFile;