import { Request, Response } from "express";


/* in Postman
{
    "user": {
        "name": "John Doe",
        "email": "john@example.com",
        "address": {
            "street": "123 Main St",
            "city": "Anytown",
            "zipCode": "12345"
        }
    },
    "product":{
        "name": "iPhoneX",
        "model": 2013
    }
}
*/



export const nestedJson_1 = async (req: Request, res: Response) => {
    const user = req.body.user;
    const { city } = req.body.user.address;
    console.log(user);
    console.log({ city });
}
// output..
/* 
for user...........
    {
    name: 'John Doe',
    email: 'john@example.com',
    address: { street: '123 Main St', city: 'Anytown', zipCode: '12345' }
    }
for city...............
    { city: 'Anytown' }

*/


export const nestedJson_2 = async (req: Request, res: Response) => {
    const userName = req.body.user.name;
    const userEmail = req.body.user.email;
    const userStreetAddress = req.body.user.address.street;
    res.status(200).send({
        Name: userName,
        Email: userEmail,
        Street: userStreetAddress
    })
}
// output..
/* {
    "Name": "John Doe",
    "Email": "john@example.com",
    "Street": "123 Main St"
} */




export const nestedJson_3 = async (req: Request, res: Response) => {
    const { name, email } = req.body.user;
    const { street } = req.body.user.address;
    res.status(200).send({
        Name: name,
        Email: email,
        Street: street
    })
}

// output..
/* {
    "Name": "John Doe",
    "Email": "john@example.com",
    "Street": "123 Main St"
} */


export const nestedJson_4 = async (req: Request, res: Response) => {
    const { name, email } = req.body.user;
    const { street } = req.body.user.address;
    const productDt = {
        name: req.body.product.name,
        model: req.body.product.model
    };
    res.status(200).send({
        Name: name,
        Email: email,
        Street: street,
        product: productDt
    })
}

// output..
/* {
    "Name": "John Doe",
    "Email": "john@example.com",
    "Street": "123 Main St",
    "product": {
        "name": "iPhoneX",
        "model": 2013
    }
} */