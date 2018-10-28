const fs = require('fs')
const path = require('path')
const readChunk = require('read-chunk')
const fileType = require('file-type')
const request = require('request-promise')
const version = require('../package.json').version

const allowExt = ['jpg', 'png', 'webp', 'gif', 'bmp']

module.exports = {

  VERSION: version,

  api: {
    upload: 'http://st.so.com/stu'
  },

  headers: {
    'User-Agent': `request/qhimg-cli ${version}`
  },

  /**
  * Upload an image file
  * @param   {string}  pathname - path to a binary image file
  * @returns {promise}
  */
  async upload(pathname) {

    if (!fs.lstatSync(pathname).isFile()) {
      throw new Error(`Invalid path`)
    }

    let buffer = readChunk.sync(pathname, 0, 4100)
    let filetype = fileType(buffer)
    if (filetype === null || !allowExt.includes(filetype.ext)) {
      throw new Error(`File is not a valid image`)
    }

    let formData = {
      upload: fs.createReadStream(pathname),
    }

    let options = {
      url: this.api.upload,
      formData,
      followRedirect: false,
      resolveWithFullResponse: true,
      simple: false
    }

    return request.post(options)
      .then(response => {
        if (response.statusCode !== 302) {
          throw new Error(`${response.statusCode}: ${response.statusMessage}`)
        }
        let location = response.headers.location
        let found = /imgkey=(\w*)\.jpg/.exec(location)[1]
        return {
          code: 'success',
          data: {
            url: `https://ps.ssl.qhmsg.com/${found}.${filetype.ext}`,
            ...filetype,
            filename: path.basename(pathname)
          }
        }
      })
  }

}
