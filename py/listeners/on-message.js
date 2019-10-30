
const PATHDIR='data/lists'

const { Message } = require('wechaty')


var sleep = require('sleep')

var fs = require ('fs')
const TEST=true
const TESUSER='alberto2'
const WAIT_REPLY=1
const WAITMSG=1

var waitsendmsg = async function (msg,tt,textmsg) {
    setTimeout(function () {
       // cb(null, tt)
       sendmsg(msg,textmsg)
       index=tt.indexOf(textmsg)
    }, (tt.indexOf(textmsg)+1) * WAITMSG * 1000)
}

async function sendmsg (msg,textmsg){
    switch (Object.keys(textmsg)[0]) {
        case 'text':
            // console.log(msg.from())
            // msg.from().say(Object.values(textmsg)[0])
            msg.to().say(Object.values(textmsg)[0])
            // await testsend(msg)

            break;
        case 'file':
            if (Object.values(textmsg)[0].match(/http/) !== null)

            {
                const fileBox = FileBox.fromUrl(Object.values(textmsg)[0])
                await msg.from().say(fileBox)
                await testsend(fileBox)
            }
            else
            {
                const fileBox = FileBox.fromFile(Object.values(textmsg)[0])
                console.log(fileBox)
                await msg.from().say(fileBox)
            }
            
            break;
        default:
    }
}

async function testsend(msg){

    // switch (type){
    //     case 'text':
            if (TEST)
            {
                 // var contact=await bot.Contact.find({ alias:TESUSER})
                 const contact =await msg.to()
                 // console.log("this is from"+contact)
                 await contact.say(msg)
                 if(contact.name == '王京 Alberto')
                 {


                 }
                 // const fileBox = FileBox.fromUrl('https://chatie.io/wechaty/images/bot-qr-code.png')
                 // await contact.say(fileBox)
            }
    //         break;
    //     case 'file':
    //         console.log('file')
    //         break;
    //     default:
    // }


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



async function if_keyword_reply_private(msg,regex,reply){

if(msg.text().match(regex)!==null){
     await sleep.sleep(WAIT_REPLY) 
    if(! msg.room()){
        // reply message if private
        reply.map(n => waitsendmsg(msg,reply,n)) 
                }
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

    if (msg.text().match(regex)!==null && msg.type() === Message.Type.Text)

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


//Save File / Download Media File

async function saveMediaFile(msg)
{
	
 if (msg.type() !== Message.Type.Text) {
    const file = await msg.toFileBox()
    const name = file.name
    console.log('Save file to: ' + name)
    file.toFile('data/files'+name,true)
  }
}


// async function saveContact(msg)
// {
    
//  if (msg.type() !== Message.Type.Contact) {
//     const contact = await msg.toContact()
//     const name = file.name
//     console.log('Save file to: ' + name)
//     file.toFile('data/files'+name,true)
//   }
// }
async function sendInformation(text){
    var contact= await  bot.Contact.find({ alias:'alberto2'})
    await contact.say(text)
}



async function roomInfo(msg){

   const from = msg.from()
    var text=msg.text()
   // Room.findAll()
    if (/^trr$/i.test(text)) {
      const roomList = await bot.Room.findAll()
      const topicList = await Promise.all(
        roomList.map(async room => await room.topic()),
      )

      const totalNum = roomList.length
      let   n        = 0

      const replyText = [
        `Total room number: ${totalNum}`,
        ...topicList
            .slice(0, 17)
            .map(topic => ++n + '. ' + topic),
      ].join('\n')

      sendInformation(replyText)

      return
 }


    // Contact.findAll()
    if (/^trc$/i.test(text)) {
      const contactList = await bot.Contact.findAll()
      console.log('bot.Contact.findAll() done.')

      const totalNum = contactList.length
      let n = 0

      const replyText = [
        `Total contact number: ${totalNum}`,
        contactList
          .slice(0, 17)
          .map(contact => contact.name())
          .map(name => ++n + '. ' + name),
      ].join('\n')
  
      sendInformation(replyText)

      return
    }

   // Contact.findAll()
    if (/^tra$/i.test(text)) {
      const room= await msg.room()
      const memberList = await room.memberAll()
      const memberName = await Promise.all(
        memberList.map(async member => await member.name()),
      )

      const totalNum = memberList.length
      let   n        = 0

      const replyText = [
        `Total room number: ${totalNum}`,
        ...memberName
            .slice(0, 17)
            .map(topic => ++n + '. ' + topic),
      ].join('\n')

      sendInformation(replyText)

      return
 }



}

// Process Messages
async function onMessage (msg) {
    console.log(msg.toString())
    var saludation=/^(hello|hi)$/i
    reply=[
        {'text':'Hi how are you?'},
        {'text':'Long time no see you'},
        {'text':'Do you like wine?'},
        {'text':'I have some Spanish wine, here in Shanghai'}
    ]
    await if_keyword_reply_private(msg,saludation,reply)
 

    // saludation=/^(wine|Wine)$/i
    // reply=[
    //     {'text':'This is our catalog?'}
    // ]
    // await if_keyword_reply_private(msg,saludation,reply)
 

    // saludation=/^(你好|您好)$/i
    // reply=[
    //     {'text':'你好　'},
    //     {'text':'你最近好吗？　'},
    //     {'text':'你喜欢红酒吗？　'},

    // ]
    // await if_keyword_reply_private(msg,saludation,reply)

    // reply=/^(喜欢)$/i
    // reply=[
    //     {'text':'如果你喜欢喝红酒然后我可以给你我们的介绍产品　'}

    // ]

    await if_keyword_record(msg,/http[s]?:\/\/.*?</,PATHDIR + '/bot-url.md')
    await if_keyword_record(msg,/cybersecur/i,PATHDIR + '/bot-url.md')
    await if_keyword_record(msg,/machine learn/i,PATHDIR + '/bot-url.md')
    await if_command_do(msg) 
    await saveMediaFile(msg)
    await roomInfo(msg)

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

module.exports = onMessage