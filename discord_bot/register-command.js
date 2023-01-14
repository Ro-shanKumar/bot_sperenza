const {REST, Routes, ApplicationCommandOptionType} =  require("discord.js")
require("dotenv").config()

const commands = [
  {
    name : "embed",
    description: "Send a Embed!",
  },
  {
    name : 'hey',
    description : "Replies with a hey"
  },
  {
    name: 'ping',
    description : "pong"
  },
  {
    name : "add",
    description: "add two numbers",
    options : [
      {
        name: 'first-number',
        description: "The first Number",
        type : ApplicationCommandOptionType.Number,
        choices : [
          {
            name: "One",
            value : 1
          },
          {
            name : "Two",
            value : 2,
          }
        ],
        required : true,
      },
      {
        name: 'second-number',
        description: "The second Number",
        type : ApplicationCommandOptionType.Number,
        required : true,
      }
    ]
  },
  {
    name : "event-info",
    description: "Gives info about Specific Event",
    options : [
      {
        name: 'association',
        description: "The Association to which the Fest is Related",
        type : ApplicationCommandOptionType.String,
        choices : [
          {
            name: "BSA",
            value : "BSA"
          },
          {
            name : "BSW",
            value : "BSW",
          },
          {
            name : "BRCA",
            value : "BRCA",
          },
          {
            name : "BSP",
            value : "BSP",
          }
        ],
        required : true,
      },
      {
        name: 'fest',
        description: "Enter the fest Name",
        type : ApplicationCommandOptionType.String,
        required : true,
      }
    ]
  }
]

const rest = new REST({version : "10"}).setToken(process.env.Token);
(async() => {
  try {
    console.log("Registering Slash Commands");
    await rest.put(
      Routes.applicationGuildCommands(process.env.Guild_ID, process.env.Cleint_ID),
      {body: commands}
    )
    console.log("Slash Command Registered Successfully");
  }catch(error){
    console.log(`There was a error: ${error}`);
  }
})();
