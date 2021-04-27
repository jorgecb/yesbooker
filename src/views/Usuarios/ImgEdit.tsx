import { Slider } from "@material-ui/core";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Editor from "react-avatar-editor";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

import { ReactComponent as Plus } from "../../assets/img/plus.svg";
export { Editor };

interface OwnProps {
  inputId: string;
  url: string;
  ref: React.Ref<Editor>;
  errorMessage: string | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
}
type Props = OwnProps;
const AvatarEditor = React.forwardRef<Editor, Props>((props, ref) => {
  const { inputId, onChange, url, onCancel, errorMessage,  } = props;
  const [rotation, setRotation] = useState<number>(0);
  const [scaleValue, setScaleValue] = useState<number>(1.3);

  const handleChange = (event: any, newValue: number | number[]) => {
    setScaleValue(newValue as number);
  };

  const rotateLeft = () => {
    setRotation((prevState) => prevState - 90);
  };

  const rotateRight = () => {
    setRotation((prevstate) => prevstate + 90);
  };

  const firstMount = useRef(true);
  useEffect(() => {
    firstMount.current = false;
  }, []);

  return (
    <>
      <input key={url} id={inputId} type="file" onChange={onChange} />
      {url ? (
        <Editor
          image={url}
          ref={ref}
          width={200}
          height={200}
          borderRadius={100}
          rotate={rotation}
          scale={scaleValue}
          color={[255, 255, 255, 0.6]}
          crossOrigin="anonymous"
        />
      ) : (
        <>
          <label htmlFor={inputId}>
            <Plus width="50%" height="50%" />
          </label>
        </>
      )}

      {url && (
        <div className="remove-change">
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={rotateLeft}
          >
            Rotar a la Izquierda
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={onCancel}
          >
            Quitar
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={rotateRight}
          >
            Rotar a la derecha
          </Button>
          <Slider
            value={scaleValue}
            onChange={handleChange}
            max={10}
            min={1}
            aria-labelledby="continuous-slider"
          />

          <label htmlFor={inputId}>Cambiar</label>
        </div>
      )}
    </>
  );
});

export default AvatarEditor;