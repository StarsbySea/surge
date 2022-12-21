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
objc["Response"]["Data"]["CaidStatus"] = 2
objc["Response"]["Data"]["NucleicAcidInfoList"] = [
        {
          "Result": "2",
          "TubeType": 1,
          "CrowdType": 19,
          "ResultTime": "2022-12-20 21:20:29",
          "SamplingTime": "2022-12-20 16:37:21",
          "CheckOrgName": "宁德市闽东医院",
          "CardName": "*晓"
        },
        {
          "Result": "2",
          "TubeType": 1,
          "CrowdType": 9,
          "ResultTime": "2022-12-14 05:37:55",
          "SamplingTime": "2022-12-13 20:25:30",
          "CheckOrgName": "福安市疾控PCR实验室",
          "CardName": "*晓"
        }];
body = JSON.stringify(objc);
$done({ body });
