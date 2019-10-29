/**
 * Wechaty - WeChat Bot SDK for Personal Account, Powered by TypeScript, Docker, and 💖
 *  - https://github.com/chatie/wechaty
 */
var sleep = require('sleep')
var fs = require ('fs')
var async = require('async');
const { Wechaty,Friendship } = require('wechaty')
const WAIT_REPLY=1
const MAXADDINGCONTACS=5
const WAITADDCONTACT=5
const PATHDIR='/data/databases/raw/lists'
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



async function if_keyword_reply_private(msg,regex,reply){

if(msg.text().match(regex)!==null){
     await sleep.sleep(WAIT_REPLY) 
    if(! msg.room()){
        // reply message if private
        reply.map(n => waitsendmsg(reply,msg.from(),n)) 
                }
 }
}

async function if_command_do(msg){
    const room = msg.room()
    if (room){
        switch (msg.text()) {
    // adding contact from a group    
            case '/add':
                const memberList = await room.memberList()
                console.log("number of member list:" + memberList.length)
                count=0
                for (let i = 0; i < memberList.length && count<MAXADDINGCONTACS; i++) {
                    if (  memberList[i].payload.friend) {
                        console.log(room)
                        console.log('adding contact' + memberList[i].payload.name)
                        await bot.Friendship.add(memberList[i],memberList[i].payload.topic +  ' Hell! 你好')
                        count=count + 1
                        await sleep.sleep(WAITADDCONTACT)
                    }
                }
             break;
        default:
}
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
 
async function if_keyword_reply_room(msg,regex,reply){

if(msg.text().match(regex)!==null){
     await sleep.sleep(WAIT_REPLY) 
    if( msg.room()){
        // reply message if room
        reply.map(n => {
             sendmsg(msg.room(),n)

        }) 
        }
 }
}
async function if_keyword_record(msg,regex,file){

    if (msg.text().match(regex)!==null && msg.type() === bot.Message.Type.Text)

    {
      console.log ('this message is interesting')
        const text = msg.text().match(regex)[0]
        const date = Date.now()
        const room = msg.room()
        const contact =await msg.from()

      fs.appendFile(file,`${room};${contact};${date};${text}\n`,'utf8',(err) =>{
      if (err) throw err
    })
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


// Process Messages
async function onMessage (msg) {
    console.log(msg.toString())
    saludation=/^(hello|hi)$/i
    reply=[
        {'text':'Hi how are you?'},
        {'text':'Long time no see you',},
        {'text':'Do you like wine?'},
        {'text':'I have some Spanish wine, here in Shanghai'}
    ]
    await if_keyword_reply_private(msg,saludation,reply)
 

    saludation=/^(wine|Wine)$/i
    reply=[
        {'text':'This is our catalog?'},
        {'file':'https://chatie.io/wechaty/images/bot-qr-code.png'},
    ]
    await if_keyword_reply_private(msg,saludation,reply)
 

    saludation=/^(你好|您好)$/i
    reply=[
        {'text':'你好　'},
        {'text':'你最近好吗？　'},
        {'text':'你喜欢红酒吗？　'},

    ]
    await if_keyword_reply_private(msg,saludation,reply)

    reply=/^(喜欢)$/i
    reply=[
        {'text':'如果你喜欢喝红酒然后我可以给你我们的介绍产品　'}

    ]



    await if_keyword_record(msg,/http[s]?:\/\/.*?</,PATHDIR + '/bot-url.md')
    await if_keyword_record(msg,/cybersecur/i,PATHDIR + '/bot-url.md')
    await if_keyword_record(msg,/machine learn/i,PATHDIR + '/bot-url.md')
    await if_command_do(msg) 
    if (msg.type() === bot.Message.Type.Attachment){
        // console.log('message is ::' + msg.name())
        console.log('this message is an Attachment')
        console.log(msg)
        var fs = require('fs');
        //      fs.writeFile("file.pdf", msg.text(), function(err) {
        //          if(err) {
        //              return console.log(err);
        //            } 
        // }
        // )
    }
// record messages to me
if (await msg.mentionSelf()){
    console.log ('this message mention me')
        const text = msg.text()
    const date = Date.now()

        const room = msg.room()
        const contact =await msg.from()
    fs.appendFile(PATHDIR +'/bot-mention.csv',`${room}, ${contact},${text},${date}\n`,(err) =>{
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
bot.on('room-invite',onRoominvite)


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
 await contact.say('Hey how r you')
    // const fileBox = FileBox.fromFile('/tmp/text.txt') 
 // await contact.say(fileBox)
}


main()
    .then(()=> init_bot())
.catch(e => {
  console.error(e)
})
