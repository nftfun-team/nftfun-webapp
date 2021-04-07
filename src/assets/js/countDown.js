export default function count(startTime, endTime, cb) {
    const now = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const leftTime = end - now;
    let d, h, m, s;
    if (leftTime >= 0) {
        d = this.addTagTime(Math.floor(leftTime / 1000 / 60 / 60 / 24));
        h = this.addTagTime(Math.floor(leftTime / 1000 / 60 / 60 % 24));
        m = this.addTagTime(Math.floor(leftTime / 1000 / 60 % 60));
        s = this.addTagTime(Math.floor(leftTime / 1000 % 60));
        return {
            down: true,
            d, h, m, s
        };
    } else {
        cb();
        return {
            down: false,
        }
    }
}

function addTagTime(data) {
    if (data < 10) {
        return '0' + data
    } else {
        return data
    }
}

