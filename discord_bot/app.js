require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
var _ = require("lodash");
mongoose.connect('mongodb://127.0.0.1:27017/eventAdderDB');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

const eventSchema = new mongoose.Schema({
  Event: String,
  description: String,
  Registraion: String,
  fest: String,
  events: [],

})
const Event = new mongoose.model("event", eventSchema);

const userListSchema = new mongoose.Schema({
  Username: String,
  emailID: String,
  passcode: String,
  Association:String,
  events: [eventSchema]
})

const UserList = mongoose.model("userList", userListSchema);


const { Client , IntentsBitField, EmbedBuilder, ActivityType} = require("discord.js");
const client = new Client(
  {
    intents : [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent,

    ],
  }
)

client.on("messageCreate", function(message){
  if (message.content === '--help') {
    const embed = new EmbedBuilder()
      .setTitle("HelpDesk")
      .setDescription("This is the Ebot Description")
      .setColor("Random")
      .addFields({name: "Add Event", value : "Enter the Passcode", inline: true},
      {name: "Add Value", value : "Enter the name of the specific Event if required", inline: true});
      message.channel.send({embeds : [embed]});
  }
})

client.on("interactionCreate", (interaction) => {
  if(!interaction.isChatInputCommand())return ;
  if (interaction.commandName === 'add') {
    const num1 = interaction.options.get("first-number").value;
    const num2 = interaction.options.get("second-number").value;
    interaction.reply(`The sum is : ${num1 + num2}`);
  }
  if (interaction.commandName === 'hey') {
    interaction.reply("hey");
  }
  if (interaction.commandName === 'ping') {
    interaction.reply("pong");
  }
  if (interaction.commandName === 'embed') {
    const embed = new EmbedBuilder()
      .setTitle("This is embed Title")
      .setDescription("This is the embed Description")
      .setColor("Random")
      .addFields({name: "Field Title", value : "Field value", inline: true});
      interaction.reply({embeds : [embed]});
  }
  if (interaction.commandName === 'event-info') {
    const association = interaction.options.get("association").value;
    const fest = interaction.options.get("fest").value;
    let embedList = [];
    UserList.findOne({Association: association}, function(err, foundlist){
        // console.log(foundlist.events);
        if(foundlist){
          for(let i = 0; i < foundlist.events.length ; i++){
            // console.log(foundlist.events[i].fest)
            // console.log(fest);
            if(foundlist.events[i].fest === fest){

              let embed = new EmbedBuilder()
                .setColor("Random")
                .setTitle(foundlist.events[i].Event)
                .setDescription(foundlist.events[i].description)
                .setAuthor({ name: foundlist.events[i].fest, iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
	              .setThumbnail('https://i.imgur.com/AfFp7pu.png')
                .addFields({name: "Registration Detail", value : foundlist.events[i].Registraion})
	              .setTimestamp()
                .setFooter({ text: association , iconURL: 'https://i.imgur.com/AfFp7pu.png' });
              embedList.push(embed);
              // console.log(embed);
              // console.log(embedList);
            }
          }
          // console.log(embedList);
          interaction.reply({embeds : embedList});
        }
    })


  }
})

client.on("ready", (c)=>{
  client.user.setActivity({
    name:"--help",
    type : ActivityType.Listening

  })
})

client.login(process.env.Token);
