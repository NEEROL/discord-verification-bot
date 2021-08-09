require("dotenv").config();
const { Client, Intents, MessageButton, MessageActionRow } = require("discord.js");
const messages = require("./messages.json");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_PRESENCES],
});

const codes = {};

client.once("ready", async () => {
    console.log(`Logged as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton() && interaction.customId !== "verification") return;
    if (interaction.member.roles.cache.has(process.env.VERIFICATION_ROLE_ID)) {
        interaction.reply({ content: messages.userIsVerified, ephemeral: true });
        return;
    }

    if (!codes[interaction.user.id]) {
        const randomCode = (Math.random() + 1).toString(36).substr(2, 5);
        codes[interaction.user.id] = randomCode;
    }

    const filter = (response) => response.author.id === interaction.user.id;

    interaction.reply({ content: messages.sendCode.replaceAll("%CODE%", codes[interaction.user.id]), ephemeral: true });

    try {
        const collected = await interaction.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"] });
        const message = collected.first();

        await message.delete();
        if (message.content.toLowerCase() !== codes[interaction.user.id]) {
            const button = new MessageButton().setCustomId("verification").setLabel(messages.retryVerification).setCustomId("verification").setStyle("DANGER");
            const row = new MessageActionRow().addComponents(button);
            interaction.followUp({ content: messages.invalidCode, ephemeral: true, components: [row] });
        } else {
            if (!interaction.member.roles.cache.has(process.env.VERIFICATION_ROLE_ID)) await interaction.member.roles.add(process.env.VERIFICATION_ROLE_ID);
            interaction.followUp({ content: messages.verificationSuccess, ephemeral: true });
        }
    } catch (e) {
        const button = new MessageButton().setCustomId("verification").setLabel(messages.retryVerification).setCustomId("verification").setStyle("DANGER");
        const row = new MessageActionRow().addComponents(button);

        interaction.followUp({ content: messages.codeExpired, ephemeral: true, components: [row] });
    }

    delete codes[interaction.user.id];
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (message.channel.id !== process.env.VERIFICATION_CHANNEL_ID) return;
    if (message.member.permissions.has("MANAGE_GUILD") && message.content.toLowerCase() === "send_msg") {
        await message.delete();

        const button = new MessageButton().setCustomId("verification").setLabel(messages.verifyYourself).setCustomId("verification").setStyle("SUCCESS");
        const row = new MessageActionRow().addComponents(button);

        await message.channel.send({ content: messages.verify, components: [row] });

        return;
    }
    if (!codes[message.author.id]) await message.delete();
});

client.login(process.env.TOKEN);
