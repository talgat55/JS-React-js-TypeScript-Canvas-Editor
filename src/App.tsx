import React, {useState} from 'react';
import {Stage, Layer, Image, Text} from "react-konva";
import './App.css';

interface ISizesImageElement {
    width: number,
    height: number,
}

const App = () => {
    const [stateImage, setStateImage] = useState<CanvasImageSource | null | undefined>(null);
    const [sizesImage, setizesImage] = useState<ISizesImageElement>({
        width: 0,
        height: 0
    });
    const handlerAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target;
        if (input?.files?.length) {
            let reader = new FileReader();
            reader.onload = async (event: any) => {
                if (event !== undefined) {
                    let imageObj = new window.Image();
                    imageObj.onload = function () {
                        setStateImage(imageObj);
                        setizesImage(
                            {
                                width: imageObj.width,
                                height: imageObj.height,
                            }
                        )
                    };
                    imageObj.src = event?.target?.result;
                }
            };
            reader.readAsDataURL(input.files[0]);
        }
    }
    return (
        <div className="app">
            <Stage width={500} height={400}>
                <Layer>
                    {
                        stateImage !== null ?
                            <Image
                                image={stateImage}
                                cropWidth={sizesImage.width}
                                cropHeight={sizesImage.height}
                                width={500}
                                height={400}
                            />
                            :
                            null
                    }
                    <Text text="Try click on rect"/>
                </Layer>
            </Stage>

            <input
                type="file"
                name="images[]"
                accept="image/jpeg,image/png,image/gif"
                onChange={handlerAddImage}/>
        </div>
    );
}

export default App;
