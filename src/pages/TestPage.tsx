import client from "../scripts/Client";
import MessageGroup from "./components/MessageGroup";
export default function TestPage() {
	let messages = client.messages.filter((m) => m.reactions.length)
	console.log(messages);
	let message = messages[0]
	return <MessageGroup messages={[message]} />;
}
