import sharp from "sharp";

export async function detectUsage(
    plateBuffer
) {
    const { data } = await sharp(
        plateBuffer
    )
        .resize(300, 120)
        .raw()
        .toBuffer({
            resolveWithObject: true
        });

    let greenPixels = 0;
    let yellowPixels = 0;
    let whitePixels = 0;
    let validPixels = 0;

    for (
        let i = 0;
        i < data.length;
        i += 3
    ) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        if (
            r < 40 &&
            g < 40 &&
            b < 40
        ) {
            continue;
        }

        validPixels++;

        if (
            g > 80 &&
            g > r + 15 &&
            g > b - 10
        ) {
            greenPixels++;
        } else if (
            r > 130 &&
            g > 130 &&
            b < 120
        ) {
            yellowPixels++;
        } else if (
            r > 170 &&
            g > 170 &&
            b > 170
        ) {
            whitePixels++;
        }
    }

    const greenRatio =
        greenPixels /
        Math.max(validPixels, 1);

    const yellowRatio =
        yellowPixels /
        Math.max(validPixels, 1);

    if (
        yellowRatio > 0.18 &&
        yellowPixels > whitePixels
    ) {
        return "commercial";
    }

    if (
        greenRatio > 0.12 &&
        greenPixels > yellowPixels
    ) {
        return "ev";
    }

    return "personal";
}