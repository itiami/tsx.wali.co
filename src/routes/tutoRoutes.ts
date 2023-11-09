import { Router } from 'express';
import * as childProcess from '../tuto/child_process';
import * as osNet from '../tuto/os_network';
import * as fsReadWriteDelete from "../tuto/fs_read.write.delete";
import * as reqBody from '../tuto/req_body';



const router: Router = Router();


router.get("/", childProcess.exe_inline);
router.get("/execReqBody", childProcess.exec_reqBody);
router.get("/spawnInline", childProcess.spawn_inline);
router.get("/spawnReqBody", childProcess.spawnReqBody);
router.get("/execFile", childProcess.processExecFile);

router.get("/dnsLookup", osNet.dnsLookup);
router.get("/netLookup", osNet.netLookup);
router.get("/sysDetail", osNet.sysDetail);

router.get("/readFile", fsReadWriteDelete.readFile);
router.get("/writeFile", fsReadWriteDelete.writeToFile);
router.get("/delFiles", fsReadWriteDelete.delFiles);

router.post("/reqBody", reqBody.nestedJson_4)


export default router;