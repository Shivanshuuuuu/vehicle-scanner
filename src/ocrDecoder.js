export function decodeOCR(
    probs,
    chars,
    seqLen,
    numClasses
) {
    let result = "";

    let prevIndex = -1;

    for (let t = 0; t < seqLen; t++) {

        let maxProb = -1;
        let maxIndex = 0;

        for (
            let c = 0;
            c < numClasses;
            c++
        ) {
            const value =
                probs[
                t * numClasses + c
                ];

            if (
                value > maxProb
            ) {
                maxProb = value;
                maxIndex = c;
            }
        }

        if (
            maxIndex === 0 ||
            maxIndex === prevIndex
        ) {
            prevIndex = maxIndex;
            continue;
        }

        const ch =
            chars[maxIndex];

        if (ch) {
            result += ch;
        }

        prevIndex = maxIndex;
    }

    return result;
}