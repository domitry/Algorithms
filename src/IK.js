/*global _*/

function IK(tree, options){
    function sub(v1, v2){return [v1[0]-v2[0], v1[1]-v2[1]];}
    function add(v1, v2){return [v1[0]+v2[0], v1[1]+v2[1]];}
    function mul(v1, c){return [c*v1[0], c*v1[1]];}
    function len(v){return Math.sqrt(v[0]*v[0] + v[1]*v[1]);}

    function init(t){
        _.each(t.c, function(c){
            c.len = len([c.x-t.x, c.y-t.y]);
            c.p = t;
            init(c);
        });
    }

    function back(t){
        var targets = _.map(t.c, function(c){return back(c);});
        var selected = _.select(targets.concat([t.target]), function(xy){return !_.isUndefined(xy);});

        if(selected.length>0){
            var target;
            if(selected.length==1)target = selected[0];
            else{
                //centroid
                target = mul(_.reduce(selected, function(memo, v){return add(memo, v);}, [0,0]), 1./selected.length);
            };

            var ns = undefined;
            if(!_.isUndefined(t.p)){
                var s = [t.p.x, t.p.y];
                var d = [t.x, t.y];
                ns = sub(target, mul(sub(target, s), t.len/len(sub(s, target))));
            }

            t.x = target[0];
            t.y = target[1];
            return ns;
        }else return undefined;
    }

    function forward(t, target){
        _.each(t.c, function(c){
            var s = [c.x, c.y];
            var d = [t.x, t.y];
            var ns = sub(target, mul(sub(target, s), c.len/len(sub(target, s))));
            forward(c, ns);
        });

        t.x = target[0];
        t.y = target[1];
    }

    var start = [tree.x, tree.y];
    init(tree);
    
    _(1000).times(()=>{
        back(tree);
        forward(tree, start);
    });

    return tree;
}
