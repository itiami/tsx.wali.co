import { Request, Response } from "express";
import dns, { ADDRCONFIG, Resolver, V4MAPPED } from "node:dns";
//import dns from "node:dns/promises";
import net from 'node:net';
import os, { NetworkInterfaceInfo } from 'node:os';


export const dnsLookup = async (req: Request, res: Response) => {
    const addr: string[] = await dns.getServers(); //"192.168.1.1"
    const resolver: dns.Resolver = new dns.Resolver();
    //console.log(resolver.getServers());


    await dns.lookup("google.com", 6, (err, address, family) => {
        if (err) console.log(err);
        console.log({
            Address: address,
            AddressFamily: family
        });

        res.status(201).json({
            Address: address,
            AddressFamily: family
        });
    })
}


export const netLookup = async (req: Request, res: Response) => {
    //res.setHeader('content-type', 'text/plain');
    const ip = new net.Server();
    console.log(ip);
    res.status(201).json(ip)
}


export const sysDetail = async (req: Request, res: Response) => {
    const load = os.loadavg();

    function netCard() {
        const inf: NodeJS.Dict<os.NetworkInterfaceInfo[]> = os.networkInterfaces();
        const arr: string[] = [];
        if (os.platform() === "linux") {
            console.log(inf.ens33);
            inf.ens33?.forEach(el => {
                console.log(el.address);
                el.family === "IPv4" ? arr.push(el.address) : ""
            })
        }
        return arr;
    }


    res.status(201).json({
        hostname: os.hostname(),
        homeDir: os.homedir(),
        totalMemory: Math.round(os.totalmem() / (1024 * 1024 * 1024)) + "gb",
        freeMemory: Math.round(os.freemem() / (1024 * 1024 * 1024)) + "gb",
        platform: os.platform(),
        architecture: os.arch(),
        osVersion: os.version(),
        osRelease: os.release(),
        osMachine: os.machine(),
        cores: Array.isArray(os.cpus()) ? os.cpus().length : null,
        cpu: os.cpus().map(cpu => `Model: ${cpu.model}, Speed:${cpu.speed}`),
        cpuLoad: {
            load_1: load[0],
            load_2: load[1],
            load_3: load[2],
        },
        networkInterfaces: netCard(),
        userName: os.userInfo().username,
        userHomeDir: os.userInfo().homedir,
        pid: os.getPriority(),
    })
}


export const nPerformance = async (req: Request, res: Response) => {
    res.status(201).json({
        timenowIn_ms: (performance.now() % 1000).toFixed(3),
        browser_agent: req.headers["user-agent"],
        host: req.headers.host
    });
}