import Link from "next/link"
import Styles from "styles/Index.module.scss";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  let [roomName,setRoomName] = useState("")
  return (
    <div className={Styles.index}>
      <Head>
        <title>Home | Diqye</title>
      </Head>
      <header>
        My tools
      </header>
      <div className={Styles.block1}>
        <Link href="/share" as="/share">
          <a>Online sharing text</a>
        </Link>
        <p>Share text in mutiple devices </p>
      </div>
      <div className={Styles.block2}>
        <p>Chat room without login </p>
        <input
        type="text"
        value={roomName}
        onChange={e=>setRoomName(e.target.value)} placeholder="Enter a room you want" />
        <Link as={"/chat/"+(roomName)} href="/chat/[name]">
          <a>go</a>
        </Link>
      </div>
      <footer>
        todo...
      </footer>
    </div>
  )
}
