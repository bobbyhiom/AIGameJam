const crypto = require("crypto");
var express = require('express');
var router = express.Router();
var fs = require('fs')
const { Configuration, OpenAIApi } = require("openai");


/* GET users listing. */
router.get('/', async function (req, res, next) {

  const configuration = new Configuration({
    organization: "xxx",
    apiKey: "xxx"
  });

  const openai = new OpenAIApi(configuration);

  let prompt = req.query.prompt

  
  if(prompt==undefined){
    let jsonResponse = `{
      "url": "",
      "error": "No prompt"
      }`
res.send(jsonResponse)
return
  }

  let badPrompt = false


  // Safety checks
  var badWords = ["naked", "nudity", "nude", "sex", "child", "murder", "kill", "death", "pussy", "penis", "cock", "dick", "vagina", "breast", "boob", "tits", "nipple", "shit", "fuck", "cunt", "testicals", "rape", "gangbang", "ass", "nigga", "slut", "twat", "wank", "bitch", "dyke","nazi","hitler"];
  for (var i = 0, ln = badWords.length; i < ln; i++) {
    if (prompt.indexOf(badWords[i]) !== -1) {
      badPrompt = true;
      break;
    }
  }

  if (badPrompt) {
    let jsonResponse = `{
          "url": "",
          "error": "Banned word used"
          }`
    res.send(jsonResponse)
  } else {

    const imageCompletion = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "256x256",
    });

    let imageData = imageCompletion.data.data[0].url

    const id = crypto.randomBytes(16).toString("hex");
    getImage(imageData,id)

    let jsonResponse = `{
      "id": "` + id + `",
      "url": "` + imageData + `",
      "error": ""
      }`
    res.send(jsonResponse)
  }

});


module.exports = router;

async function getImage(url,id) {
  debugger
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const outputFileName = "/tmp/" + id + ".png"
  fs.createWriteStream(outputFileName).write(buffer);

}
