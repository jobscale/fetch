# @jobscale/fetch

## Installation

```
npm i @jobscale/fetch
```

## Examples

```javascript
const { Logger } = require('@jobscale/logger');
const { fetch } = require('@jobscale/fetch');

const logger = new Logger({ logLevel: 'info' });
logger.info({ fetch: fetch() });
```
