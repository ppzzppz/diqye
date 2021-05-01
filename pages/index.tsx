import Link from "next/link"
import Styles from "styles/Index.module.scss";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  return (
    <div className={Styles.index}>
      <Head>
        <title>Home | Diqye</title>
      </Head>
      <Link href="/share" >
        <div className={[Styles.item,Styles.active].join(" ")}>
          共享文本
        </div>
      </Link>
      <div className={Styles.item}>
        金融实验室
      </div>
      <div className={Styles.item}>
        多人视频
      </div>
      <div className={Styles.item}>
        趣文
      </div>
    </div>
  )
}
