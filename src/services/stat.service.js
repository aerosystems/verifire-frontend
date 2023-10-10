import api from "./api";

let defaultColors = new Map([
    ['blacklist', 'rgba(0,45,94,0.6)'],
    ['whitelist', 'rgba(60,154,0,0.6)'],
    ['undefined', 'rgba(218,109,0,0.6)'],
    ['error', 'rgba(255,26,26,0.6)'],
]);

class StatService {
    constructor(projectToken, startTime, endTime, limit, offset) {
        this.dataByHour = new Map([]);
        this.dataByDay = new Map([]);
        this.totalData = new Map([
            ['whitelist', 0],
            ['blacklist', 0],
            ['undefined', 0],
            ['error', 0]
        ]);
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

    getResponsesData(scale) {
        let labels = [];
        let datasets = [];

        if (scale === 'day') {
            this.dataByDay.forEach((value, key) => {
                const date = new Date(key);
                labels.push(date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear());
            });
        } else {
            this.dataByHour.forEach((value, key) => {
                const date = new Date(key);
                labels.push(date.getHours() + ':00');
            });
        }

        this.totalData.forEach((value, key) => {
            let dataset = {
                label: key,
                data: [],
                borderWidth: 0,
            };
            if (scale === 'day') {
                this.dataByDay.forEach((value) => {
                    dataset.data.push(value.get(dataset.label));
                });
            } else {
                this.dataByHour.forEach((value) => {
                    dataset.data.push(value.get(dataset.label));
                });
            }
            datasets.push(dataset);
        });

        return {
            labels: labels,
            datasets: datasets
        };
    }

    getTotalErrorData() {
        let labels = [];
        let dataset = {
            data: [],
            borderWidth: 0,
        };

        this.totalErrors.forEach((value, key) => {
            labels.push(key);
            dataset.data.push(value);
        });

        return {
            labels: labels,
            datasets: [
                dataset,
            ]
        };
    }
    getTotalResponsesData() {
        let labels = [];
        let dataset = {
            backgroundColor: [],
            data: [],
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

    parseEvents(events) {
        events.forEach(event => {
            if (!event.createdAt) {
                return;
            }

            if (event.domainType) {
                const domainType = event.domainType;
                this.totalData.set(domainType, (this.totalData.get(domainType) || 0) + 1);

                const keyHour = this.getKeyHour(event.createdAt);
                const copy = this.dataByHour.get(keyHour).get(domainType) || 0;
                this.dataByHour.get(keyHour).set(domainType, copy + 1);

                const keyDay = this.getKeyDay(event.createdAt);
                this.dataByDay.get(keyDay).set(domainType, (this.dataByDay.get(keyDay).get(domainType) || 0) + 1);
            }

            if (event.errorCode) {
                const eventErrorCode = event.errorCode;
                this.totalErrors.set(eventErrorCode, (this.totalErrors.get(eventErrorCode) || 0) + 1);
                this.totalData.set('error', (this.totalData.get('error') || 0) + 1);

                const keyHour = this.getKeyHour(event.createdAt);
                this.dataByHour.get(keyHour).set('error', (this.dataByHour.get(keyHour).get('error') || 0) + 1);

                const keyDay = this.getKeyDay(event.createdAt);
                this.dataByDay.get(keyDay).set('error', (this.dataByDay.get(keyDay).get('error') || 0) + 1);
            }
        });
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

    initDataByHour(timeStart, timeEnd) {
        let time = new Date(timeStart);
        time.setMilliseconds(0);
        time.setSeconds(0);
        time.setMinutes(0);
        while (time < timeEnd) {
            this.dataByHour.set(time.toISOString(), new Map([
                ['whitelist', 0],
                ['blacklist', 0],
                ['undefined', 0],
                ['error', 0]
            ]));
            time.setHours(time.getHours() + 1);
        }
    }

    initDataByDay(timeStart, timeEnd) {
        let time = new Date(timeStart);
        time.setMilliseconds(0);
        time.setSeconds(0);
        time.setMinutes(0);
        time.setHours(0);
        while (time < timeEnd) {
            this.dataByDay.set(time.toISOString(), new Map([
                ['whitelist', 0],
                ['blacklist', 0],
                ['undefined', 0],
                ['error', 0]
            ]));
            time.setDate(time.getDate() + 1);
        }
    }
}

export default StatService;