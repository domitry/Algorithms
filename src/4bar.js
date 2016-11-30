/*global _*/

function four_bar(a, b, c, theta1, pm){
    var cos = Math.cos, sin = Math.sin, atan = Math.atan, sqrt=Math.sqrt;
    
    return _.map(theta1, function(t1){
        /*
        var k1=1./a, k2=1./c;
        var k3=(a*a-b*b+c*c+1)/(2*a*c);
        var D = cos(t1)-k1+k2*cos(t1)+k3;
        var E = -2*sin(t1);
        var F = k1-(k2+1)*cos(t1)+k3;
        if(E*E-4*D*F<0.)console.warn("E*E<4*D*F");
        return 2*atan((-E+ (pm?1:-1)*sqrt(E*E-4*D*F))/(2*D));
         */

        var p = Math.PI - t1;
        var A = sin(p);
        var B = (1./a)+cos(p);
        var C = (1./c)*cos(p) + (a*a-b*b+c*c+1)/(2*a*c);
        var ps = 2*atan((A+(pm?1:-1)*sqrt(A*A+B*B-C*C))/(B+C));
        return Math.PI-ps;
    });
}
