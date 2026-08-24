import "./body.css"
import "./button.css"
import { useState } from "react"
import { useEffect } from "react"

function Rack(props){
    const imgscr=props.imgscrr
    const cardtext=props.cardtextt

    const [colbool,setColBool] = useState(()=>{
        const savedcol = localStorage.getItem("colL-"+props.id)
        if (savedcol){
            return JSON.parse(savedcol)
        }else{
            return true
        }
    })

    let classname
    let butttext

    if(colbool){
        classname="rackbuttgreen"
        butttext="Clean"
    }
    else{
        classname="rackbuttred"
        butttext="Lanundry"
    }

    function buttclick(){
        setColBool(!colbool)
    }

    const [colbooliron,setColBoolIron] = useState(()=>{
        const savedcolI = localStorage.getItem("colI-"+props.id)
        if (savedcolI){
            return JSON.parse(savedcolI)
        }else{
            return true
        }
    })

    let classnameI
    let butttextI

    if(colbooliron){
        classnameI="rackbuttgreen"
        butttextI="Ironed"
    }
    else{
        classnameI="rackbuttred"
        butttextI="Needs Ironing"
    }

    function buttclickI(){
        setColBoolIron(!colbooliron)
    }
    let rackcol
    if (colbool==false || colbooliron==false){
        rackcol="rackblacked"
    }
    else{
        rackcol="rack"
    }

    useEffect(()=>{
        localStorage.setItem("colL-"+props.id,JSON.stringify(colbool))
    },[colbool,props.id])

    useEffect(()=>{
        localStorage.setItem("colI-"+props.id,JSON.stringify(colbooliron))
    },[colbooliron,props.id])
    function handleDeleteClick() {
        props.onDelete(props.id)
    }

    return(
    <div className={rackcol}>
        <img src={imgscr} className="rackimg" />
        <p className="p">{cardtext}</p>
        <button className={classname} onClick={buttclick}>{butttext}</button>
        <button className={classnameI} onClick={buttclickI}>{butttextI}</button>
        <button onClick={handleDeleteClick} className="deletebutt">DELETE</button>
    </div>)
}

export default Rack 