function Vehicle(x, y) {
    this.pos = createVector(random(width), random(height));
    this.target = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.r = 8;
    this.maxspeed = 6;
    this.maxforce = 1;
    this.fleeing = false;
}

Vehicle.prototype.behaviors = function() {
    var arrive = this.arrive(this.target);
    this.applyForce(arrive);
    this.show();
    var mouse = createVector(mouseX, mouseY);
    var flee = this.flee(mouse);
    // arrive.mult(1);
    // flee.mult(5);
    this.applyForce(flee);
    this.applyForce(arrive);
};

Vehicle.prototype.applyForce = function(f) {
    this.acc.add(f);
};

Vehicle.prototype.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);

};

Vehicle.prototype.show = function() {
    if (this.fleeing) {
        stroke(Math.floor(Math.random() * Math.floor(255)), Math.floor(Math.random() * Math.floor(255)), Math.floor(Math.random() * Math.floor(255)));
        strokeWeight(12);
    } else {
        stroke(225, 104, 30);
        strokeWeight(8);
    }
    point(this.pos.x, this.pos.y);
};

Vehicle.prototype.flee = function(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    if(d < 50) {
        this.fleeing = true;
        desired.setMag(this.maxspeed);
        desired.mult(-1);
        var steer = p5.Vector.sub(desired, this.vel);
        steer.limit(15);
        return steer;
    } else {
        return createVector(0, 0);
    }
    
};
Vehicle.prototype.arrive = function(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    this.fleeing = false;
    var speed = this.maxspeed;
    if (d < 100) {
        speed = map(d, 0, 100, 0, this.maxspeed);
    }
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
};

