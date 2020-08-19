import Head from "next/head"
import {useEffect,useState,  ChangeEvent, useRef, MutableRefObject} from "react"
import Styles from "styles/share.module.scss";
import { keepAlive, createConn, CallFn, MessageSent } from "@/kit/Connection";


type Typing = "Typing" | "Saved" | "Insteaded" | "Connecting" | "Saving"


let sendMsg:CallFn<MessageSent>|null = null
let timer: number | undefined
let afterSend = (fn:CallFn<void>) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    fn();
  }, 1000) as any;
}
let useTextContent = 
  ():[
    string,
    MutableRefObject<HTMLTextAreaElement|undefined>,
    Typing,
    ((a:string,cursor:ChangeEvent<HTMLTextAreaElement>) => void)
  ] => {
  let [content,setContent] = useState("Nothing");
  let [typing,setTyping] = useState<Typing>("Connecting");
  let textarea = useRef<HTMLTextAreaElement>()
  // let target:null|EventTarget & HTMLTextAreaElement = null;
  useEffect(()=>{
    document.body.className = "share-body"
    let closeConn:CallFn<void>|null = null
    keepAlive(createConn,{
      onConnecting:()=>{
        setTyping("Connecting")
      },
      onOpened: () => {
        textarea.current?.focus();
      },
      onmessage: e =>{
        let [code,msg] = JSON.parse(e.data)
        if(code == 0){
          setContent(msg)
          setTyping("Insteaded")
        } else if(code == 700){
          setTyping("Saved")
        }
      },
      logicSent:(send,close)=>{
        closeConn = close
        sendMsg = send
      }
    })
    return () =>{
      closeConn&&closeConn();
      document.body.className = ""
    }
  },[])

  return [
    content, 
    textarea,
    typing,
    (a,e) => {
    setContent(a);
    if(typing != "Typing"){
      setTyping("Typing");
    }
    afterSend(()=>{
        if(sendMsg){
          sendMsg(JSON.stringify([0,a]))
          setTyping("Saving")
        }else{
          void null
        }
    })
  }]
}


export default function Share(){
  let [content,textarea,typing,setContent] = useTextContent();
  return (
      <div className={Styles.share}>
        <Head>
          <title>Online Text Share | Diqye</title>
        </Head>
        <h3 className={Styles[typing]}>{typing}</h3>
        <div className={Styles.shareArea}>
          <textarea
          ref={textarea as MutableRefObject<HTMLTextAreaElement>}
          readOnly={typing == "Connecting"}
          onChange={e=>setContent(e.target.value,e)}
          value={content}></textarea>
        </div>
      </div>
  )
}