const getBezierQuadraticCurvePoints = (xA, yA, xB, yB, xC, yC) => {
    const approximation = 0.0001;

    let xT, yT, xT1, yT1, xT2, yT2;

    let points = [];

    for (let t = 0; t <= 1; t += approximation) {
        xT1 = xA + ((xB - xA) * t);
        yT1 = yA + ((yB - yA) * t);
        xT2 = xB + ((xC - xB) * t);
        yT2 = yB + ((yC - yB) * t);

        xT = xT1 + ((xT2 - xT1) * t);
        yT = yT1 + ((yT2 - yT1) * t);

        points.push({ xT: Math.round(xT), yT: Math.round(yT) })
    }

    return points;
}

const drawQuadraticCurve = (ctx, xA, yA, xB, yB, xC, yC) => {
    let points = getBezierQuadraticCurvePoints(xA, yA, xB, yB, xC, yC);

    points.forEach(e => {
        ctx.fillRect(e.xT, e.yT, 1, 1);
    });
}

const drawCircle = (ctx, x, y, r) => {
    const approximation = 0.005;

    for (alpha = 0; alpha <= 360; alpha += approximation) {
        ctx.fillRect(Math.round(x + r * Math.sin(alpha)), Math.round(y + r * Math.cos(alpha)), 1, 1);
    }
}

const getLineEquation = (x1, y1, x2, y2) => {
    let a = (y2 - y1) / (x2 - x1);

    return { a: a, b: y1 - (a * x1) }
}

const drawLine = (ctx, x1, y1, x2, y2) => {
    const maxCoordinateDistance = Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));

    let xStep = (x2 - x1) / maxCoordinateDistance;
    let yStep = (y2 - y1) / maxCoordinateDistance;

    for (let i = 0; i < maxCoordinateDistance; i++) {
        ctx.fillRect(Math.round(x1 += xStep), Math.round(y1 += yStep), 1, 1);
    }
}
