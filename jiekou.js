const express = require('express');
const app = express();
app.use('/', function (req, res) {
    res.header("Access-Control-Allow-Origin", "http://10.9.74.16:8080"); //项目上线后改成页面的地址
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.send({
        best_match_result: {
            'match_source': 0,
            'source': {
                'village': '真州镇',
                'county': '仪征市',
                'hamlet': '国税局宿舍',
                'road': '真州西路',
                'community': '万年社区',
                'location': [119.175628, 32.278176],
                'city': '扬州市',
                'paichusuo': '胥浦派出所'
            },
            'score': 111.7288,
            'paichusuo': '胥浦派出所'
        },
        rest_match_result: [{
            'match_source': 0,
            'source': {
                'village': '真州镇',
                'community': '梓橦社区',
                'hamlet': '国税局宿舍',
                'road': '东园北路',
                'county': '仪征市',
                'location': [119.187867, 32.276398],
                'city': '扬州市',
                'paichusuo': '城北派出所'
            },
            'score': 105.18436,
            'paichusuo': '城北派出所'
        }, {
            'match_source': 0,
            'source': {
                'village': '安宜镇',
                'community': '安民社区',
                'hamlet': '国税局宿舍',
                'road': '健康路',
                'county': '宝应县',
                'location': [119.315055, 33.245894],
                'city': '扬州市',
                'paichusuo': '城北派出所'
            },
            'score': 105.18436,
            'paichusuo': '城北派出所'
        }],
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
        }],
        // attention: [{
        //     'value': '北京市朝阳区北京工业大学',
        //     'value': '1'
        // }, {
        //     'label': '河北省石家庄市石家庄',
        //     'value': '2'
        // }, {
        //     'label': '河北省邯郸市永年',
        //     'value': '3'
        // }, {
        //     'label': '北京市朝阳区',
        //     'value': '4'
        // }, {
        //     'label': '上海',
        //     'value': '5'
        // }, {
        //     'label': '广州',
        //     'value': '6'
        // }],
        attention: ['北京市朝阳区', '北京市海淀区', '上海', '广州'],
        result2: {
            "best_match": {
                "address": {
                    "city": "扬州市",
                    "community": "弘桥社区",
                    "county": "仪征市",
                    "hamlet": "优诗美地",
                    "location": [
                        119.166166,
                        32.265614
                    ],
                    "paichusuo": "",
                    "road": "西园南路",
                    "village": "真州镇街道"
                }
            },
            "rest_match": []
        }
    });
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});