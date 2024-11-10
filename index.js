const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('meow!')
});

app.listen(3000, () => {
  console.log('server started')
});

const Discord = require("discord.js")
const client = new Discord.Client({intents:["Guilds", "MessageContent", "GuildMessages"]})
client.on("messageCreate", async message => {
    console.log("Message from server " + message.guild.name + " user " + message.author.username + " displayname " + message.author.displayName  + ": \n" + message.content)
  
    if (message.content === 'verify') {
        const embed = new Discord.EmbedBuilder()
            .setTitle('♡ For Non-Verified Meowers')
            .setColor("#FFA9A9")
            .setDescription('Bookie would appreciate it if you verify!')
      .setImage("https://64.media.tumblr.com/066369de837405fdcd5587ad631889ab/5b3eeedb9b784dc7-60/s640x960/ea8c96d467d5e92a4a71957c40e0e404935918e7.gif")
            const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setStyle("SUCCESS")
            .setLabel("Verify")
           .setEmoji("<a:AubeyyYay:1277711341297340416>")
            .setCustomId("AddVerifiedRole")
        )
        message.delete()
      message.channel.send({
        embeds: [embed],
        components: [row]
      })
  }
  else if(message.content.toLowerCase().startsWith("mreow!")) {
    const meow = new Discord.EmbedBuilder()
      .setTitle("meow!! meow meow meow meow meow meow meow meow meow meow~") 
      .setImage("https://media1.tenor.com/m/I2bG_dnz46EAAAAC/cat-wave.gif")
      .setColor("#9cd7ff")
   message.channel.send({embeds: [meow]})
  }
})
client.on('interactionCreate', async interaction => {
    if (interaction.isButton()) {
      if (interaction.customId == 'AddVerifiedRole') {
          interaction.reply({ 
            content: 'You got verified, Enjoy the server!', ephemeral: true })
          const role = interaction.guild.roles.cache.get("<&1305093841572855838>")
          const member = interaction.member
          await member.roles.add(role)
      }
    }
});
client.login(process.env.TOKEN)