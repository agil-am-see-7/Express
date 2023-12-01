var express = require('express');
var router = express.Router();
 
var chatHistory = [];
var nicknames = [];
var updateCount = 1; //not 0, it has to be bigger than the updateCount on client side
 
const MAX_NOF_MESSAGES = 3;
const MAX_COUNT = 1000; //this constant has to be bigger than the number of messages that could be presumably submitted within 2 seconds...
 
router.get('/', function (req, res, next) {
  res.json({ message: 'fhs chat-app api works...' });
});
 
// history
router.get('/history', function (req, res, next) {
  res.json(chatHistory);
});
 
router.post('/history', function (req, res, next) {
  var date = new Date();
 
  chatHistory.push({ message: req.body.message, nickname: req.body.nickname, date: date });
 
  updateCount++;
 
  if(updateCount > MAX_COUNT)
    updateCount = 0;
 
  if (chatHistory.length > MAX_NOF_MESSAGES) {
    chatHistory.splice(0, 1);
    res.json({ message: 'History created, first removed!' });
  } else
    res.json({ message: 'History created!' });
});
module.exports = router