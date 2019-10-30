/**
 * Wechaty - WeChat Bot SDK for Personal Account, Powered by TypeScript, Docker, and 💖
 *  - https://github.com/chatie/wechaty
 */
var sleep = require('sleep')
var fs = require ('fs')
var async = require('async');
const { Message, Wechaty, Friendship, UrlLink, MediaMessage, Misc, log } = require('wechaty')
// import { MediaMessage, Misc, log } from 'wechaty'
const WAIT_REPLY=1
const MAXADDINGCONTACS=5
const WAITADDCONTACT=5
const { FileBox }  = require('file-box')
const path  = require('path')
const TEST=true
const TESUSER='alberto2'
const WAITMSG=1

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
    switch (friendship.type()) {
        case Friendship.Type.Receive:
          await friendship.accept()
          contact.say('你好, 很高兴认识你 ')
          contact.say('很高兴认识你 ')
          // contact.say('hello, nice to meet you ')
          await contact.alias('bot-'+ contact.name())
        break;

        case Friendship.Type.Confirm:
          contact.say('你好, 很高兴认识你 ')
          contact.say('很高兴认识你 ')
          // contact.say('hello, nice to meet you ')
          await contact.alias('bot-'+ contact.name())
        default:
    }
    }  



async function testsend(msg,type){

    // switch (type){
    //     case 'text':
            if (TEST)
            {
                 var contact=await bot.Contact.find({ alias:TESUSER})
                 await contact.say(msg)
                 const fileBox = FileBox.fromUrl('https://chatie.io/wechaty/images/bot-qr-code.png')
                 await contact.say(fileBox)
            }
    //         break;
    //     case 'file':
    //         console.log('file')
    //         break;
    //     default:
    // }


}


var waitsendmsg = async function (tt,receiver,msg) {
    setTimeout(function () {
       // cb(null, tt)
       sendmsg(receiver,msg)
       index=tt.indexOf(msg)
    }, (tt.indexOf(msg)+1) * WAITMSG * 1000)
}


async function sendmsg (receiver,msg){
    switch (Object.keys(msg)[0]) {
        case 'text':
            receiver.say(Object.values(msg)[0])
            await testsend(Object.values(msg)[0])

            break;
        case 'file':
            if (Object.values(msg)[0].match(/http/) !== null)

            {
                const fileBox = FileBox.fromUrl(Object.values(msg)[0])
                await receiver.say(fileBox)
                await testsend(fileBox)
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


// Accept room invitation
async function onRoominvite(roomInvitation){
    try {
      await roomInvitation.accept()
    } 
    catch (e){
      console.error(e)
    }

}

// Somebody join the Room
async function onRoomjoin (room,inviteeList, inviter){

  const nameList = inviteeList.map(c => c.name()).join(',')
  console.log(`Room ${room.topic()} got new member ${nameList}, invited by ${inviter}`)
  console.log('bot room-join room id:', room.id)
  const topic = await room.topic()
  console.log(`topic ${topic}`)

  
  var regex=/^(tornae|room2)/i


  console.log(topic.match(regex))
  if (topic.match(regex)!== null)
  {
      const welcomemsg=[
        `Welcome to ${topic} \n`,
        '-----------------------\n',
        'We are a buyer group of imported wine\n',
        `Here you can access B2B prices\n`,
        `Mininum quantity to buy is 1box (6 bottles)\n`,
        `1st Pay to Alberto\n`,
        `2nd Add to the list\n`,
        `3rd We buy the wine When we reach 10 boxes\n`,
        `Free Delivery to 上海上海市徐汇区田林街道田林九村九号楼五楼501 (near 桂林路地铁站)\n`,
        `To send the wine to other place ask Alberto\n`
      ].join('')
      await room.say(welcomemsg, inviteeList[0])
      const fileBox = FileBox.fromUrl('https://chatie.io/wechaty/images/bot-qr-code.png')
      await room.say(fileBox)
  }
}
// Somebody join the Room
// async function onRoomjoin (room, inviteeList, inviter) {

// log.info( 'Bot', 'EVENT: room-join - Room "%s" got new member "%s", invited by "%s"',
//             await room.topic(),
//             inviteeList.map(c => c.name()).join(','),
//             inviter.name(),
//           )

//   console.log('bot room-join room id:', room.id)
//   const topic = await room.topic()
//   var regex=/^(tornae|room2)$/i
//   if (room.id.match(regex)!== null)
//   {
//     await room.say(`welcome to "${topic}"!`, inviteeList[0])
//   }

// }

// Autologin 
const bot = new Wechaty({profile:'agalan'})
//const bot = new Wechaty()


bot.on('scan',    onScan)
bot.on('login',   onLogin)
bot.on('logout',  onLogout)
bot.on('message', './listeners/on-message')
bot.on('friendship',onFriendship)
bot.on('room-invite',onRoominvite)
// bot.on('room-join',onRoomjoin)

bot.on('room-join', onRoomjoin)



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
