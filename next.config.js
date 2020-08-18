module.exports = (phase, { defaultConfig }) => {
  return {
    /* config options here */
    async rewrites(){
      return [{
        source: '/api/:slug*',
        destination: 'http://localhost:8899/:slug*', // Matched parameters can be used in the destination
      }]
    }
  }
}