let radius = 220;

const drawClock = () => {
    const ctx = document.getElementById("clock_canvas").getContext("2d");

    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

    document.getElementById("timer").innerText = new Date().toString();

    drawClockFace(ctx, 240, 240, radius);

    drawClockHands(ctx, 240, 240, radius);
}

const drawClockFace = (ctx, x, y, r) => {
    //Draw Border Below

    const border = 5;

    for (let i = 0; i < border; i++) {
        drawCircle(ctx, 240, 240, r - i);
    }

    //Draw Dial Below

    const outerR = 0.95 * r;
    const hourR = 0.7 * r;
    const minuteR = 0.8 * r;

    const alpha = Math.PI / 30;

    let outerX, outerY, innerX, innerY;

    for (let i = 0; i < 60; i++) {
        outerX = Math.round(x + outerR * Math.sin(i * alpha));
        outerY = Math.round(y + outerR * Math.cos(i * alpha));

        if (i % 5 === 0) {
            innerX = Math.round(x + hourR * Math.sin(i * alpha));
            innerY = Math.round(y + hourR * Math.cos(i * alpha));
            drawLine(ctx, outerX - 1, outerY - 1, innerX - 1, innerY - 1);
            drawLine(ctx, outerX + 1, outerY + 1, innerX + 1, innerY + 1);
        } else {
            innerX = Math.round(x + minuteR * Math.sin(i * alpha));
            innerY = Math.round(y + minuteR * Math.cos(i * alpha));
        }

        drawLine(ctx, outerX, outerY, innerX, innerY);
    }
}

const drawClockHands = (ctx, x, y, r) => {
    const now = new Date();

    if (now.getMinutes() === 0) {
        document.getElementById("cuckoo_sound").play();
    } else {
        document.getElementById("tick_sound").play();
    }

    //Determine clock hands length
    const hourOffset = 0.5 * r;
    const minuteOffset = 0.4 * r;
    const secondOffset = 0.3 * r;

    //Determine clock hands angle on the clock face
    const hoursAlpha = (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) / 43200 * (2 * Math.PI);
    const minutesAlpha = (now.getMinutes() * 60 + now.getSeconds()) / 3600 * (2 * Math.PI);
    const secondsAlpha = now.getSeconds() / 60 * (2 * Math.PI);

    //Draw clock hands
    drawLine(ctx, Math.round(x + (r - hourOffset) * Math.sin(hoursAlpha)), Math.round(y - (r - hourOffset) * Math.cos(hoursAlpha)), x, y);
    drawLine(ctx, Math.round(x + (r - minuteOffset) * Math.sin(minutesAlpha)), Math.round(y - (r - minuteOffset) * Math.cos(minutesAlpha)), x, y);
    drawLine(ctx, Math.round(x + (r - secondOffset) * Math.sin(secondsAlpha)), Math.round(y - (r - secondOffset) * Math.cos(secondsAlpha)), x, y);
}

window.onload = () => {
    document.getElementById("btn_decrease").addEventListener('click', () => {
        if (radius > 1) {
            radius--;
        }

        document.getElementById("value_box").innerText = radius;
    });

    document.getElementById("btn_increase").addEventListener('click', () => {
        if (radius < 240) {
            radius++;
        }

        document.getElementById("value_box").innerText = radius;
    });

    setTimeout(setInterval(drawClock, 1000), 1000 - new Date().getTime() % 1000)
};