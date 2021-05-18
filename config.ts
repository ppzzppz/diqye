const prod = process.env.NODE_ENV === 'production'

let base = {
  // shareApi: "ws://hk.com/hs/share-text"
  shareApi() {
    let protocol = {
      "http:": "ws://",
      "https:": "wss://"
    }
    return  (protocol[location.protocol as ("http:"|"https:")] || "ws://") + location.host + "/hs/share-text"
  } 
}

let config = (dev:Partial<typeof base>) => 
(test:Partial<typeof base>) =>  
(prod:Partial<typeof base>)=> ({
  "development": {...base,...dev},
  "production": {...base,...prod},
  "test": {...base,...test}
}[process.env.NODE_ENV])


export default config({
  // dev
  shareApi(){
    return "ws://hk.com/hs/share-text"
  }
})({
  // test
})({
  // prod
});
