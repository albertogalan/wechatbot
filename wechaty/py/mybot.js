const { Wechaty } = require('wechaty') // import { Wechaty } from 'wechaty'
const QrcodeTerminal = require('qrcode-terminal');

const bot = new Wechaty({profile:'agalan'})

// bot.on('scan',    onScan)
// bot.on('login',   onLogin)
// bot.on('logout',  onLogout)
bot.on('message', './listeners/on-message')
// bot.on('friendship',onFriendship)
// bot.on('room-invite',onRoominvite)
// bot.on('room-join',onRoomjoin)

// bot.on('room-join', onRoomjoin)


// Wechaty.instance() // Singleton
// .on('scan', (url, code) => {
//   console.log(`Scan QR Code to login: ${code}\n${url}`)
//   if (!(/201|200/).test(String(code))) {
//     const loginUrl = url.replace(/\/qrcode\//, '/l/')
//     QrcodeTerminal.generate(loginUrl)
//   }
// })
// .on('login',        user => console.log(`User ${user} logined`))
// .on('message',   message => console.log(`Message: ${message}`))
// .on('message', './listeners/on-message')

// .start()



async function main(){

await bot.start()
  // wait the bot for logging in
  while (!bot.logonoff()) {
    await new Promise(r => setTimeout(r, 1200))
  }
 var contact= await  bot.Contact.find({ alias:'alberto2'})
 const fileBox = FileBox.fromUrl('http://www.grandtop.cn/data/images/case/20190506173930_935.png')
 await contact.say('Hey how r you')
 await bot.say('hello    hey')
 // var fileBox = FileBox.fromFile('/data/src/tornae/anteater/scraper/specific/wechaty/mpv.jpg')
 // await contact.say(fileBox)
    // const fileBox = FileBox.fromFile('/tmp/text.txt') 
 // await contact.say(fileBox)


// const linkPayload = new UrlLink({
//   description : 'WeChat Bot SDK for Individual Account, Powered by TypeScript, Docker, and Love',
//   thumbnailUrl: 'https://avatars0.githubusercontent.com/u/25162437?s=200&v=4',
//   title       : 'Welcome to Wechaty',
//   url         : 'https://github.com/chatie/wechaty',
// })
// await contact.say(linkPayload)


}


main()
    .then(()=> init_bot())
.catch(e => {
  console.error(e)
})