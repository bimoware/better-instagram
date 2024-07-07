import {
	ChatClass,
	ClientClass,
	MessageClass,
	ReactionClass,
	UserClass,
	NoteClass,
	ActivityClass,
	PostClass
} from "./Classes";

import chatData from "../database/chats.json";
import userData from "../database/users.json";
import messageData from "../database/messages.json";
import reactionData from "../database/reactions.json";
import noteData from "../database/notes.json";
import activityData from "../database/activities.json";
import postData from "../database/posts.json";

let client = new ClientClass("3");
const chats = chatData.map(
	(chat) =>
		new ChatClass(
			client,
			chat.id,
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
		new UserClass(
			client,
			user.id,
			user.pfp,
			user.username,
			user.displayName,
			user.followers || [],
			user.isSelf ?? false
		)
);
const messages = messageData.map(
	(message) =>
		new MessageClass(
			client,
			message.id,
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
			reaction.id,
			reaction.messageId,
			// reaction.emoji ?? "❤️",
			reaction.userId,
			reaction.timestamp
		)
);

const notes = noteData.map((note) => new NoteClass(client, note.id, note.userId, note.text));

const activities = activityData.map(
	(activity) =>
		new ActivityClass(
			client,
			activity.id,
			activity.userId,
			activity.name,
			activity.type,
			activity.device,
			activity.data
		)
);

const posts = postData.map(
	post => new PostClass(
		client,
		post.id,
		post.userId,
		post.files
	)
)

client.setData({ messages, users, chats, reactions, notes, activities, posts });
Object.defineProperty(window, "client", client);
export default client;
