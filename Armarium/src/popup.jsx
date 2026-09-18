import { useState } from "react"
import {supabase} from "./supabase-js"
import "./popupcss.css"


function PopUp(props){
    const submitbuttfun=props.onclose
    const cancelb=props.oncancel
    let srcin= "https://www.shutterstock.com/image-vector/tee-t-shirt-clothing-plain-260nw-1969378285.jpg"
    /*const [srcin, srcInFun]= useState("")*/
    const [titlein,setTitleFun] = useState("")
    const [cloths, setClothes] = useState([])

    const [dbid, setDbid] = useState(null);
    const [dbpath, setDbpath] = useState(null);

    /*function inputboxfun(event){
        srcInFun(event.target.value)
    }*/
    function inputboxfuntit(event){
        setTitleFun(event.target.value)
    }
    function submitb(){
        submitbuttfun(srcin,titlein,dbid,dbpath)
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
            .from('cloth-img')
            .upload(filePath, file);

        if (uploadError) {
            console.error('Upload failed:', uploadError.message);
            return;
        }

         // save the reference in the database
        const { data: insertData,error: insertError } = await supabase
            .from('cloths')
            .insert({ name: file.name, imagepath: filePath });

        if (insertError) {
            console.error('DB insert failed:', insertError.message);
         }
       
        setDbid(insertData[0].id)
        setDbpath(filePath)
    };
   
    

    const fetchClothes = async () => {
        const { data, error } = await supabase
            .from('cloths')
            .select('*');

        if (error) {
            console.error('Fetch failed:', error.message);
            return;
        }

        const withUrls = data.map(item => ({
            ...item,
            imageUrl: supabase.storage.from('cloth-img').getPublicUrl(item.imagepath).data.publicUrl,
        }));

        setClothes(withUrls);
    };
    fetchClothes()
    /*const image = localStorage.getItem("myImage")*/

    /*srcin=cloths.map(item => item.imageUrl);*/
    srcin = cloths[cloths.length - 1]?.imageUrl;

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