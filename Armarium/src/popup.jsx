import { useState } from "react"
import {supabase} from "./supabase-js"
import "./popupcss.css"


function PopUp(props){
    const submitbuttfun=props.onclose
    const cancelb=props.oncancel
    let srcin= "https://www.shutterstock.com/image-vector/tee-t-shirt-clothing-plain-260nw-1969378285.jpg"
    /*const [srcin, srcInFun]= useState("")*/
    const [titlein,setTitleFun] = useState("")

    /*function inputboxfun(event){
        srcInFun(event.target.value)
    }*/
    function inputboxfuntit(event){
        setTitleFun(event.target.value)
    }
    function submitb(){
        submitbuttfun(srcin,titlein)
    }
    /*const handleImage = (e) => {            
        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            localStorage.setItem("myImage", reader.result);
        };

        reader.readAsDataURL(file);
    };*/
    const handleImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const filePath = `${Date.now()}-${file.name}`;

        const { error: uploadError } = await supabase.storage
            .from('clothing-images')
            .upload(filePath, file);

        if (uploadError) {
            console.error('Upload failed:', uploadError.message);
            return;
        }

         // save the reference in the database
        const { error: insertError } = await supabase
            .from('clothes')
            .insert({ name: file.name, image_path: filePath });

        if (insertError) {
            console.error('DB insert failed:', insertError.message);
         }
    };

    const image = localStorage.getItem("myImage")

    srcin=image

    return(
        <div className="pop">
            <div>
                <p className="popuphead">Add the cloth</p>
            </div>
            {/*<div className="textandbox">
                <label className="textbeforebox">Enter src of the image:</label>
                <input type="text" value={srcin} onChange={inputboxfun} className="inputbox" placeholder="src of the image"></input>
            </div>*/}
            <div className="textandbox">
                <label className="textbeforebox">Select image:</label>
                <input type="file" accept="image/*" onChange={handleImage} ></input>
            </div>
            <div className="textandbox">
                <label className="textbeforebox">Enter title of the cloth: </label>
                <input type="text" value={titlein} onChange={inputboxfuntit} className="inputbox" placeholder="title of the image"></input>
                
            </div>
            <div>
                <button onClick={submitb}>submit</button>
                <button onClick={cancelb}>Cancel</button>
            </div>
        </div>
    )
}

export default PopUp