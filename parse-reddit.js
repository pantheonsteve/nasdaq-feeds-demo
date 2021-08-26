const https = require('https')
const Parser = require('rss-parser');
let parser = new Parser;

(
  async () => {

  let feed = await parser.parseURL('https://www.reddit.com/.rss');
  console.log(feed.title);

  feed.items.forEach(item => {

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
      console.log(`statusCode: ${res.statusCode}`);
      console.log('Test');

      res.on('data', d => {
        process.stdout.write(d)
      })
    })

    console.log(JSON.stringify(item))

    let tag = '[Reddit] - ';
    let title = tag.concat(' ', item.title);

    const data = {
      data: {
        type: "node--article",
        attributes: {
          title: title,
          body: {
            value: item.content,
            format: "full_html"
          }
        }
      }
    };

    const jsondata = JSON.stringify(data);

    //Create JS object for each feed item
    //const feeditem = {};
    //feeditem.title = item.title;
    //feeditem.link = item.link;
    //const jsonfeeditem = JSON.stringify(feeditem);

    console.log(jsondata);
    //Loop through all items in the feed

    req.on('error', error => {
      console.error(error)
    })

    req.write(jsondata)
    req.end()


  });

})();
