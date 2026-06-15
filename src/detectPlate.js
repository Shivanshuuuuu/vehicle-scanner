import * as ort from "onnxruntime-node";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __filename =
    fileURLToPath(
        import.meta.url
    );

const __dirname =
    path.dirname(
        __filename
    );

let session = null;

export async function loadPlateModel() {
    if (!session) {

        const modelPath =
            path.join(
                __dirname,
                "../models/plate-detector/anpr_yolov5s.onnx"
            );

        session =
            await ort.InferenceSession.create(
                modelPath
            );
    }

    return session;
}

export async function detectPlate(
    imagePath
) {
    const model =
        await loadPlateModel();

    const image =
        await sharp(
            imagePath
        )
            .resize(
                640,
                640,
                {
                    fit: "fill"
                }
            )
            .raw()
            .toBuffer({
                resolveWithObject: true
            });

    const { data } =
        image;

    const input =
        new Float32Array(
            3 * 640 * 640
        );

    for (
        let i = 0;
        i < 640 * 640;
        i++
    ) {
        input[i] =
            data[
            i * 3
            ] / 255;

        input[
            i +
            640 * 640
        ] =
            data[
            i * 3 + 1
            ] / 255;

        input[
            i +
            2 *
            640 *
            640
        ] =
            data[
            i * 3 + 2
            ] / 255;
    }

    const tensor =
        new ort.Tensor(
            "float32",
            input,
            [1, 3, 640, 640]
        );

    const outputs =
        await model.run({
            images: tensor
        });

    const detections =
        outputs.output0.data;

    let best = null;
    let bestScore = 0;

    for (
        let i = 0;
        i <
        detections.length;
        i += 6
    ) {
        const x =
            detections[i];

        const y =
            detections[
            i + 1
            ];

        const w =
            detections[
            i + 2
            ];

        const h =
            detections[
            i + 3
            ];

        const conf =
            detections[
            i + 4
            ];

        if (
            conf >
            bestScore
        ) {
            bestScore =
                conf;

            best = {
                x,
                y,
                w,
                h,
                conf
            };
        }
    }

    if (!best) {
        return null;
    }

    return best;
}