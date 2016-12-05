/*global _, d3*/

function drawSpline(node, p, m, _callback){
    var t = _.range(0, 1.0, 0.01);
    var callback = _.isUndefined(_callback) ? function(){} : _callback;

    function draw(){
        function h00(t){return 2*t*t*t-3*t*t+1;}
        function h10(t){return t*t*t-2*t*t+t;}
        function h01(t){return -2*t*t*t+3*t*t;}
        function h11(t){return t*t*t-t*t;}
        function px(t){return h00(t)*p[0][0]+h10(t)*3*m[0][0]+h01(t)*p[1][0]+h11(t)*3*m[1][0];}
        function py(t){return h00(t)*p[0][1]+h10(t)*3*m[0][1]+h01(t)*p[1][1]+h11(t)*3*m[1][1];}

        var line = d3.svg.line()
                .x(function(d){return px(d);})
                .y(function(d){return py(d);});

        node.selectAll("path").remove();
        node.selectAll("line").remove();
        node.selectAll("circle").remove();

        node.append("path")
            .datum(t)
            .attr({
                stroke: "black",
                "stroke-width": 3,
                fill: "none",
                d: line
            });

        _.each([0, 1], function(i){
            var cattr = {
                r: 10,
                fill: "steelblue",
                stroke: "white",
                "stroke-width": 3,
                draggable: "true"
            };

            node.append("circle")
                .attr(_.extend({
                    cx: p[i][0],
                    cy: p[i][1]
                }, cattr));

            var c = node.append("circle");
            var l = node.append("line");

            c.call(d3.behavior.drag()
                   .on("drag", function(){
                       m[i][0] += d3.event.dx;
                       m[i][1] += d3.event.dy;
                       update();
                   })
                   .on("dragend", function(){
                       node.select("path").remove();
                       draw();
                       callback(_.map(t, function(d){return [px(d), py(d)];}));
                   }));

            function update(){
                c.attr(_.extend({
                    cx: p[i][0] + m[i][0],
                    cy: p[i][1] + m[i][1]
                }, cattr));
                
                l.attr({
                    x1: p[i][0] + m[i][0],
                    y1: p[i][1] + m[i][1],
                    x2: p[i][0],
                    y2: p[i][1],
                    stroke: "black",
                    "stroke-width": 3
                });
            }
            
            update();
        });
    };

    draw();
}
