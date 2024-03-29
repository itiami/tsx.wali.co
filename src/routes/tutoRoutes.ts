import { Router } from 'express';
import * as childProcess from '../tuto/child_process';
import * as osNet from '../tuto/os_network';
import * as fsReadWriteDelete from "../tuto/fs_read.write.delete";
import * as reqBody from '../tuto/req_body';
import * as asyncTest from "../tuto/async_promise";
import * as scrapper from "../tuto/data_scrapper/pupeteer";



const router: Router = Router();

// Tuto -  Executing Linux Commands by NodeJS process Class
router.get("/", childProcess.exe_inline);
router.get("/execReqBody", childProcess.exec_reqBody);
router.get("/spawnInline", childProcess.spawn_inline);
router.get("/spawnReqBody", childProcess.spawnReqBody);
router.get("/execFile", childProcess.processExecFile);

// Tuto -  Networkin Test by NodeJS dns,net,os,NetworkInterfaceInfo etc class 
router.get("/dnsLookup", osNet.dnsLookup);
router.get("/netLookup", osNet.netLookup);
router.get("/sysDetail", osNet.sysDetail);
router.get("/performance", osNet.nPerformance);

// Tuto -  how to pass json in req.body
router.get("/readFile", fsReadWriteDelete.readFile);
router.get("/writeFile", fsReadWriteDelete.writeToFile);
router.get("/delFiles", fsReadWriteDelete.delFiles);
router.get("/createIface", fsReadWriteDelete.createInterface);

// Tuto -  how to pass json in req.body
router.post("/reqBody", reqBody.nestedJson_4)

// Tuto - Async/Wait and Promise
router.get("/timeOut", asyncTest.timeOut);
router.get("/async", asyncTest.testAsync);
router.get("/promise", asyncTest.newPromise);


// Web_Data Scrapper
router.get("/pupeteer", scrapper.byPupeteer);

export default router;