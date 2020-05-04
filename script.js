let brush = {
    enabled: true,
    active: false,
    width: 10,
    color: "rgb(0, 0, 0)"
}

// let rubber = {
//     enabled: false,
//     active: false,
//     width: 10,
//     color: "rgb(255, 255, 255)"
// }

let root = document.documentElement;
let canvas = document.getElementById('main-canvas');

function init() {
    if (canvas.getContext) {

        canvas.width = 800;
        canvas.height = 600;

        ctx = canvas.getContext("2d");

        canvas.addEventListener('mousedown', (event) => {
            ctx.lineWidth = brush.width;
            ctx.lineCap = "round";
            brush.active = true;
            ctx.beginPath();
            ctx.strokeStyle = brush.color;
            ctx.lineTo(event.offsetX, event.offsetY);
            ctx.stroke()
        })

        document.addEventListener('mousemove', (event) => { 
            if (event.target == canvas) {
                if (brush.active) {
                    ctx.lineTo(event.offsetX, event.offsetY);
                    ctx.stroke();
                }
            } else {
                // brush.active = false;
            }
        })

        document.addEventListener('mouseup', () => {
            brush.active = false;
        })

        
    } else {
        console.log("Canvas Unsupported");
    }
}

window.onload = init();


function updateBrushColor(obj) {
    if (obj.checked) {
        color = getComputedStyle(root).getPropertyValue(obj.dataset.color);
        root.style.setProperty('--active-color', color);
        brush.color = color;
    }
}

function updateBrushSize(width) {
    brush.width = width;
}

function clearCanvas() {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
}

function rubber() {
    // brush.color = 'rgb(255, 255, 255)';
    return
}
