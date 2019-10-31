// async function onFriend (contact, request) {
//   if(request){
//     let name = contact.name()
//     await request.accept()
//     console.log(`Contact: ${name} send request ${request.hello()}`)

//   }
// }

// add friendship
async function onFriendship (friendship){
console.log('receive a friend request')
    switch (friendship.type()) {
        case Friendship.Type.Receive:
          await friendship.accept()
          contact.say('你好, 很高兴认识你 ')
          // contact.say('hello, nice to meet you ')
          await contact.alias('bot-'+ contact.name())
        break;

        case Friendship.Type.Confirm:
          contact.say('你好, 很高兴认识你 ')
          await contact.alias('bot-'+ contact.name())
        default:
    }
    }  


module.exports = onFriendship