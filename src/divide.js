/*global _*/

function divideToTriangles(points){
    
    function before(i){return (!i ? points.length-1 : i-1);}
    function after(i){return (i == points.length-1 ? 0 : i+1);};
    function sub(p1, p2){return [p1[0]-p2[0], p1[1]-p2[1]];}

    function length2(p){
        return p[0]*p[0]+p[1]*p[1];
    }

    function outer(p1, p2){
        return p1[0]*p2[1] - p1[1]*p2[0];
    }

    function isPointInTriangle(p0, tr){
        var dirs = _.map(tr, function(p1, i){
            var p2 = tr[(i==2? 0 : i+1)];
            var v1 = sub(p0, p1);
            var v2 = sub(p2, p1);
            return outer(v1, v2);
        });
        return (
            _.all(dirs, function(d){return d >= 0;}) ||
                _.all(dirs, function(d){return d < 0;})
        );
    }

    var triangles = [];
    
    while(points.length>3){
        var i1 = _.max(_.range(points.length), function(i){return length2(points[i]);});
        var p1 = points[i1];
        
        var i0 = before(i1);
        var p0 = points[i0];
        
        var i2 = after(i1);
        var p2 = points[i2];
        
        var d1 = outer(sub(p0, p1), sub(p2 ,p1));
        
        if(_.all(points, function(p, i){
            if([i0,i1,i2].indexOf(i) != -1)return true;
            return !isPointInTriangle(p, [p0,p1,p2]);
        })){
            triangles.push([p0, p1, p2]);
            points.splice(i1, 1);
            continue;
        }else{
            var first_i1 = i1;
            
            while(1){
                i2 = i1;
                p2 = p1;
                i1 = i0;
                p1 = p0;
                i0 = before(i1);
                p0 = points[i0];

                if(i1==first_i1){
                    console.warn("Division Failed.");
                    return triangles;
                }

                var d2 = outer(sub(p0, p1), sub(p2 ,p1));
                if(d1*d2 > 0 && _.all(points, function(p, i){
                    if([i0, i1, i2].indexOf(i) != -1)return true;
                    return !isPointInTriangle(p, [p0,p1,p2]);
                })){
                    triangles.push([p0, p1, p2]);
                    points.splice(i1, 1);
                    break;
                }else continue;
            }
        }
    }

    return triangles.concat([points]);
}
