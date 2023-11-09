import { Request, Response } from "express";
import { rejects } from "node:assert";
import process from "node:child_process";
import { error } from "node:console";
import os from "node:os";
import { stderr, stdout } from "node:process";



export const exe_inline = async (req: Request, res: Response) => {
    const cmd = "lsof -i -P -n | grep LISTEN";

    res.setHeader('content-type', 'text/plain');

    await process.exec(
        cmd,
        ((error: process.ExecException | null, stdout: string, stderr: string) => {
            if (error) {
                console.log({
                    "ErrorCode: ": error.code,
                    "ErrorCMD: ": error.cmd,
                    "ErrorMessage: ": error.message,
                });

                res.status(404).send({
                    "ErrorCode: ": error.code,
                    "ErrorCMD: ": error.cmd,
                    "ErrorMessage: ": error.message,
                });
            };

            if (stdout) {
                console.log(stdout);
                res.status(201).send("\nResults: " + stdout)
            };
            if (!error && stderr) {
                console.log(stderr);
                res.status(404).send("\nError Execution.. " + cmd)
            };
        }),
    )
};



export const exec_reqBody = async (req: Request, res: Response) => {
    const { shellCmd } = req.body

    res.setHeader('content-type', 'text/plain');

    if (os.platform() === "linux") {
        await process.exec(shellCmd, (err, result) => {
            if (!err) {
                console.log(req.body);
                res.send(`${result}`)
            } else {
                res.send("Can't Execute the Command..")
            }
        })

    } else if (os.platform() === "win32") {

        try {
            const result = await forWinPowershell(shellCmd);
            res.send(result);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }

    } else if (os.platform() === "darwin") {

        await process.exec(shellCmd, (err, result) => {
            if (!err) {
                console.log(req.body);
                res.send(`${result}`)
            } else {
                res.send("Can't Execute the Command..")
            }
        })
    }
}


const forWinPowershell = (command: string) => {
    return new Promise((resolve, reject) => {
        const child = process.spawn('powershell.exe', [command]);

        let output = '';
        let errorOutput = '';

        child.stdout.on('data', (data) => {
            output += data.toString();
        });

        child.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        child.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(errorOutput));
            } else {
                resolve(output);
            }
        });
    });
};





export const spawn_inline = async (req: Request, res: Response) => {
    const shellCmd = process.spawn("ls", ["-la", "/root"]);

    res.setHeader('content-type', 'text/plain');

    shellCmd.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        res.send(`stdout: ${data}`);
    });

    shellCmd.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        res.send(`stderr: ${data}`);
    });
}

export const spawnReqBody = async (req: Request, res: Response) => {

    const { shellCmd, option } = req.body;

    res.setHeader('content-type', 'text/plain');

    const command = process.spawn(shellCmd, option);


    command.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        res.send(`stdout: ${data}`);
    });

    command.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        res.send(`stderr: ${data}`);
    });
}


export const processExecFile = async (req: Request, res: Response) => {
    res.setHeader('content-type', 'text/plain');
    res.send(await readShFile());
}


const readShFile = (() => {

    const file = __dirname + "/process.sh";

    return new Promise((resolve, reject) => {

        let output = '';
        let errorOutput = '';

        process.execFile(file, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                errorOutput += (error);
            }

            if (stdout) {
                console.log(`${stdout}`);
                output += (`${stdout}`);
            }

            if (!error && stderr) {
                console.log(`${stderr}`);
                errorOutput += (`${stderr}`);
            }
        })
            .on("close", data => {
                if (data !== 0) {
                    return reject(new Error("Path Incorrect: " + errorOutput));
                } else {
                    return resolve(output);
                }
            });
    })
})