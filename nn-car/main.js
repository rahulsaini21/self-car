
const carCanvas=document.getElementById("carCanvas");
carCanvas.width= 200;
// const networkCanvas=document.getElementById("networkCanvas");
// carCanvas.width= 300;
// print("hello");
const carCtx = carCanvas.getContext("2d");
// const networkCtx = carCanvas.getContext("2d");

const road = new Road(carCanvas.width/2, carCanvas.width*0.9);
// const car = new Car(road.getLaneCentre(1),100,30,50, "AI");
const N=100;
const cars = generateCars(N);

const traffic=[
    new Car(road.getLaneCentre(1), -100,30,50,"DUMMY",2)
];


animate();

function generateCars(N){
    const cars=[];
    for(let i=1; i<=N; i++){
        cars.push(new Car(road.getLaneCentre(1),100,30,50,"AI"));
    }
    return cars;
}

function animate(){
    for(let i=0; i<traffic.length; i++){
        traffic[i].update(road.boarders, []);
    }
    for(let i=0; i<cars.length;i++){
        cars[i].update(road.boarders, traffic);
    }
    // car.update(road.boarders, traffic);

    carCanvas.height = window.innerHeight;
    // networkCanvas.height = window.innerHeight;


    carCtx.save();
    carCtx.translate(0, -cars[0].y+carCanvas.height*0.7);


    road.draw(carCtx);
    for(let i=0; i<traffic.length; i++){
        traffic[i].draw(carCtx, "red");
    }

    for(let i=0; i<cars.length;i++){
        cars[i].draw(carCtx, "blue");
    }
    // car.draw(carCtx, "blue");

    carCtx.restore();

    // Visualizer.draw
    requestAnimationFrame(animate);
}