const {google} = require('googleapis')
require('dotenv').config()
const moment = require('moment')

const CREDENTIALS = JSON.parse(process.env["CREDENTIALS"])
const calendarId = process.env["CALENDAR_ID"]

const SCOPES = 'https://www.googleapis.com/auth/calendar'
const calendar = google.calendar({version: "v3"})

const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
)

// Get all the events between two dates
const getEvents = async (dateTimeStart, dateTimeEnd) => {

    try {
        let response = await calendar.events.list({
            auth: auth,
            calendarId: calendarId,
            timeMin: dateTimeStart,
            timeMax: dateTimeEnd,
            timeZone: 'Asia/Kolkata'
        });

        let items = response['data']['items'];
        return items;
    } catch (error) {
        console.log(`Error at getEvents --> ${error}`);
        return 0;
    }
};

const start = moment().format("YYYY-MM-DDT00:01:00Z");
const end = moment().format("YYYY-MM-DDT23:59:00Z")

getEvents(start, end)
    .then((res) =>{
        console.log(res);
        // const summary = res.summary
        // const startTime = res.start.dateTime
        // const endTime = res.end.dateTime
    })
    .catch((err) => {
        console.log(err);
    })