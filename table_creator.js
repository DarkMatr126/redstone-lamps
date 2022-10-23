const lamps = {};
lamps.output = [];
lamps.x = undefined;
lamps.y = undefined;
lamps.on = '🟧';
lamps.off = '🟫';

lamps.create = (x=8,y=8) => {
    for (let i = 0; i < y; i++) {
        var row = [];
        for (let i2 = 0; i2 < x; i2++) {
            row.push('0');
        }
        lamps.output.push(row);
    }
    lamps.x = x;
    lamps.y = y;
}

lamps.getOutput = () => { //returns string
    if (lamps.x === undefined || lamps.y === undefined) {
        console.error('lamps has not been created')
        return '';
    }
    var rows = [];
    for (let i = 0; i < lamps.y; i++) {
        var row = []
        for (let i2 = 0; i2 < lamps.output[i].length; i2++) {
            var val = lamps.output[i][i2];
            switch (val) {
                case '0':
                    row.push(lamps.off);
                    break;
                case '1':
                    row.push(lamps.on);
                    break;

            }
        }
        var string = row.join('');
        rows.splice(0,0,string);
    }
    var out = rows.join('\n');

    return out;
}

lamps.toggle = (x,y,state) => {
    var pixel = lamps.getPixel(x,y);
    switch (state) {
        case 'on':
            pixel = '1';
            break;
        case 'off':
            pixel = '0';
            break;
        default:
            switch (lamps.getState(x,y)) {
                case 'on':
                    pixel = '0';
                    break;
                case 'off':
                    pixel = '1';
                    break;
            }
    }
    lamps.setPixel(x,y,pixel);
}

lamps.getState = (x,y) => {
    var pixel = lamps.getPixel(x,y);
    switch (pixel) {
        case '0':
            return 'off';
        case '1':
            return 'on';
        default:
            console.error('Pixel was not found');
            return null;
    }
}

lamps.getPixel = (x,y) => {
    var tx = lamps.func.getPixel(x);
    var ty = lamps.func.getPixel(y);
    var pixel = lamps.output[ty][tx];
    return pixel;
}

lamps.setPixel = (x,y,pixel) => {
    var tx = lamps.func.getPixel(x);
    var ty = lamps.func.getPixel(y);

    lamps.output[ty][tx] = pixel;
}


lamps.func = {};
lamps.func.getPixel = (num) => {//returns the pixel coord at which the point is located
    var out = Math.floor((num-1)+0.5)
    return out;
}
