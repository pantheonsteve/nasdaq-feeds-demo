const https = require('https')

const data = JSON.stringify({
  data: {
    type: "node--article",
    attributes: {
      title: "My custom NODE title",
      body: {
        value: "Custom value",
        format: "plain_text"
      }
    }
  }
});

const options = {
  hostname: 'dev-nasdaq-feeds-demo.pantheonsite.io',
  path: '/jsonapi/node/article',
  method: 'POST',
  headers: {
    'Content-Type': 'application/vnd.api+json',
    'Accept': 'application/vnd.api+json',
    'authorization': 'Basic YXBpX3VzZXI6cGFzc3dvcmQ='
  },
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.write(data)
req.end()
