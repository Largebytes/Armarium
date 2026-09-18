import { useState } from "react"
import { useEffect } from "react"
import Rack from "./Rack"
import "./header"
import PopUp from "./popup"
import "./popupcss.css"
import {supabase} from "./supabase-js"


function App(){
  let popupvar=null
  let overlayvar=null

  const [currentcard,cardSetter] = useState(()=>{
    const saved=localStorage.getItem("cards")
    if (saved){
      return JSON.parse(saved)
    }else{
      return []
    }
  })
  const [currentpopbool,popboolsetter] = useState(true)
  
  function submitbutt(srcinn,titleinn, dbidd, dbpathh){
        popboolsetter(!currentpopbool)
        cardSetter([...currentcard,{id:Date.now(),srclink:srcinn,titleout:titleinn,dbId: dbidd, dbPath: dbpathh}])
  }
  function cancelbutt(){
    popboolsetter(!currentpopbool)
  }
  useEffect(()=>{
    localStorage.setItem("cards", JSON.stringify(currentcard))
  },[currentcard])


  if(!currentpopbool){
    overlayvar=<div className="overlay"></div>
    popupvar=<PopUp onclose={submitbutt} oncancel={cancelbutt}></PopUp>
  }

  function addclick(){
    popboolsetter(!currentpopbool)
  }
  async function deleteCard(id,dbid,dbpath) {
    console.log("deleting:", id, dbid, dbpath);
     if (dbpath) {
      const { error: storageError } = await supabase.storage.from('cloth-img').remove([dbpath]);
      if (storageError) console.error('Storage delete failed:', storageError.message);
    }
    if (dbid) {
      const { error: dbError } = await supabase.from('cloths').delete().eq('id', dbid);
      if (dbError) console.error('DB delete failed:', dbError.message);
    }
    const updatedCards = currentcard.filter(function (item) {
    return item.id !== id
  })
  cardSetter(updatedCards)

  localStorage.removeItem("clean-" + id)
  console.log("deleted")
}
  const racking=currentcard.map((item,index)=>{
    return <Rack imgscrr={item.srclink} cardtextt={item.titleout} key={index} id={item.id} onDelete={deleteCard}
     />
  })

  return( 
    <>
      <div className="heading">
        <button className="butt" onClick={addclick}>Add</button>
      </div>
      {overlayvar}
      {popupvar}
      <div className="grid">
        {racking}
      </div>
      
    </>)
}

export default App