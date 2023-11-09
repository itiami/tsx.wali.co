// delContent.js
import { Request, Response } from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:child_process';


// fs.unlink() - to delete files from a directory..
export const delFiles = async (req: Request, res: Response) => {
    try {
        const directory = "/var/www/tsex.wali.co/src/tuto/delContent";

        let files: string[] = [];

        (await fs.readdir(directory)).forEach(file => {
            files.push(file);
            console.log(file, " has Deleted");
            fs.unlink(path.join(directory, file));
        })
        if (files.length > 0) {
            res.status(201).json({
                message: "Delete files list are: ",
                files: [...files]
            })
        }
    } catch (err: any) {
        console.log("message: ", err.message);
        res.status(404).json(err.message)
    }

}



// fs.readFile() - with process.execFile()
export const readFile = async (req: Request, res: Response) => {
    res.setHeader("content-type", "text/plain");

    process.execFile(__dirname + "/sysInfo_2.sh", (err, stdout, stderr) => {
        if (err) console.log(err);
        if (stderr) console.log(stderr);
        if (stdout) {
            console.log(stdout);
        }
    })

    res.send(await readDataFile());
}


// fs.readFile()
async function readDataFile() {
    return await fs.readFile(
        __dirname + "/sysHealth/sysInfo.txt",
        (
            { encoding: "utf8" }
        )
    ).then(data => {
        console.log(data);
        return data;
    }).catch(error => {
        console.log(error);
        return error
    });
}



// fs.writeFile - with process.execFile()
export const writeToFile = async (req: Request, res: Response) => {
    res.setHeader("content-type", "text/plain");

    process.execFile(
        __dirname + "/sysInfo.sh",
        (err, stdout, stderr) => {
            if (err) console.log(err);
            if (stderr) console.log(stderr);
            if (stdout) {
                fs.writeFile(__dirname + "/sysHealth/fs.txt", stdout)
                res.status(201).send("Output sysHealth/fs.txt: \n\n" + stdout)
            }
        }
    )
}




