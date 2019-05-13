/**
 * Wechaty - WeChat Bot SDK for Personal Account, Powered by TypeScript, Docker, and 💖
 *  - https://github.com/chatie/wechaty
 */
var sleep = require('sleep')
const { Wechaty,Friendship } = require('wechaty')
const WAIT_REPLY=3

function onScan (qrcode, status) {
  require('qrcode-terminal').generate(qrcode, { small: true })  // show qrcode on console

  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode),
  ].join('')

  console.log(qrcodeImageUrl)
}

function onLogin (user) {
  console.log(`${user} login`)
}

function onLogout(user) {
  console.log(`${user} logout`)
}

// add friendship
async function onFriendship (friendship){
console.log('receive a friend request')
if (friendship.type()== friendship.Type.Receive && friendship.hello()=='hello')
    await friendship.accept()
    contact.say('hello, nice to meet you ')
    await contact.alias('bot friend ')
}  

async function if_keyword_reply_private(msg,regex,reply){

if(msg.text().match(regex)!==null){
     await sleep.sleep(WAIT_REPLY) 
    if(! msg.room()){
        // reply message if private
        msg.from().say(reply)
        }
 }
}
async function if_keyword_reply_room(msg,regex,reply){

if(msg.text().match(regex)!==null){
     await sleep.sleep(WAIT_REPLY) 
     const sender = msg.from()
    if(msg.room()){
        //reply message if room
        msg.room().say(reply)
 }
}
}

async function onMessage (msg) {
    console.log(msg.toString())
    await if_keyword_reply_private(msg,/^hello$/,'hi how are you?')
    await if_keyword_reply_room(msg,/^hi$/,'hello how are you?')
    if (msg.type() === bot.Message.Type.Attachment){
        console.log('message is ::' + msg.name())
        console.log('this message is an Attachment')
        var fs = require('fs');
        fs.writeFile("file.pdf", msg.text(), function(err) {
            if(err) {
                return console.log(err);
              } 
    }
        )
    }
// record messages
if (await msg.mentionSelf()){
    console.log ('this message mention me')
    fs.appendFile('../data/wechat-mentioned.cvs','${room}, ${contact},${text},${date}\n',(err) =>{
        if (err) throw err
    })
}

}
// Autologin 
const bot = new Wechaty({profile:'agalan'})
//const bot = new Wechaty()


bot.on('scan',    onScan)
bot.on('login',   onLogin)
bot.on('logout',  onLogout)
bot.on('message', onMessage)
bot.on('friendship',onFriendship)

bot.start()
.then(() => console.log('Starter Bot Started.'))
.catch(e => console.error(e))
