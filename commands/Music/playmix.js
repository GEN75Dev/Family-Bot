const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");
const {
  MessageActionRow,
  MessageSelectMenu,
  MessageEmbed,
} = require("discord.js");

module.exports = new Command({
  // options
  name: "plist",
  description: `play top playlist with me`,
  userPermissions: ["CONNECT"],
  botPermissions: ["CONNECT"],
  category: "Music",
  cooldown: 5,
  // command start
  run: async ({ client, interaction, args, prefix }) => {
    // Code
    let channel = interaction.member.voice.channel;
    if (!channel) {
      return interaction.followUp(
        `** ${emoji.ERROR} You Need to Join Voice Channel first **`
      );
    }  else if (
      interaction.guild.me.voice.channel &&
      !interaction.guild.me.voice.channel.equals(channel)
    ) {
      return interaction.followUp(
        `** ${emoji.ERROR} You Need to Join __My__ Voice Channel **`
      );
    } else if (interaction.guild.me.voice.serverMute) {
      return interaction.followUp(
        `** ${emoji.ERROR} I am Muted in Voice Channel , unmute me first **`
      );
    } else {
      let menuraw = new MessageActionRow().addComponents([
        new MessageSelectMenu()
          .setCustomId("mix")
          .setPlaceholder(`Click to See Best PlayList`)
          .addOptions([
            {
              label: "NCS",
              value: `https://www.youtube.com/playlist?list=PLRBp0Fe2GpglvwYma4hf0fJy0sWaNY_CL`,
              description: "Click to Play Best Ncs Songs",
              emoji: "924259350976036915",
            },
            {
              label: "Future Bass 1",
              value: `https://youtu.be/hqV3pos7DGM`,
              description: "Click to Play Best Future Bass Songs",
              emoji: "924259350976036915",
            },
            {
              label: "Future Bass 2",
              value: `https://youtu.be/gQyYD6wF_9U`,
              description: "Click to Play Best Future Bass 2 Songs",
              emoji: "924259350976036915",
            },
            {
              label: "TM_Bax",
              value: `https://www.youtube.com/watch?v=5zxCctzMTAo&list=PLRRxq3cVvmG-PSKiiL_hwXUB87ABZeFKu`,
              description: "Click to Play Best TM_Bax Songs",
              emoji: "924259350976036915",
            },
            {
              label: "Sasy Mankan",
              value: `https://www.youtube.com/watch?v=hwZU5Xwfk20&list=PLYoHKlC5bYRT4823sVKzrcdThQvM_ccy9`,
              description: "Click to Play Best Sasy Mankan Songs",
              emoji: "924259350976036915",
            },
            {
              label: "DJ Snake",
              value: `https://www.youtube.com/watch?v=XCVMIWR5QTw`,
              description: "Click to Play Best DJ Snake Songs",
              emoji: "924259350976036915",
            },
            {
              label: "Trap Remix",
              value: `https://www.youtube.com/watch?v=s8XIgR5OGJc&list=PLC1og_v3eb4hrv4wsqG1G5dsNZh9bIscJ`,
              description: "Click to Play Best Trap Remix Songs",
              emoji: "924259350976036915",
            },
            {
              label: "EDM",
              value: `https://www.youtube.com/watch?v=gCYcHz2k5x0&list=PLw6eTMMKY24QLYfmrU2rB8x-lP5Fas2dY`,
              description: "Click to Play EDM Songs",
              emoji: "924259350976036915",
            },
            {
              label: "Lo-Fi",
              value: `https://www.youtube.com/watch?v=WTsmIbNku5g&list=PLOzDu-MXXLliO9fBNZOQTBDddoA3FzZUo`,
              description: "Click to Play Best Lo-fi Songs",
              emoji: "924259350976036915",
            },
            {
              label: "Chill Music",
              value: `https://www.youtube.com/watch?v=RLWcYADoV84`,
              description: "Click to Play Best Chill Songs",
              emoji: "924259350976036915",
            },
          ]),
      ]);
      let embed = new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`Best Top PlayList For You`)
        .setDescription(`>>> Click to See All PlayList and Select to Play`)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: ee.footertext, iconURL: ee.footericon });

      interaction
        .followUp({ embeds: [embed], components: [menuraw] })
        .then(async (msg) => {
          let filter = (i) => i.user.id === interaction.user.id;
          let collector = await msg.createMessageComponentCollector({
            filter: filter,
          });
          collector.on("collect", async (interaction) => {
            if (interaction.isSelectMenu()) {
              if (interaction.customId === "mix") {
                await interaction.deferUpdate().catch((e) => {});
                let song = interaction.values[0];
                player.play(channel, song, {
                  member: interaction.member,
                  textChannel: interaction.channel,
                });
              }
            }
          });
        });
    }
  },
});
