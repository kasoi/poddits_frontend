interface TextHelper {
    text: string;
    secondsValue: number;
}

export default class TimeAgo {

    static NOW: Date = new Date();
    static times: TextHelper[] = [     {text:"second", secondsValue: 1}, {text: "minute", secondsValue: 60},
                                {text: "hour", secondsValue: 3600}, {text: "day", secondsValue: 86400}, 
                                {text: "week", secondsValue: 604800}, {text: "month", secondsValue: 2592000}, 
                                {text: "year", secondsValue: 31536000}];

    static timeAgo(date: Date) {
        let diff = Math.round((this.NOW.getTime() - date.getTime()) / 1000);
        for (var t = 0; t < this.times.length; t++) {
            if (diff < this.times[t].secondsValue) {
                if (t === 0) {
                    return "Just now"
                } else {
                    diff = Math.round(diff / this.times[t - 1].secondsValue);
                    return diff + " " + this.times[t - 1].text + (diff === 1 ? " ago":"s ago");
                }
            }
        }
    }
}