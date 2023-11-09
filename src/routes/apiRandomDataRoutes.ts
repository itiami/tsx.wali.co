import axios from "axios";

import { Router, Request, Response, NextFunction, response } from 'express';
const router: Router = Router();


interface IfaceApiUser {
    gender: String;
    name: {
        title: String;
        first: String;
        last: String;
    };
    location: {
        street: {
            number: Number;
            name: String;
        };
        city: String;
        state: String;
        country: String;
        postcode: String;
        coordinates: {
            latitude: String;
            longitude: String;
        };
        timezone: {
            offset: String;
            description: String;
        }
    };
    email: String;
    login: {
        uuid: String;
        username: String;
        password: String;
        salt: String;
        md5: String;
        sha1: String;
        sha256: String;
    };
    dob: {
        date: String;
        age: Number;
    };
    registered: {
        date: String;
        age: Number;
    };
    phone: String;
    cell: String;
    id: {
        name: String;
        value: String;
    };
    picture: {
        large: String;
        medium: String;
        thumbnail: String;
    };
    nat: String;
}

interface GetUsersResponse extends IfaceApiUser {
    data: IfaceApiUser;
};


async function fetchUsers() {
    try {
        const { data, status } = await axios.get<any>(
            'https://randomuser.me/api/',
            {
                headers: {
                    Accept: 'application/json',
                },
            },
        );

        const toJson = JSON.stringify(data, null, 4);
        //console.log(toJson);

        // 👇️ "response status is: 200"
        console.log('response status is: ', status);

        return data.results[0];

    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}

router.get("/", async (req: Request, res: Response) => {
    await fetchUsers().then(data => {
        res.status(201).json(data)
    })
})



export {
    router as default
}