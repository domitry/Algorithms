function length(v){return Math.sqrt(v[0]*v[0]+v[1]*v[1]);}
function plus(v0, v1){return [v0[0]+v1[0], v0[1]+v1[1]];}
function minus(v0, v1){return [v0[0]-v1[0], v0[1]-v1[1]];}
function multiplyScalar(c, v){return [c*v[0], c*v[1]];}
function normalized(v){return multiplyScalar(1./length(v), v);}
function dot(v0, v1){return v0[0]*v1[0] + v0[1]*v1[1];}
