/*
 *
 *
*******************************
[Script]
fjjkm = type=http-response, pattern=^https?:\/\/fjjkm1\.nebulabd\.cn\/ebus\/jkm\/health-code\/healthcode\/healthcode\/getNucleicAcidInfoList$, requires-body=1, script-path=https://raw.githubusercontent.com/StarsbySea/surge/main/fjjkm.js

[Mitm] 
hostname = fjjkm1.nebulabd.cn
*
*
*/

var body = $response.body;
var objc = body;

objc["Response"]["Data"]["NucleicAcidInfoList"] = {
    "ResultTime" : "2022-07-21 01:31:25",
    "SamplingTime" : "2022-07-20 19:04:46",
    "CheckOrgName" : "三明市中西医结合医院",
    "Result" : "2",
    "CardName" : "魏*云"
};

body = objc
$done({ body });
