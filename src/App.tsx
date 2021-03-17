import React, {useEffect, useState,useRef} from 'react';
import {Stage, Layer, Image} from "react-konva";
import './App.css';

interface ISizesImageElement {
    width: number,
    height: number,
}

const App = () => {
    const stageRef = useRef<any | null>(null);
    const [stateImage, setStateImage] = useState<CanvasImageSource | null | undefined>(null);
    const [sizesImage, seSizesImage] = useState<ISizesImageElement>({
        width: 0,
        height: 0
    });

    useEffect(()=>{
        if(stateImage !==null){

        }
    },[stateImage])

    const handlerChooseEffect = (effect: string) =>{
        if(effect === 'ocean'){
            stageRef?.current.toImage({
                callback(img: HTMLImageElement) {
                    console.log(img)
                    let imageDataFiltered = window?.pixelsJS?.filterImgData(img, "ocean");
                }
            });
        }
    }

    const handlerAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target;
        if (input?.files?.length) {
            let reader = new FileReader();
            reader.onload = async (event: any) => {
                if (event !== undefined) {
                    let imageObj = new window.Image();
                    imageObj.onload = function () {
                        setStateImage(imageObj);
                        seSizesImage(
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
            <div className="main_wrapper">
                <div className="image_block">
                    <Stage
                        ref={stageRef}
                        width={500}
                        height={400}
                    >
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
                        </Layer>
                    </Stage>
                </div>
                <div>
                    <div
                        onClick={()=>{handlerChooseEffect('ocean')}}
                    >
                        ocean
                    </div>
                </div>
            </div>

            <input
                type="file"
                name="images[]"
                accept="image/jpeg,image/png,image/gif"
                onChange={handlerAddImage}/>
        </div>
    );
}

export default App;
