/*
 *
 *
*******************************
[Script]
fjjkm = type=http-response, pattern=^https?:\/\/fjjkm1\.nebulabd\.cn\/ebus\/jkm\/health-code\/healthcode\/healthcode\/getNucleicAcidInfoList, requires-body=1, max-size=-1, script-path=https://raw.githubusercontent.com/StarsbySea/surge/main/scripts/leave_ptu.js

[Mitm] 
hostname = fjjkm1.nebulabd.cn
*
*
*/

var body = $response.body;
var objc = JSON.parse(body);

objc.items["NucleicAcidInfoList"] = {
    "ResultTime" : "2022-07-21 01:31:25",
    "SamplingTime" : "2022-07-20 19:04:46",
    "CheckOrgName" : "三明市中西医结合医院",
    "Result" : "2",
    "CardName" : "魏*云"
};

body = JSON.stringify(objc);
$done({ body });