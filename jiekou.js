const express = require('express');
const app = express();
app.use('/', function (req, res) {
    res.header("Access-Control-Allow-Origin", "http://10.9.74.145:8080"); //项目上线后改成页面的地址
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.send({
        best_match_result: {
            "match_source": 0,
            "paichusuo": "小官庄派出所",
            "score": 70.70113,
            "source": {
                "city": "扬州市",
                "community": "贾桥社区",
                "county": "邗江区邗江区",
                "hamlet": "",
                "location": [
                    119.387927,
                    32.385495
                ],
                "paichusuo": "小官庄派出所",
                "road": "观南路",
                "village": "小官庄镇"
            }
        },
        rest_match_result: [{
                "match_source": 0,
                "paichusuo": "邗上派出所",
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
                "paichusuo": "邗上派出所",
                "score": 68.60188,
                "source": {
                    "city": "扬州市",
                    "community": "文昌社区",
                    "county": "邗江区文昌社区",
                    "hamlet": "",
                    "location": [
                        119.387927,
                        32.385495
                    ],
                    "paichusuo": "",
                    "road": "望月路文昌社区",
                    "village": "邗上街道文昌社区"
                }
            },
            {
                "match_source": 0,
                "paichusuo": "邗上派出所",
                "score": 68.60188,
                "source": {
                    "city": "扬州市",
                    "community": "文昌社区",
                    "county": "邗江区文昌社区",
                    "hamlet": "",
                    "location": [
                        119.387927,
                        32.385495
                    ],
                    "paichusuo": "",
                    "road": "望月路文昌社区",
                    "village": "邗上街道文昌社区"
                }
            },
            {
                "match_source": 0,
                "paichusuo": "邗上派出所",
                "score": 68.60188,
                "source": {
                    "city": "扬州市",
                    "community": "文昌社区",
                    "county": "邗江区文昌社区",
                    "hamlet": "",
                    "location": [
                        119.387927,
                        32.385495
                    ],
                    "paichusuo": "",
                    "road": "望月路文昌社区",
                    "village": "邗上街道文昌社区"
                }
            }
        ],
        result: [{
            "tag": 0,
            "word": "\u5168\u5b63\u9152\u5e97"
        }, {
            "tag": 1,
            "word": "\u65c1\u8fb9\u7684"
        }, {
            "tag": 0,
            "word": "\u7684\u9f99\u867e\u5e97"
        }, {
            "tag": 1,
            "word": "\u65c1\u8fb9\u7684\u9f99\u867e\u5e97"
        }]
    });
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});