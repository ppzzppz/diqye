import Head from "next/head"
import {useEffect,useState,  ChangeEvent, useRef, MutableRefObject} from "react"
import Styles from "styles/share.module.scss";
import { keepAlive, createConn, CallFn, MessageSent } from "@/kit/Connection";


type Typing = "Typing" | "Sent" | "Merged" | "Connecting" | "Sending"


let sendMsg:CallFn<MessageSent>|null = null
let mergeContent = (a:string,b:string) => {
  return b
}
let timer: number | undefined
let afterSend = (fn:CallFn<void>) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    fn();
  }, 800) as any;
}
let useTextContent = 
  ():[
    string,
    MutableRefObject<HTMLTextAreaElement|undefined>,
    Typing,
    ((a:string,cursor:ChangeEvent<HTMLTextAreaElement>) => void)
  ] => {
  let [content,setContent] = useState("");
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
          setContent(mergeContent(content,msg))
          setTyping("Merged")
        } else if(code == 700){
          setTyping("Sent")
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
          setTyping("Sending")
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
          <title>Online sharing text | Diqye</title>
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