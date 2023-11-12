# ExpressJS With TypeScript

<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*W4M5bkkF5myqgVI-9t_ZDg.png"/>

## Author: ABDULLAH AL Numan

---

## Project Features

- This is a sample Express.js project template with TypeScript.
- It includes JWT and Crypted Password

## Project Structure

```bash
.
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── _con
│   │   ├── dbcon.ts
│   │   └── mongoCon.ts
│   ├── controllers
│   │   ├── GenericController.ts
│   │   ├── ProductController.ts
│   │   └── UserController.ts
│   ├── middleware
│   │   └── jwt.ts
│   ├── models
│   │   ├── Book.ts
│   │   ├── Category.ts
│   │   ├── Orders.ts
│   │   ├── Payment.ts
│   │   ├── Product.ts
│   │   ├── Profile.ts
│   │   ├── Reviews.ts
│   │   └── User.ts
│   ├── resources
│   │   ├── css
│   │   ├── data
│   │   ├── img
│   │   └── js
│   ├── routes
│   │   ├── apiRandomDataRoutes.ts
│   │   ├── categoryRoutes.ts
│   │   ├── productRoutes.ts
│   │   ├── profileRoutes.ts
│   │   ├── tutoRoutes.ts
│   │   └── userRoutes.ts
│   ├── server.ts
│   ├── tuto
│   │   ├── async_promise.ts
│   │   ├── child_process.ts
│   │   ├── delContent
│   │   ├── fs_read.write.delete.ts
│   │   ├── os_network.ts
│   │   ├── process.sh
│   │   ├── req_body.ts
│   │   ├── sysHealth
│   │   ├── sysInfo_2.sh
│   │   ├── sysInfo.sh
│   │   └── undefine_null.ts
│   └── views
│       └── index.ejs
└── tsconfig.json
```

### Getting Started

Follow these steps to get started with this project:

1. Clone this repository:

   ```bash
   git clone https://github.com/itiami/tsx.wali.co.git
   ```

1. Navigate to the project directory:

   ```bash
   cd tsx.wali.co
   ```

1. Install dependencies:

   ```bash
   npm install
   ```

1. Build the TypeScript code:

   ```bash
   npm start

   > type.ex.wali.co@1.0.0 start
   > nodemon --watch 'src/\*_/_.ts' --exec 'ts-node' src/server.ts

   [nodemon] 2.0.19
   [nodemon] to restart at any time, enter `rs`
   [nodemon] watching path(s): src/\*_/_.ts
   [nodemon] watching extensions: ts,json
   [nodemon] starting `ts-node src/server.ts`
   Server is running on port http://0.0.0.0:3090

   ```
