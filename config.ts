const prod = process.env.NODE_ENV === 'production'

let base = {
  shareApi: "ws://localhost:8899/share-text"
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
})({
  // test
})({
  // prod
  shareApi: "ws://www.diqye.com:8899/share-text"
});