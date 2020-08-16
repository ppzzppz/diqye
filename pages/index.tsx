import Link from "next/link"
import Styles from "styles/Index.module.scss";

export default function Home() {
  return (
    <div className={Styles.index}>
      <Link 
      href="/share" 
      as="/share">
      <a className={Styles.link}>Go to share</a>
      </Link>
      <div className={Styles.warp}>
        <Link 
        href="/share" 
        as="/share">
        <a className={Styles.link}>Go to share</a>
        </Link>
      </div>
    </div>
  )
}
