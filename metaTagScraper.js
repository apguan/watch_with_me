const proxies = require("./proxies");
const metascraper = require("metascraper")([
  require("metascraper-description")(),
  require("metascraper-image")(),
  require("metascraper-title")()
]);

const request = require("request");

const scrapeData = async url => {
  const proxy = proxies.proxies[0];
  const settings = {
    url,
    headers: {
      Connection: "keep-alive"
    },
    method: "GET",
    proxy: proxy,
    strictSSL: false
  };

  const req = await request(settings, async (err, res, body) => {
    if (!err) {
      const metadata = await metascraper({ body, url });
      console.log(metadata);
      return metadata;
    }
  });
};

module.exports = {
  scrapeData
};
