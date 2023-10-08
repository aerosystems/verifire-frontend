import api from "./api";

let defaultColors = new Map([
    ['blacklist', 'rgba(0,45,94,0.6)'],
    ['whitelist', 'rgba(60,154,0,0.6)'],
    ['undefined', 'rgba(218,109,0,0.6)'],
    ['error', 'rgba(255,26,26,0.6)'],
]);

const defaultDatasetResponses = new Map([
    ['blacklist', 0],
    ['whitelist', 0],
    ['undefined', 0],
    ['error', 0]
]);

class StatService {
    constructor(projectToken, startTime, endTime, limit, offset) {
        this.dataByHour = new Map([]);
        this.dataByDay = new Map([]);
        this.totalData = defaultDatasetResponses;
        this.totalErrors = new Map([]);
        this.projectToken = projectToken;
        this.startTime = startTime;
        this.endTime = endTime;
        this.limit = limit;
        this.offset = offset;
        this.initDataByHour(startTime, endTime);
        this.initDataByDay(startTime, endTime);
    }

    getEvents() {
        return new Promise((resolve, reject) => {
                api.get('/stat/v1/events',
                    {
                        params: {
                            projectToken: this.projectToken,
                            startTime: this.startTime,
                            endTime: this.endTime,
                            limit: this.limit,
                            offset: this.offset,
                        },
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                        }
                    })
                    .then(response => {
                        this.parseEvents(response.data.data);
                        resolve();
                    })
                    .catch(error => {
                        reject(error);
                    });
        });
    }

    getPolarData() {
        let labels = [];
        let dataset = {
            backgroundColor: [],
            data: [],
            label: 'Responses',
            borderWidth: 0,
        };

        this.totalData.forEach((value, key) => {
            labels.push(key);
            dataset.backgroundColor.push(defaultColors.get(key));
            dataset.data.push(value);
        });

        return {
            labels: labels,
            datasets: [
                dataset,
            ]
        };
    }

    getKeyHour(date) {
        const keyHourDate = new Date(date);
        keyHourDate.setMinutes(0);
        keyHourDate.setSeconds(0);
        return keyHourDate.toISOString();
    }

    getKeyDay(date) {
        const keyDayDate = new Date(date);
        keyDayDate.setHours(0);
        keyDayDate.setMinutes(0);
        keyDayDate.setSeconds(0);
        return keyDayDate.toISOString();
    }

    parseEvents(events) {
        events.forEach(event => {
            if (!event.createdAt) {
                return;
            }
            if (event.domainType) {
                const domainType = event.domainType;
                this.totalData.set(domainType, (this.totalData.get(domainType) || 0) + 1);

                const keyHour = this.getKeyHour(event.createdAt);
                console.log("1:", domainType, keyHour, this.dataByHour.get(keyHour));
                if (this.dataByHour.has(keyHour)) {
                    this.dataByHour.get(keyHour).set(domainType, (this.dataByHour.get(keyHour).get(domainType) || 0) + 1);
                } else {
                    this.dataByHour.set(keyHour, defaultDatasetResponses);
                    this.dataByHour.get(keyHour).set(domainType, 1);
                }
                console.log("2:", domainType, keyHour, this.dataByHour.get(keyHour));

                const keyDay = this.getKeyDay(event.createdAt);
                if (this.dataByDay.has(keyDay)) {
                    if (this.dataByDay.get(keyDay).has(domainType)) {
                        this.dataByDay.get(keyDay).set(domainType, this.dataByDay.get(keyDay).get(domainType) + 1);
                    } else {
                        this.dataByDay.get(keyDay).set(domainType, 1);
                    }
                } else {
                    this.dataByDay.set(keyDay, defaultDatasetResponses);
                    this.dataByDay.get(keyDay).set(domainType, 1);
                }
            }

            if (event.errorCode) {
                const eventErrorCode = event.errorCode;
                if (this.totalErrors.has(event.errorCode)) {
                    this.totalErrors.set(eventErrorCode, this.totalErrors.get(eventErrorCode) + 1);
                } else {
                    this.totalErrors.set(eventErrorCode, 1);
                }

                if (this.totalData.has('error')) {
                    this.totalData.set('error', this.totalData.get('error') + 1);
                } else {
                    this.totalData.set('error', 1);
                }

                const keyHour = this.getKeyHour(event.createdAt);
                if (this.dataByHour.has(keyHour)) {
                    if (this.dataByHour.get(keyHour).has('error')) {
                        this.dataByHour.get(keyHour).set('error', this.dataByHour.get(keyHour).get('error') + 1);
                    } else {
                        this.dataByHour.get(keyHour).set('error', 1);
                    }
                } else {
                    this.dataByHour.set(keyHour, defaultDatasetResponses);
                    this.dataByHour.get(keyHour).set('error', 1);
                }

                const keyDay = this.getKeyDay(event.createdAt);
                if (this.dataByDay.has(keyDay)) {
                    if (this.dataByDay.get(keyDay).has('error')) {
                        this.dataByDay.get(keyDay).set('error', this.dataByDay.get(keyDay).get('error') + 1);
                    } else {
                        this.dataByDay.get(keyDay).set('error', 1);
                    }
                } else {
                    this.dataByDay.set(keyDay, defaultDatasetResponses);
                    this.dataByDay.get(keyDay).set('error', 1);
                }
            }
        });

    }

    initDataByHour(timeStart, timeEnd) {
        let time = new Date(timeStart);
        time.setMilliseconds(0);
        time.setSeconds(0);
        time.setMinutes(0);
        while (time < timeEnd) {
            this.dataByHour.set(time.toISOString(), defaultDatasetResponses);
            time.setHours(time.getHours() + 1);
        }

        console.log(this.dataByHour)
    }

    initDataByDay(timeStart, timeEnd) {
        let time = new Date(timeStart);
        time.setMilliseconds(0);
        time.setSeconds(0);
        time.setMinutes(0);
        time.setHours(0);
        while (time < timeEnd) {
            this.dataByDay.set(time.toISOString(), defaultDatasetResponses);
            time.setDate(time.getDate() + 1);
        }
    }
}

export default StatService;