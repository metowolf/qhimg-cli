<p align="center">
<img src="https://user-images.githubusercontent.com/2666735/47615188-ef7bc780-dae6-11e8-8cb1-f598dd94e4cf.png" width="300px" alt="qhimg-cli">
</p>

<p align="center">
<a href="https://i-meto.com"><img alt="Author" src="https://img.shields.io/badge/Author-METO-blue.svg?style=flat-square"/></a>
<a href="https://www.npmjs.com/package/qhimg-cli"><img alt="Version" src="https://img.shields.io/npm/v/qhimg-cli.svg?style=flat-square"/></a>
<a href="https://travis-ci.org/metowolf/qhimg-cli"><img alt="Travis" src="https://img.shields.io/travis/metowolf/qhimg-cli.svg?style=flat-square"></a>
<img alt="License" src="https://img.shields.io/npm/l/qhimg-cli.svg?style=flat-square"/>
</p>


## Command-line Usage

### Installation

```bash
npm install qhimg-cli -g
```

### Usage

Upload a single image

```bash
qhimg dog.png
```

Upload multiple images ([globbing](https://www.npmjs.com/package/glob) supported)

```bash
qhimg "*.jpeg" dog.png
qhimg ~/*.(jpg|png|gif)
```

Display qhimg-cli version:

```bash
qhimg --version
```

## Module Usage

### Installation

```bash
npm install qhimg-cli
```

### Usage

#### Requiring the module:

```javascript
const qhimg = require('qhimg-cli')
```


#### Uploading files

```javascript
qhimg.upload('./test/nodejs.png')
    .then(json => {
        console.log(json)
    })
    .catch(err => {
        console.error(err.message)
    })
```

success response
```json
{
    "code": "success",
    "data": {
        "ext": "png",
        "mime": "image/png",
        "filename": "nodejs.png",
        "url": "https://ps.ssl.qhmsg.com/t019da962bb7ae33344.png"
    }
}
```

## Author

**qhimg-cli** © [metowolf](https://github.com/metowolf), Released under the [MIT](./LICENSE) License.<br>

> Blog [@meto](https://i-meto.com) · GitHub [@metowolf](https://github.com/metowolf) · Twitter [@metowolf](https://twitter.com/metowolf) · Telegram Channel [@metooooo](https://t.me/metooooo)
