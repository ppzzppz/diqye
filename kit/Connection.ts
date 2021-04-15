import config from "@/config"
import { create } from "domain"

export function createConn():Promise<WebSocket>{
  return new Promise((resolve,reject)=>{
    let conn = new WebSocket(config.shareApi())
    conn.onopen = _ =>{
      resolve(conn)
    }
    conn.onerror = reject
  })
}
export type CallFn<T> = (t:T)=>any;
export type MessageSent =  string | ArrayBuffer | SharedArrayBuffer | Blob | ArrayBufferView;
type ConnedParm = {
  onConnecting:()=>void,
  onOpened:()=>void,
  onmessage:(ev: MessageEvent) => void,
  logicSent:(send:CallFn<MessageSent>,close:CallFn<void>)=>any
}
export async function keepAlive(createFn:()=>Promise<WebSocket>,param:ConnedParm){
  try{
    await keepAlive_(createFn,param)
  }catch(e){
    console.log("conn","Creating Error and will retry in 2s",e)
    setTimeout(()=>{
      keepAlive(createFn,param)
    },2000)
  }
}
export async function keepAlive_(createFn:()=>Promise<WebSocket>,param:ConnedParm){
  let conn = await createFn();
  let realClose = false
  conn.onmessage = param.onmessage
  param.onOpened();
  conn.onclose = e =>{
    if(realClose){
      console.log("Conn","Real close")
      void null
    } {
      console.log("Conn","Connection is closed and will retry after 1s",e)
      param.onConnecting();
      setTimeout(()=>{
        keepAlive(createFn,param)
      },1000)
    }
  }
  conn.onerror = e => {
    console.log("Conn","Error apeare",e)
    conn.close();
  }
  param.logicSent((a:MessageSent)=>{
    if(conn.readyState == conn.OPEN){
      conn.send(a)
    } else {
      console.log("Conn","Connection is not opened cause to call close",conn.readyState)
      conn.close();
    }
  },()=>{
    realClose = true;
    conn.close();
  })
}