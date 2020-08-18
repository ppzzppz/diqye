import Head from "next/head"
import {useEffect,useState,  ChangeEvent} from "react"
import Styles from "styles/share.module.scss";
import config from "@/config";

let oneConn = (conn:(WebSocket|undefined)) => async ():Promise<WebSocket> => {
  if(conn == null){
    return new Promise((resolve,reject)=>{
      conn = new WebSocket(config.shareApi);
      conn.onopen = _ =>{
        resolve(conn)
      }
      conn.onerror = reject
    })
  }else{
    return conn;
  }
}
let fetchConn = oneConn(undefined);

let useTextContent = ():[string,((a:string,cursor:ChangeEvent<HTMLTextAreaElement>) => void)] => {
  let [content,setContent] = useState("Nothing");
  let conn:null|WebSocket = null;
  let positionOfcursor = 0
  let target:null|EventTarget & HTMLTextAreaElement = null;
  useEffect(()=>{
    fetchConn().then(oconn=>{
      conn = oconn
      conn.onmessage = e =>{
        let [_,content] = JSON.parse(e.data)
        setContent(content)
        if(target){
          target.selectionEnd = positionOfcursor
        }
      }
      conn.onerror = e => {
        setContent("Error! please reload the page")
      }
    })
    return () =>{
      if(conn){
        // conn.close()
      }
    }
  })
  return [content, (a,e) => {
    if(conn?.readyState == WebSocket.OPEN){
      positionOfcursor = e.target.selectionEnd
      target = e.target
      conn?.send(JSON.stringify([0,a]))
    }else{
      setContent("Error! please reload the page")
    }
  }];
}

export default function Share(){
  let [content,setContent] = useTextContent();
  return (
    <div className={Styles.share}>
      <Head>
        <title>Share</title>
      </Head>
      <textarea
      onChange={e=>setContent(e.target.value,e)}
      value={content}></textarea>
    </div>
  )
}