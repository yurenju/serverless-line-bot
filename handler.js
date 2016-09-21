'use strict';

require('dotenv').config();

const crypto = require('crypto');
const fetch = require('node-fetch');

module.exports = {
  receive(event, context, cb) {
    const url = 'https://trialbot-api.line.me/v1/events';
    const message = `postback ${event.body.result[0].content.text}`;
    const body = {
      to: [event.body.result[0].content.from],
      toChannel: 1383378250,
      eventType: '138311608800106203',
      content: {
        'contentType': 1,
        'toType': 1,
        'text': message
      }
    };
    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charser=UTF-8',
        'X-Line-ChannelID': process.env.LINE_CHANNEL_ID,
        'X-Line-ChannelSecret': process.env.LINE_CHANNEL_SECRET,
        'X-Line-Trusted-User-With-ACL': process.env.LINE_MID
      },
      body: JSON.stringify(body)
    };

    console.log('res', JSON.stringify(event.body.result));
    console.log('body', JSON.stringify(body));
    console.log('opts', JSON.stringify(opts));

    fetch(url, opts)
    .then(res => res.json())
    .then(json => {
      console.log(JSON.stringify(json));
      cb();
    })
    .catch(err => {
      console.error(err);
      cb(err);
    })
    ;
  }
}
