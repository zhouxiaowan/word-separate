const express = require('express');
const app = express();
app.use('/', function (req, res) {
    res.header("Access-Control-Allow-Origin", "http://172.21.39.76:8080"); //项目上线后改成页面的地址
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.send({
        best_match_result: {
            "match_source": 0,
            "score": 70.70113,
            "source": {
                "city": "扬州市",
                "community": "贾桥社区",
                "county": "邗江区",
                "hamlet": "",
                "location": [
                    119.387927,
                    32.385495
                ],
                "paichusuo": "邗上派出所",
                "road": "望月路",
                "village": "邗上街道"
            }
        },
        rest_match_result: [{
                "match_source": 0,
                "score": 68.60188,
                "source": {
                    "city": "扬州市",
                    "community": "文昌社区",
                    "county": "邗江区",
                    "hamlet": "",
                    "location": [
                        119.387927,
                        32.385495
                    ],
                    "paichusuo": "邗上派出所",
                    "road": "望月路",
                    "village": "邗上街道"
                }
            },
            {
                "match_source": 0,
                "score": 68.60188,
                "source": {
                    "city": "扬州市",
                    "community": "文昌社区",
                    "county": "邗江区",
                    "hamlet": "",
                    "location": [
                        119.387927,
                        32.385495
                    ],
                    "paichusuo": "",
                    "road": "望月路",
                    "village": "邗上街道"
                }
            }
        ],

        dataList: [{
                best_match_source: 0,
                score: 70.70113,
                source: {
                    city: "扬州市",
                    community: "贾桥社区",
                    county: "邗江区",
                    hamlet: "",
                    location: [119.387927, 32.385495],
                    paichusuo: "邗上派出所",
                    road: "望月路",
                    village: "邗上街道"
                }
            },
            {
                best_match_source: 0,
                score: 68.60188,
                source: {
                    city: "扬州市",
                    community: "文昌社区",
                    county: "邗江区",
                    hamlet: "",
                    location: [119.387927, 32.385495],
                    paichusuo: "邗上派出所",
                    road: "望月路aaaaaaaa",
                    village: "邗上街道"
                }
            },
            {
                best_match_source: 0,
                score: 68.60188,
                source: {
                    city: "扬州市",
                    community: "文昌社区",
                    county: "邗江区",
                    hamlet: "",
                    location: [119.387927, 32.385495],
                    paichusuo: "hahahahahah",
                    road: "望月路",
                    village: "邗上街道"
                }
            }
        ],
        result: [{
                "end": 2,
                "start": 0,
                "word": "望月路"
            },
            {
                "end": 6,
                "start": 3,
                "word": "全季酒店"
            }
        ]
    });
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});