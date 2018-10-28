#!/usr/bin/env node

const fs = require('fs')
const util = require('util')
const glob = util.promisify(require('glob'))
const Table = require('cli-table3')
const commander = require('commander')
const qhimg = require('../')

// utils
let collect = (val, arr) => {
  return arr.concat(val)
}

let parseGlob = async (files) => {
  let result = []
  for (let file of files) {
    let t = await glob(file)
    result.push(...t)
  }
  return result
}

commander
  .version(qhimg.VERSION)
  .option('-f, --file [file ...]', 'Upload binary image files', collect, [])
  .parse(process.argv)

if (commander.file.length || commander.args.length) {
  const args = commander.file.concat(commander.args)

  parseGlob(args).then(files => {
    let promises = [], output = []
    files.forEach((file) => {
      promises.push(
        qhimg.upload(file)
          .then((json) => {
            output.push([json.data.filename, json.data.url])
          })
          .catch(err => {
            output.push([file, err.msg || err.message])
          })
      )
    })

    Promise.all(promises).then(() => {
      let table = new Table({
        head: ['filename', 'url']
      })
      table.push(...output)
      console.log(table.toString())
    })
  })
}
