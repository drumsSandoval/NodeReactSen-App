import React, { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import Api from "../config/axios";
import appContext from "../context/app";

const Dropzone = () => {
  const AppContext = useContext(appContext);
  const { _showAlert, _uploadFile, _createLink, fetching } = AppContext;

  const onDropAccepted = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    _uploadFile(formData, acceptedFiles[0].path);
  }, []);

  const onDropRejected = () => {
    _showAlert("No se pudo subir el archivo el limite es 1MB");
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({ onDropAccepted, onDropRejected });

  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
      {acceptedFiles.length > 0 ? (
        <div className="mt-10 w-full">
          <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
          <ul>
            {acceptedFiles.map((file) => (
              <li
                key={file.lastModified}
                className="bg-white flex-1 p-3 mb-4 shadow-lg rounded"
              >
                <p className="font-bold text-xl">{file.path}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / Math.pow(1024, 2)).toFixed(2)} MB
                </p>
              </li>
            ))}
          </ul>
          {fetching ? (
            <p className="my-10 text-center text-gray-600">
              Subiendo Archivo...
            </p>
          ) : (
            <button
              type="button"
              className="bg-red-500 w-full py-3 rounded-lg text-white my-10 hover:bg-red-700"
              onClick={_createLink}
            >
              Crear Enlace
            </button>
          )}
        </div>
      ) : (
        <div {...getRootProps({ className: "dropzone w-full py-32" })}>
          <input className="h-100" {...getInputProps()} />

          {isDragActive ? (
            <p className="text-2xl text-center text-gray-600">
              Suelta el Archivo
            </p>
          ) : (
            <div className="text-center">
              <p className="text-2xl text-center text-gray-600 ">
                Selecciona un archivo y arrastralo aqui
              </p>
              <button
                className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800  "
                type="button"
              >
                Selecciona archivos para subir
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropzone;
