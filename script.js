let tools = {
    brush: {
        enabled: true,
        active: false,
        width: 10,
        color: 'rgb(0, 0, 0)'
    },
    rubber: {
        enabled: false,
        active: false,
        width: 10,
        color: 'rgb(255, 255, 255)'
    },
    fill: {
        enabled: false,
    },
    enabled: 'brush'
}

let root = document.documentElement;
let canvas = document.getElementById('main-canvas');

function init() {
    if (canvas.getContext) {
        canvas.width = 800;
        canvas.height = 600;

        ctx = canvas.getContext("2d");
        ctx.lineCap = "round";

        canvas.addEventListener('mousedown', (event) => {
            for (const tool in tools) {
                if (tools[tool].enabled) {
                    tools.enabled = tool;
                    switch (tool) {
                        case 'brush':
                        case 'rubber':
                            tools[tool].active = true;
                            ctx.lineWidth = tools[tool].width;
                            ctx.strokeStyle = tools[tool].color;

                            ctx.beginPath();
                            ctx.lineTo(event.offsetX, event.offsetY);
                            ctx.stroke()
                            break
                        case 'fill':
                            break
                    }
                }
            }         
        })

        document.addEventListener('mousemove', (event) => { 
            if (event.target == canvas) {
                if (tools.enabled == 'brush' || tools.enabled == 'rubber') {
                    if (tools[tools.enabled].active) {
                        ctx.lineTo(event.offsetX, event.offsetY);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(event.offsetX, event.offsetY);
                    }
                }
            }
        })

        document.addEventListener('mouseup', () => {
            tools[tools.enabled].active = false;
            ctx.closePath();
        })

        
    } else {
        console.log("Canvas Unsupported");
    }
}

window.onload = init();


function setBrushColor(obj) {
    if (obj.checked) {
        color = getComputedStyle(root).getPropertyValue(obj.dataset.color);
        tools.brush.color = color;
        root.style.setProperty('--active-color', color);
        document.getElementById('tool--brush').checked = true;
        setTool('brush');
    }
}

function setToolSize(obj) {
    if (obj.checked) {
        tools[tools.enabled].width = parseInt(obj.dataset.size);
    }
}

function clearCanvas() {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
}

function setTool(tool) {
    tools.enabled = tool;
    switch (tool) {
        case 'brush':
            tools.brush.enabled = true;
            tools.rubber.enabled = false;
            tools.fill.enabled = false;
            document.querySelectorAll(`[data-size='${tools[tool].width}']`)[0].checked = true;
            root.style.setProperty('--active-color', tools[tool].color);
            break
        case 'rubber':
            tools.brush.enabled = false;
            tools.rubber.enabled = true;
            tools.fill.enabled = false;
            document.querySelectorAll(`[data-size='${tools[tool].width}']`)[0].checked = true;
            root.style.setProperty('--active-color', tools[tool].color);
            break
        case 'fill':
            tools.brush.enabled = false;
            tools.rubber.enabled = false;
            tools.fill.enabled = true;
    }
}


