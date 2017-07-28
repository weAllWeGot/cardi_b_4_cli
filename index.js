#! /usr/bin/env node
'use strict';

const request = require('request');


const live_url = 'http://cardibbars.pythonanywhere.com/api/v1'
//const url_test = 'http://localhost:5000/api/v1'
var all_args = process.argv
if(all_args.length>2){
  var val_args = all_args.slice(2)
  var my_json_body = {
    method: 'getRandomQuote',
    category: val_args
  }
  var options = {
    url: live_url,
    method: 'POST',
    json: true, 
    body: my_json_body
  };
} else {
  var options = {
    url: live_url,
    method: 'GET'
  };
}

if(true){
  request(options, function(error, response, body) {
    if (error) {
        console.error(error);
    }
    if (response.statusCode === 200) {
      // bc sometimes it gets returned in strange format? idk what im doing
      if(body.toString() === "[object Object]"){
        var new_body = body
      } else {
        var new_body=JSON.parse(body)
      }
      

      if(new_body.meta.code > 399){
        console.log(new_body.error.message)
      } else {

        var lyric = new_body.data.lyric
        var song = new_body.data.song
        var author = new_body.data.author
        if(song.length>0){
          console.log(lyric, '--',author, 'in' ,song)
        } else {
          console.log(lyric, '--', author);
        }
      }


    } else {
      console.log(JSON.stringify(body))
      console.error('Error:', response.statusCode, ':', response.statusMessage);
    }
  })
};