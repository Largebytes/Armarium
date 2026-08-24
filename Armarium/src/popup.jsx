import { useState } from "react"
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
    const handleImage = (e) => {            /*this part(uploading image part) is directly copied from chatgpt*/
        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            localStorage.setItem("myImage", reader.result);
        };

        reader.readAsDataURL(file);
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