import Link from "next/link"
export default function Home() {
  return (
    <div>
      <Link href="/share" as="/share">Share</Link>
    </div>
  )
}
