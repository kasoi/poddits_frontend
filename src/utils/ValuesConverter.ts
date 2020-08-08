export default class ValuesConverter {

    public static convertTime(seconds: number): string {
        seconds = Math.floor(seconds);
        const secs = (seconds % 60);
        const minutes = (Math.floor(seconds / 60) % 60);
        const hours = Math.floor(seconds / (60 * 60));

        if (hours > 0) return this.addZero(hours) + ':' + this.addZero(minutes) + ':' + this.addZero(secs);
        else return this.addZero(minutes) + ':' + this.addZero(secs);
    }

    public static addZero(value: number): string {
        if (value > 10) return value.toString();
        else return '0' + value;
    }

}