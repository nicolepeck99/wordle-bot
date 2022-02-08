import { ApplyOptions } from "@sapphire/decorators";
import { SubCommandPluginCommand, SubCommandPluginCommandOptions } from "@sapphire/plugin-subcommands";
import type { Message } from "discord.js";
import { container } from "@sapphire/framework";

@ApplyOptions<SubCommandPluginCommandOptions>({
    aliases: ["randomword"],
    description: "A basic command"
})
export class UserCommand extends SubCommandPluginCommand {
    public async messageRun(message: Message) {
        const { client, words } = container;
        const randomWord = words[Math.floor(Math.random() * container.words.length)];
        client.logger.info(`${message.member?.displayName ?? "unknown"} got ${randomWord}`);

        return message.channel.send(randomWord);
    }
}
