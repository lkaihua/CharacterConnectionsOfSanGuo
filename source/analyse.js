'use strict';

var _ = require('underscore')._;
var fs = require('fs');
var path = '/../c/';

function handleTable(){
    var file = fs.readFileSync(__dirname + '/4399.html', 'utf8');
    var rule = /<strong>([^<]*)<\/strong>/g;
    var result = [];
    _.each(file.split(/rowspan="3|4"/), function(item){
        var names = item.match(rule);
        var clean = [];
        // do clean business
        _.each(names, function(item){
            item = item.replace(/<\/?strong>/ig, '');
            // group: "张飞、赵云"
            clean.push(item);
        })
        result.push(clean)
    })

    return result;
    

}

// handleTable();

function outputJs(arr){
    // 新建 c/{{index}}.js
    _.each(arr, function(item, index){
        if(!item[0]){
            return true;
        }
        fs.writeFile(
            __dirname + path + index + '.js', 
            //["刘备","孙尚香","法正","孟获、祝融");
            //define("刘备",["孙尚香","法正","孟获","祝融"]);
            'define("' + item.shift() + '", ["' + item.join('、').split('、').join('","') + '"]);',
            'utf8',
            function (err) {
                if (err) throw err;
                // console.log('done');
            }
        )
    })
}

// Test sccuess:
// outputJs([
//     ["刘备","孙尚香"]
// ])
var c = handleTable();
outputJs(c);
