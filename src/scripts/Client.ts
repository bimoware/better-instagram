import {
	ChatClass,
	ClientClass,
	MessageClass,
	ReactionClass,
	UserClass,
	NoteClass,
} from "./Classes";

import chatData from "../database/chats.json";
import userData from "../database/users.json";
import messageData from "../database/messages.json";
import reactionData from "../database/reactions.json";
import noteData from "../database/notes.json";

let n = 0;

let client = new ClientClass("3");
const chats = chatData.map(
	(chat) =>
		new ChatClass(
			client,
			String(n++),
			chat.type,
			chat.userIds,
			chat.icon,
			chat.name,
			chat.seen ?? true,
			chat.pinned ?? false
		)
);
const users = userData.map(
	(user) =>
		new UserClass(client, String(n++), user.pfp, user.username, user.displayName, user.isSelf ?? false)
);
const messages = messageData.map(
	(message) =>
		new MessageClass(
			client,
			String(n++),
			message.chatId,
			message.userId,
			message.type ?? 0,
			message.data,
			message.timestamp,
			message.reactions || []
		)
);
const reactions = reactionData.map(
	(reaction) =>
		new ReactionClass(
			client,
			String(n++),
			reaction.messageId,
			reaction.emoji ?? "❤️",
			reaction.userId,
			reaction.timestamp
		)
);

const notes = noteData.map((note) => new NoteClass(client, note.userId, note.text));

client.setData({ messages, users, chats, reactions, notes });

export default client;
