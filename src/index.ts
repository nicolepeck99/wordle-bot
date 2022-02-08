import "./lib/setup";
import { container, LogLevel, SapphireClient } from "@sapphire/framework";
import { getWordFromFile } from "./helper/getWordFromFile";

const client = new SapphireClient({
    defaultPrefix: "!",
    regexPrefix: /^(hey +)?bot[,! ]/i,
    caseInsensitiveCommands: true,
    logger: {
        level: LogLevel.Debug
    },
    shards: "auto",
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_EMOJIS_AND_STICKERS",
        "GUILD_VOICE_STATES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS"
    ]
});

const main = async () => {
    try {
        client.logger.info("Logging in");
        await client.login();
        client.logger.info("Logged in");
        container.words = getWordFromFile();
        client.logger.info("Loaded word file");
    } catch (error) {
        client.logger.fatal(error);
        client.destroy();
        process.exit(1);
    }
};

main();

declare module "@sapphire/pieces" {
    interface Container {
        words: string[];
    }
}
