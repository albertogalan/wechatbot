#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import itchat
from itchat.content import *
import time

import numpy as np
import pandas as pd
from collections import defaultdict
import re
import jieba
import os
import matplotlib.pyplot as plt
from wordcloud import WordCloud, ImageColorGenerator
import PIL.Image as Image



@itchat.msg_register(itchat.content.TEXT)
def text_reply(msg):
    print(msg.text)
    print(msg.fromUserName)
    time.sleep(30)
    itchat.send_msg(u'好的', msg['ToUserName'])
    #itchat.send_image('aa.jpg', msg['ToUserName'])
    return "ok"


@itchat.msg_register(FRIENDS)
def add_friend(msg):
    itchat.add_friend(**msg['Text'])  # 该操作将自动将好友的消息录入，不需要重载通讯录
    itchat.send_msg(u'很高兴认识你', msg['RecommendInfo']['UserName'])


@itchat.msg_register([PICTURE, RECORDING, ATTACHMENT, VIDEO])
def download_files(msg):
    print('download file')
    msg.download('data/' + msg.fileName)
    typeSymbol = {
        PICTURE: 'img',
        VIDEO: 'vid',
    }.get(msg.type, 'fil')
    return '@%s@%s' % (typeSymbol, msg.fileName)


@itchat.msg_register([TEXT, MAP, CARD, NOTE, SHARING])
def text_reply(msg):
    itchat.send('%s: %s' % (msg['Type'], msg['Text']), msg['FromUserName'])


@itchat.msg_register([PICTURE, RECORDING, ATTACHMENT, VIDEO])
def download_files(msg):
    with open('data/' + msg.fileName, 'wb') as f:
        f.write(msg['Text']())


@itchat.msg_register([PICTURE, RECORDING, ATTACHMENT, VIDEO], isGroupChat=True)
def download_files(msg):
    with open('data/' + msg.fileName, 'wb') as f:
        f.write(msg['Text']())


@itchat.msg_register(TEXT, isGroupChat=True)
def text_reply(msg):
    if msg['isAt']:
        itchat.send(
            u'@%s\u2005I received: %s' %
            (msg['ActualNickName'], msg['Content']), msg['FromUserName'])
        print(u'@%s\u2005I received: %s' %
              (msg['ActualNickName'], msg['Content']), msg['FromUserName'])


itchat.auto_login(hotReload=True)


friends = itchat.get_friends(update=True)
nfriends=len(friends)
print(nfriends)

def get_count(Sequence):
    counts = defaultdict(int)
    for x in Sex:
        counts[x] +=1
    return counts


df_friends = pd.DataFrame(friends)
Sex = df_friends.Sex
Sex_count = get_count(Sex)
Sex_count.plot(kind ='bar')

print(Sex_count)


print('I am searching friends')
itchat.search_friends(wechatAccount='alberto')

itchat.send_image(fileDir="aa.jpg", toUserName='filehelper')
itchat.send("这是一个测试", toUserName='filehelper')
itchat.run()
