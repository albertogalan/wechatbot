/**
 * Wechaty - WeChat Bot SDK for Personal Account, Powered by TypeScript, Docker, and 💖
 *  - https://github.com/chatie/wechaty
 */
var sleep = require('sleep')
const { Wechaty,Friendship } = require('wechaty')
const WAIT_REPLY=1
const { FileBox }  = require('file-box')
const path  = require('path')

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
        reply.map(n =>sendmsg(msg.from(),n)) 
                }
 }
}
 

async function sendmsg (receiver,msg){
    switch (Object.keys(msg)[0]) {
        case 'text':
            receiver.say(Object.values(msg)[0])
            break;
        case 'file':
            if (Object.values(msg)[0].match(/http/) !== null)

            {
                const fileBox = FileBox.fromUrl(Object.values(msg)[0])
                await receiver.say(fileBox)
            }
            else
            {
                const fileBox = FileBox.fromFile(Object.values(msg)[0])
                console.log(fileBox)
                await receiver.say(fileBox)
            }
            
            break;
        default:
    }
}
 
async function if_keyword_reply_room(msg,regex,reply){

if(msg.text().match(regex)!==null){
     await sleep.sleep(WAIT_REPLY) 
    if( msg.room()){
        // reply message if room
        reply.map(n =>sendmsg(msg.room(),n)) 
        }
 }
}
async function onMessage (msg) {
    console.log(msg.toString())
    saludation=/^(hello2|hii)$/i
    reply=[
        {'text':'Hi how are you?'},
        {'text':'Long time no see you'},
        {'file':'/data/src/bots/wechaty/tests/test.md'}
    ]
    await if_keyword_reply_private(msg,saludation,reply)
    saludation=/^(你好|您好)$/i
    await if_keyword_reply_private(msg,saludation,'你好 ')
    if (msg.type() === bot.Message.Type.Attachment){
        // console.log('message is ::' + msg.name())
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


async function init_bot(){
console.log('Starter Bot Started.')


}
async function main(){

await bot.start()
  // wait the bot for logging in
  while (!bot.logonoff()) {
    await new Promise(r => setTimeout(r, 1200))
  }
 var contact= await  bot.Contact.find({ alias:'alberto2'})
 await contact.say('Hey')
 const fileBox = FileBox.fromFile('/tmp/text.txt') 
 await contact.say(fileBox)
}

main()
    .then(()=> init_bot())
.catch(e => {
  console.error(e)
})
