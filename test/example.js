const qhimg = require('..');

(async () => {

  let result

  console.log(`===> upload image`)
  result = await qhimg.upload('nodejs.png')
  console.log(result)

  if (result.code === 'success') {
    console.log(`url: ${result.data.url}`)
  }

})()
