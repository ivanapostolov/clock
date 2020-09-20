function drawClockFace() {
    const ctx = document.getElementById("clock_canvas").getContext("2d");
    const timer = document.getElementById("timer");

    let radius = 220;
    const border = 5;

    document.getElementById("btn_apply").addEventListener('click', () => {
        let newRadius = parseInt(document.getElementById('radius').value);

        if (newRadius > 0 && newRadius < 240) {
            radius = newRadius
        }
    });

    setInterval(() => {
        document.getElementById("tick_sound").play();

        ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

        for (let i = 0; i < border; i++) {
            drawCircle(ctx, 240, 240, radius - i);
        }

        timer.innerText = new Date();

        drawClockDial(ctx, 240, 240, radius);

        drawClockHands(ctx, 240, 240, radius);
    }, 1000);
}

const drawClockDial = (ctx, x, y, r) => {
    const outerR = r * 0.9;
    const innerR = r * 0.7;
    const alpha = Math.PI / 6;

    let outerX, outerY, innerX, innerY;

    for (i = 0; i < 12; i++) {
        outerX = Math.round(x + outerR * Math.sin(i * alpha));
        outerY = Math.round(y + outerR * Math.cos(i * alpha));
        innerX = Math.round(x + innerR * Math.sin(i * alpha));
        innerY = Math.round(y + innerR * Math.cos(i * alpha));

        drawLine(ctx, outerX - 1, outerY - 1, innerX - 1, innerY - 1);
        drawLine(ctx, outerX, outerY, innerX, innerY);
        drawLine(ctx, outerX + 1, outerY + 1, innerX + 1, innerY + 1);
    }
}

const drawClockHands = (ctx, x, y, r) => {
    const now = new Date();

    if (now.getMinutes() === 0) {
        document.getElementById("cuckoo_sound").play();
    }

    const hourOffset = 0.5 * r;
    const minuteOffset = 0.4 * r;
    const secondOffset = 0.3 * r;

    const hours = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const minutes = now.getMinutes() * 60 + now.getSeconds();
    const seconds = now.getSeconds();

    const hoursAlpha = hours / 43200 * (2 * Math.PI);
    const minutesAlpha = minutes / 3600 * (2 * Math.PI);
    const secondsAlpha = seconds / 60 * (2 * Math.PI);

    drawLine(ctx, Math.round(x + (r - hourOffset) * Math.sin(hoursAlpha)), Math.round(y - (r - hourOffset) * Math.cos(hoursAlpha)), x, y);
    drawLine(ctx, Math.round(x + (r - minuteOffset) * Math.sin(minutesAlpha)), Math.round(y - (r - minuteOffset) * Math.cos(minutesAlpha)), x, y);
    drawLine(ctx, Math.round(x + (r - secondOffset) * Math.sin(secondsAlpha)), Math.round(y - (r - secondOffset) * Math.cos(secondsAlpha)), x, y);
}

window.onload = drawClockFace;