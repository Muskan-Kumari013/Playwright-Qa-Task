import http from 'k6/http';
import { check, sleep } from 'k6';

//Configuration for the Performance test 

export const option = {
    stages: [
        { duration: '30s', target: 10 }, //Ramp up to 10 users in 30 seconds
        { duration: '1m', target: 10 },  //Hold at 10 users for 1 minute
        { duration: '30s', target: 0 },  //Ramp down to 0 users in 30 seconds
    ],
};

const baseurl = 'https://www.polestar.com/us';

//Test scenario

export default function () {
    //send a GET request to the base URL
    const res = http.get(baseurl);

    //check response status and content
    check(res, {
        'status is 200': (r) => r.status === 200,
        'content includes Polestar': (r) => typeof r.body === 'string' && r.body.includes('Polestar'),

    });
    //Simulate some user interaction delay
    sleep(1);
}