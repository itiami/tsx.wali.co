import { Request, Response } from "express";
import axios from "axios";


function timeIn3decimal() {
    // Get the current date and time
    const now = new Date();

    // Format the date and time in Paris timezone
    const parisTime = new Intl.DateTimeFormat('fr-FR', {
        timeZone: 'Europe/Paris',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).format(now);

    // Get milliseconds part with three decimal points
    const milliseconds = (performance.now() % 1000).toFixed(3);

    // Combine the formatted date and time with milliseconds
    return `${parisTime}.${milliseconds.split('.')[1]}`;
}



export const timeOut = async (req: Request, res: Response) => {
    console.log("\n");

    console.log("Time Before : ", timeIn3decimal());

    setTimeout(() => {
        console.log("Time Inside: ", timeIn3decimal());
    }, 2000);

    console.log("Time After: ", timeIn3decimal());

    res.send("setTimeOut fn..")
}

// output...
/* 
Time Before :  11/10/2023, 19:22:30.785
Time After:  11/10/2023, 19:22:32.890
Time Inside:  11/10/2023, 19:22:34.522
*/


// pushing the asyncWaitFn() to the browser
export const testAsync = async (req: Request, res: Response) => {
    console.log("\n");
    console.log("Time Before asios.get(): ", timeIn3decimal());
    asyncWaitFn().then(data => {
        console.log(data)
        res.status(201).json(data)
    })
    console.log("Time After asios.get(): ", timeIn3decimal());
}


// async function
async function asyncWaitFn() {
    return await axios.get(
        "https://hub.dummyapis.com/delay?seconds=5",
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    ).then((results: any) => {
        return ({
            result: results.data,
            time: timeIn3decimal()
        })

    }).catch((error: any) => {
        return ({
            message: "Unable to fetch",
            time: timeIn3decimal()
        })
    });
}


export const newPromise = async (req: Request, res: Response) => {
    console.log("\n");
    console.log("Time before axios.get(): ", timeIn3decimal());
    let promise = new Promise((resolve, rejects) => {
        asyncWaitFn().then((dt: any) => {
            if (dt.message === "Unable to fetch") {
                rejects(dt);
            } else {
                resolve(dt)
            }
        })
    });

    promise.then(dt => {
        console.log(dt);
        res.send(dt)
    }).catch((error: any) => {
        console.log(error.message);
        res.send(error.message)
    })

    console.log("Time After axios.get(): ", timeIn3decimal());
}

// output..
/* 
for resolve(dt).......................
Time before axios.get():  11/10/2023, 21:46:53.923
Time After axios.get():  11/10/2023, 21:46:54.832
{
  result: 'This response has been delayed for 5 seconds',
  time: '11/10/2023, 21:46:59.141'
}

for reject(dt)..........................

if reject - then the reject(dt) is handled with promise.catch(). 
if not will get error "UnhandledPromiseRejection"
Time before axios.get():  11/10/2023, 21:42:46.061
Time After axios.get():  11/10/2023, 21:42:48.934
Unable to fetch
*/
