import React, { useState, useRef, ChangeEvent } from "react";
import AvatarEditor, { Editor } from "./ImgEdit";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";

export type Img = {
  url: string;
  errorMessage: string | null;
};
const App = (props: any) => {
  const [profileImg, setProfileImg] = useState<Img>({
    url: "",
    errorMessage: null,
  });

  const [newImage, setNewImage] = useState<string>("");
  const editorRef = useRef<Editor>(null);
  const { errorMessage, url } = profileImg;
  const [open, setOpen] = React.useState(false);

  const onAvatarImgChange = async (e: any) => {
    setOpen(false);
    e.preventDefault();
    let file = e.target.files[0];
    if (!file) return;
    const validExts = ["jpg", "jpeg"];
    const maxFileSize = 5;
    const fileExt = file.name.substring(file.name.lastIndexOf(".") + 1);
    const fileSize = file.size / 1000000;
    if (!validExts.includes(fileExt)) {
      setOpen(true);
      setProfileImg((prevState) => ({
        ...prevState,
        errorMessage: `Exteciones Soportadas(${validExts.join(" , ")})`,
      }));
      return;
    }

    if (fileSize > maxFileSize) {
      setOpen(true);
      setProfileImg((prevState) => ({
        ...prevState,
        errorMessage: `Tamaño de imagen ${maxFileSize}Mb`,
      }));
      return;
    }

    const dataUrl = await getFileDataUrl(file);

    setProfileImg({
      url: dataUrl,
      errorMessage: null,
    });
  };

  const getFileDataUrl = (file: File) => {
    return new Promise<string>((res) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => res(reader.result as string);
    });
  };

  const onAvatarImgCancel = () => {
    setOpen(false);
    setProfileImg({
      errorMessage: null,
      url: "",
    });
  };

  const onCrop = () => {
    if (editorRef && editorRef.current) {
      let url = editorRef.current.getImageScaledToCanvas().toDataURL();
      console.log(url);
      setNewImage(url);
    }
  };
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editorRef.current) {
      let img: Blob;
      const canvasElement = editorRef.current.getImage();
      canvasElement.toBlob((blob) => {
        img = blob!;
        console.log(img);
      }, "image/jpeg");
    }
  };

  return (
    <div className="App">
      {/*       <form className="form" onSubmit={onSubmit} >
       */}{" "}
      <div className="editor">
        <img src={newImage} />
        <AvatarEditor
          ref={editorRef}
          inputId="main"
          errorMessage={errorMessage}
          onCrop={onCrop}
          url={url}
          onChange={onAvatarImgChange}
          onCancel={onAvatarImgCancel}
        />

        <Collapse in={open}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {errorMessage}
          </Alert>
        </Collapse>
      </div>
      {/*     <div className="button">
          <button type="submit">Enviar</button>
        </div> */}
      {/*       </form>
       */}{" "}
    </div>
  );
};

export default App ;
;
