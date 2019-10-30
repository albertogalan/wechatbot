
const PATHDIR='/data/databases/raw/lists'

const { Message } = require('wechaty')


var fs = require ('fs')


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
        reply.map(n => waitsendmsg(reply,msg.from(),n)) 
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


//Save media file
async function saveMediaFile(message) {
  console.log(message)
  // const filename = message.filename
  const filename = 'book001.pdf'
  console.log('IMAGE local filename: ' + filename)

  const fileStream = fs.createWriteStream(filename)

  process.stdout.write('saving...')
  try {
    const netStream = await message.readyStream()
    netStream
      .pipe(fileStream)
      .on('close', _ => {
        const stat = fs.statSync(filename)
        console.log(', saved as ', filename, ' size: ', stat.size)
      })
  } catch (e) {
    console.error('stream error:', e)
  }
}



// Process Messages
async function onMessage (msg) {
    console.log(msg.toString())
    var saludation=/^(hello|hi)$/i
    reply=[
        {'text':'Hi how are you?'},
        {'text':'Long time no see you',},
        {'text':'Do you like wine?'},
        {'text':'I have some Spanish wine, here in Shanghai'}
    ]
    await if_keyword_reply_private(msg,saludation,reply)
 

    saludation=/^(wine|Wine)$/i
    reply=[
        {'text':'This is our catalog?'}
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
    // if (msg.type() === bot.Message.Type.Attachment){
    //     // console.log('message is ::' + msg.name())
    //     console.log('this message is an Attachment')
    //     console.log(msg)
    //     var fs = require('fs');

    //          fs.writeFile(`/tmp/${msg.filename}`, msg.text, function(err) {
    //              if(err) {
    //                  return console.log(err);
    //                } 
    //     }
    //     )
    // }

    //  if (msg.type() === 1) {
    //   saveMediaFile(msg)
    //   return
    // }


      if (msg.type() !== Message.Type.Text) {
    const file = await msg.toFileBox()
    const name = file.name
    console.log('Save file to: ' + name)
    file.toFile(name,true)
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

module.exports = onMessage