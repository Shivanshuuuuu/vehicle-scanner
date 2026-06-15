
import sharp from "sharp";
import * as ort from "onnxruntime-node";

import {
    loadOCRModel,
    loadDictionary
} from "./ocrModel.js";

import {
    decodeOCR
} from "./ocrDecoder.js";

async function runOCR(
    imageBuffer,
    model,
    chars
) {
    const image =
        await sharp(imageBuffer)
            .resize(320, 48)
            .removeAlpha()
            .raw()
            .toBuffer();

    const input =
        new Float32Array(
            1 * 3 * 48 * 320
        );

    for (
        let i = 0;
        i < 48 * 320;
        i++
    ) {
        input[i] =
            image[i * 3] / 255;

        input[
            i + 48 * 320
        ] =
            image[
            i * 3 + 1
            ] / 255;

        input[
            i + 2 * 48 * 320
        ] =
            image[
            i * 3 + 2
            ] / 255;
    }

    const tensor =
        new ort.Tensor(
            "float32",
            input,
            [1, 3, 48, 320]
        );

    const output =
        await model.run({
            x: tensor
        });

    const probs =
        output[
            "softmax_2.tmp_0"
        ].data;

    return decodeOCR(
        probs,
        chars,
        40,
        97
    );
}

export async function readPlate(
    imageBuffer
) {
    const model =
        await loadOCRModel();

    const chars =
        loadDictionary();

    const text =
        await runOCR(
            imageBuffer,
            model,
            chars
        );

    const cleaned =
        text
            .replace(
                /[^A-Z0-9]/g,
                ""
            )
            .toUpperCase();

    const patterns = [
        /[A-Z]{2}[0-9]{2}[A-Z]{1,3}[0-9]{4,5}/,
        /[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4,5}/
    ];

    for (
        const pattern
        of patterns
    ) {
        const match =
            cleaned.match(
                pattern
            );

        if (match) {
            return match[0];
        }
    }

    return cleaned;
}




