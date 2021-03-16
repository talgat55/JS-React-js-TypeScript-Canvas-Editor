import React, {useState} from 'react';
import {Stage, Layer,Image, Text} from "react-konva";
import './App.css';
const App = () => {
    const [stateImage , setStateImage] = useState<CanvasImageSource | null | undefined>(null);
    const  handlerAddImage =(e: React.ChangeEvent<HTMLInputElement>)=>{
        let input = e.target;
        if (input?.files?.length) {
            let reader = new FileReader();
            reader.onload = async (event: any) => {
                if(event !==undefined){
                    let imageObj = new window.Image();
                    imageObj.onload = function () {
                        console.log(imageObj)
                        setStateImage(imageObj);
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
