import { useEffect } from "react"


export default function Hw(){
  function open(){
    window.open(
    "https://r-ap-southeast-1.meeting.huaweicloud.com/confportal/?language=en-US#/conference/287568168/stb616456dd87633bf41e49871342ee253a5ff269d74a72daf2?nonce=1601368694370NsKrnSR5jaJqGaDqcmHBKYa0fJAjJcp46",
    "",
    "width=500,height:500",
    true)  
  }
  return (
    <div>
      <button onClick={open}>hello
      </button>
      <iframe src="https://r-ap-southeast-1.meeting.huaweicloud.com/confportal/?language=en-US#/conference/287568168/stb616456dd87633bf41e49871342ee253a5ff269d74a72daf2?nonce=1601368694370NsKrnSR5jaJqGaDqcmHBKYa0fJAjJcp46"
      />
    </div>
  )
}