/*global _, length, plus, minus, multiplyScalar, normalized, dot*/
/*
 Implementation of Gift-Wrapping method
 */
function getConvexHull(points){
    var ret = [];
    var cnt=0;
    
    var cp = _.min(points, function(p, id){return p[1];});
    ret.push(cp);
    var cvec = [1., 0.];

    while(1){
        if(++cnt>points.length)return console.warn("failed.");
        var ncp = _.max(points, function(p){
            if(p==cp)return -Infinity;
            var v = minus(p, cp);
            return dot(normalized(v), cvec)+1.;
        });
        if(ncp==ret[0])return ret;
        cvec = minus(ncp, cp);
        cp = ncp;
        ret.push(ncp);
    }
}
