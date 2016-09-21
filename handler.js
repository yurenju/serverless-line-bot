'use strict';

require('dotenv').config();

const crypto = require('crypto');
const fetch = require('node-fetch');
const LineBot = require('line-bot-sdk');

module.exports = {
  receive(event, context, cb) {
    const message = `postback ${event.body.result[0].content.text}`;
    const userId = event.body.result[0].content.from;
    const client = LineBot.client({
      channelID: process.env.LINE_CHANNEL_ID,
      channelSecret: process.env.LINE_CHANNEL_SECRET,
      channelMID: process.env.LINE_MID
    });
    client.sendText(userId, message)
    .then(res => cb(null, res))
    .catch(err => cb(err));
  }
}
