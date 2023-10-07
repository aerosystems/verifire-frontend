import api from "./api";
class StatService {
    getEvents(projectToken, startTime, endTime, limit, offset) {
        return api.get('/stat/v1/events',
                {
                    params: {
                        projectToken: projectToken,
                        startTime: startTime,
                        endTime: endTime,
                        limit: limit,
                        offset: offset,
                    },
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                    }
                });
    }
    parseTotalEvents(events) {
        let blacklistCount = 0;
        let whitelistCount = 0;
        let undefinedCount = 0;
        let errorCount = 0;
        events.forEach(event => {
            if (event.type) {
                if (event.type === 'blacklist') {
                    blacklistCount++;
                } else if (event.type === 'whitelist') {
                    whitelistCount++;
                } else  {
                    undefinedCount++;
                }
            }
            if (event.errorCode) {
                if (event.errorCode > 0) {
                    errorCount++;
                }
            }
        });
        return {
            labels: [ 'Blacklist', 'Whitelist', 'Undefined', 'Error' ],
            datasets: [
                {
                    label: 'Responses',
                    backgroundColor: [
                        'rgba(0,45,94,0.6)',
                        'rgba(60,154,0,0.6)',
                        'rgba(218,109,0,0.6)',
                        'rgba(255,26,26,0.6)',
                    ],
                    data: [ blacklistCount, whitelistCount, undefinedCount, errorCount ],
                    borderWidth: 0,
                }
            ]
        }
    }
}

export default new StatService();