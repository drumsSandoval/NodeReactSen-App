import React, { useContext, useEffect } from "react";
import Link from "next/link";

import Dropzone from "../components/Dropzone";
import Layout from "../components/Layout";
import Alert from "../components/Alert";
import authContext from "../context/auth/index";
import appContext from "../context/app";

export default function Index() {
  const { _userAuth } = useContext(authContext);
  const AppContext = useContext(appContext);
  const { fileMessage, url } = AppContext;

  useEffect(() => {
    _userAuth();
  }, []);

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        {url ? (
          <>
            <p className="text-center text-2xl mt-10">
              <span className="font-bold text-red-500 text-3xl uppercase">
                Tu URL es
              </span>{" "}
              {process.env.frontendURL + "/links/" + url}
            </p>
            <button
              type="button"
              className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold mt-10"
              onClick={() =>
                navigator.clipboard.writeText(
                  process.env.frontendURL + "/links/" + url
                )
              }
            >
              Copiar enlace
            </button>
          </>
        ) : (
          <>
            {fileMessage && <Alert msg={fileMessage} />}
            <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
              <Dropzone />
              <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                <h2 className="text-4xl font-sans font-bold text-gray-800 my-4 ">
                  Compartir archivos de forma sencilla y privada
                </h2>
                <p className="text-lg leading-loose">
                  <span className="text-red-500 font-bold">ReactNodeSend</span>{" "}
                  te permite compartir archivos con cifrado de extremo a extremo
                  y un archivo que es eliminado después de ser descargado. Asi
                  que puedes mantener lo que compartes en privado y asegurarte
                  de que tus cosas no permanezcan en linea para siempre.
                </p>
                <Link href="/signup">
                  <a className="text-red-500 font-bold text-lg hover:text-red-700">
                    Crea una cuenta para mayores beneficios
                  </a>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
