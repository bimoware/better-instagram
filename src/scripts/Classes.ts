import videoIcon from "/icons/video.svg";
import imageIcon from "/icons/image.svg";
import micIcon from "/icons/mic.svg";

export class ClientClass {
	chats: ChatClass[];
	users: UserClass[];
	messages: MessageClass[];
	reactions: ReactionClass[];
	notes: NoteClass[];
	activities: ActivityClass[];
	posts: PostClass[]
	constructor(public userId: string) {
		this.chats = [];
		this.users = [];
		this.messages = [];
		this.reactions = [];
		this.notes = [];
		this.activities = [];
		this.posts = []
	}
	get user() {
		return this.users.find((user) => user.id === this.userId)!;
	}
	setData({
		messages,
		users,
		chats,
		reactions,
		notes,
		activities,
		posts
	}: {
		messages: MessageClass[];
		users: UserClass[];
		chats: ChatClass[];
		reactions: ReactionClass[];
		notes: NoteClass[];
		activities: ActivityClass[];
		posts: PostClass[]
	}) {
		chats.forEach((chat) => this.chats.push(chat));
		users.forEach((user) => this.users.push(user));
		messages.forEach((msg) => this.messages.push(msg));
		reactions.forEach((reaction) => this.reactions.push(reaction));
		notes.forEach((note) => this.notes.push(note));
		activities.forEach((activity) => this.activities.push(activity));
		posts.forEach(post => this.posts.push(post));
	}
}

export class ChatClass {
	constructor(
		public client: ClientClass,
		public id: string,
		public type: number,
		public _users: string[],
		public icon?: string,
		public name?: string,
		public seen?: boolean,
		public pinned?: boolean
	) {
		this.seen = seen ?? true;
		this.pinned = seen ?? false;
	}
	get users() {
		return this._users.map((userId) => this.client.users.find((user) => user.id === userId)!);
	}
	get messages() {
		return this.client.messages.filter((msg) => msg.chatId === this.id);
	}
	get lastMessage() {
		return this.messages.length ? this.messages[this.messages.length - 1] : null;
	}
}

export class UserClass {
	constructor(
		public client: ClientClass,
		public id: string,
		public pfp: string,
		public username: string,
		public displayName: string,
		public followerIds: string[],
		public isSelf?: boolean
	) {}
	get followers() {
		return this.followerIds.map((id) => this.client.users.find((user) => user.id === id)!);
	}
}

export class ReactionClass {
	constructor(
		public client: ClientClass,
		public id: string,
		public messageId: string,
		public userId: string,
		public timestamp: number
	) {}
	get message() {
		return this.client.messages.find((message) => message.id === this.messageId)!;
	}
	get user() {
		return this.client.users.find((user) => user.id === this.userId)!;
	}
}
export class MessageClass {
	constructor(
		public client: ClientClass,
		public id: string,
		public chatId: string,
		public userId: string,
		public type: number,
		public data: string,
		public timestamp: number,
		public _reactions: string[],
		public replyId?: string
	) {
		this._reactions = this._reactions || [];
	}
	get chat() {
		return this.client.chats.find((chat) => chat.id === this.chatId)!;
	}
	get needsBubble() {
		return /^\p{Extended_Pictographic}+$/u.test(this.data);
	}
	get reactions() {
		return this._reactions.map(
			(reactionId) => this.client.reactions.find((reaction) => reaction.id === reactionId)!
		);
	}
	get reply() {
		return this.client.messages.find((message) => message.id === this.replyId)!;
	}
	get user() {
		return this.client.users.find((user) => user.id === this.userId)!;
	}
	toString() {
		switch (this.type) {
			case 0: // Text Message
				return this.data;
			case 1: // Voice Message
				return "[Audio]";
			case 2: // Image File
				return "[Image]";
			case 3: // Video File
				return "[Video]";
		}
	}
	toIconPreview() {
		switch (this.type) {
			case 0: // Text Message
				return [null, this.data];
			case 1: // Voice Message
				return [micIcon, "Audio"];
			case 2: // Image File
				return [imageIcon, "Image"];
			case 3: // Video File
				return [videoIcon, "Video"];
		}
	}
}

export class NoteClass {
	constructor(
		public client: ClientClass,
		public id: string,
		public userId: string,
		public text: string
	) {}
	get user() {
		return this.client.users.find((user) => user.id === this.userId)!;
	}
}

export class ActivityClass {
	constructor(
		public client: ClientClass,
		public id: string,
		public userId: string,
		public name: string,
		public type: string,
		public device: string,
		public data: {
			state?: string;
			author?: string;
			buttons?: { label: string; type: string }[];
			with?: string[];
		}
	) {}
	get user() {
		return this.client.users.find((user) => user.id === this.userId)!;
	}
}

export class PostClass {
	constructor(
		public client: ClientClass,
		public id: string,
		public userId: string,
		public files: string[]
	) {}
	get user() {
		return this.client.users.find((user) => user.id === this.userId)!;
	}
}
