import Link from "next/link"
import Styles from "styles/Index.module.scss";
import Head from "next/head";

export default function Home() {
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
          <a>Online text Share</a>
        </Link>
        <p>Share text in mutiple devices </p>
      </div>
      <footer>
        todo...
      </footer>
    </div>
  )
}
