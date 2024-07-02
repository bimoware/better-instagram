import { MessageClass } from "./Classes";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import fr from "dayjs/locale/fr";
dayjs.locale(fr);
import updateLocale from 'dayjs/plugin/updateLocale' 
dayjs.extend(updateLocale)
dayjs.updateLocale('fr', {
	relativeTime: {
	  future: "dans %s",
	  past: "%s",
	  s: 'À l\'instant',
	  m: "a minute",
	  mm: "%dm",
	  h: "1h",
	  hh: "%dh",
	  d: "1j",
	  dd: "%dj",
	  M: "1 mois",
	  MM: "%d mois",
	  y: "1 an",
	  yy: "%d ans"
	}
  })


function messagesToMessageGroups(messages: MessageClass[]) {
	const msgGroups: MessageClass[][] = [];
	for (const i of Array.from(messages.keys())) {
		if (i === 0) {
			msgGroups.push([messages[i]]);
			continue
		};
		const lastMsgGroup = msgGroups[msgGroups.length - 1];
		const lastMessage = lastMsgGroup[lastMsgGroup.length - 1];
		if (messages[i].userId == lastMessage.userId) {
			msgGroups[msgGroups.length - 1].push(messages[i]);
		} else {
			msgGroups.push([messages[i]]);
		}
	}
	return msgGroups;
}

function timeToString(timestamp: number, type: number) {
	let day = dayjs(timestamp);
	switch (type) {
		case 0:
			return day.fromNow(true);
		case 1:
			return day.format("DD/MM/YYYY HH:mm:ss");
		case 2:
			return day.format("HH:mm");
	}
}

function isOnlyEmojis(string:string){
	return string.match(/^\p{Extended_Pictographic}+$/u)
}

export { isOnlyEmojis, timeToString, messagesToMessageGroups };
