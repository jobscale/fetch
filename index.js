const logger = console;

const smartFetch = (...argv) => fetch(...argv)
.then(res => (() => {
  const type = res.headers.get('Content-Type');
  if (type.match('application/json')) return res.json();
  if (type.match('text/') || type.match('/xml') || type.match('+xml')) return res.text();
  logger.info(JSON.stringify({ 'Content-Type': type }));
  return res.blob();
})()
.then(data => {
  res.data = data;
  return res;
}));

module.exports = smartFetch;
module.exports.fetch = smartFetch;
