/**
 * Wechaty - WeChat Bot SDK for Personal Account, Powered by TypeScript, Docker, and 💖
 *  - https://github.com/chatie/wechaty
 */
var sleep = require('sleep')
var fs = require ('fs')
var async = require('async');
const { Message, Wechaty, Friendship, UrlLink, MediaMessage, Misc, log } = require('wechaty')
// import { MediaMessage, Misc, log } from 'wechaty'
const MAXADDINGCONTACS=5
const WAITADDCONTACT=5
const { FileBox }  = require('file-box')
const path  = require('path')
const onMessage = require('./listeners/on-message')
const onFriendShip = require('./listeners/on-friend')





function onScan (qrcode, status) {
  require('qrcode-terminal').generate(qrcode, { small: true })  // show qrcode on console

  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode),
  ].join('')

  console.log(qrcodeImageUrl)
}

function onLogin (user) {
  main()
  console.log(`${user} login`)
}

function onLogout(user) {
  console.log(`${user} logout`)
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
        '----------------------------------------\n',
        'We are a buyer group of imported wine\n',
        `Here you can access B2B prices\n`,
        `Mininum quantity 1 box(6bottles)\n`,
        `1st Pay to Alberto\n`,
        `2nd Add to the list\n`,
        `3rd We buy the wine when we reach 10 boxes\n`,
        `Delivery to 上海上海市徐汇区田林街道田林九村九号楼五楼501 (near 桂林路地铁站)\n`,
        `To send the wine to other place ask Alberto\n`
      ].join('')
      await room.say(welcomemsg, inviteeList[0])
      // const fileBox = FileBox.fromUrl('https://chatie.io/wechaty/images/bot-qr-code.png')
      // await room.say(fileBox)
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
global.bot = new Wechaty({profile:'agalan2'})

bot.on('message', onMessage)
bot.on('scan',    onScan)
bot.on('login',   onLogin)
bot.on('logout',  onLogout)
bot.on('friendship',onFriendShip)
bot.on('room-invite',onRoominvite)
bot.on('room-join', onRoomjoin)

bot.start()
.catch(console.error)

async function init_bot(){
console.log('Starter Bot Started.')
}


async function main(){
   console.log('main ..')
   var contact= await  bot.Contact.find({ alias:'alberto2'})
   await contact.say('Hey how r you')
   fileBox = FileBox.fromFile('book001.jpg')
   await contact.say(fileBox)
   // console.log(contact)
   
   // find a contact
   // var contact2= await  bot.Contact.findAll({ alias:'王'})
   // console.log(contact2)
   // await Friendship.add(contact.id,"hello")

   //doesn't work
   // var fileBox = FileBox.fromUrl('http://www.grandtop.cn/data/images/case/20190506173930_935.png')
   
      // const fileBox = FileBox.fromFile('/tmp/text.txt') 
   // await contact.say(fileBox)
   // findContact(bot,"alberto2")



}


async function findContact(bot,alias){
    console.log("adding a friendship")
    contact= await bot.Contact.find("alberto2")
    if (contact !== null)
    {
     console.log("the contact is:" +contact)
    }
}