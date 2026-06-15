import * as ort from "onnxruntime-node";
import fs from "fs";
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
let dictionary = null;

export async function loadOCRModel() {
    if (session) {
        return session;
    }

    const modelPath =
        path.join(
            __dirname,
            "../models/ocr/en_PP-OCRv4_rec_infer.onnx"
        );

    session =
        await ort.InferenceSession.create(
            modelPath
        );

    return session;
}

export function loadDictionary() {
    if (dictionary) {
        return dictionary;
    }

    const dictPath =
        path.join(
            __dirname,
            "../models/ocr/ppocr_keys_v1.txt"
        );

    const text =
        fs.readFileSync(
            dictPath,
            "utf8"
        );

    dictionary = [
        "blank",
        ...text
            .split(/\r?\n/)
            .filter(Boolean)
    ];

    return dictionary;
}