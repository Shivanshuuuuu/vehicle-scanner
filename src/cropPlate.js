import sharp from "sharp";

export async function cropPlate(
    imagePath,
    bbox
) {
    const metadata =
        await sharp(imagePath)
            .metadata();

    const scaleX =
        metadata.width / 640;

    const scaleY =
        metadata.height / 640;

    const plateWidth =
        Math.round(
            bbox.w * scaleX
        );

    const plateHeight =
        Math.round(
            bbox.h * scaleY
        );

    const paddingX =
        Math.round(
            plateWidth * 0.12
        );

    const paddingY =
        Math.round(
            plateHeight * 0.15
        );

    const left =
        Math.max(
            0,
            Math.round(
                (bbox.x -
                    bbox.w / 2) *
                scaleX
            ) - paddingX
        );

    const top =
        Math.max(
            0,
            Math.round(
                (bbox.y -
                    bbox.h / 2) *
                scaleY
            ) - paddingY
        );

    const width =
        Math.min(
            metadata.width -
            left,
            plateWidth +
            paddingX * 2
        );

    const height =
        Math.min(
            metadata.height -
            top,
            plateHeight +
            paddingY * 2
        );

    return await sharp(imagePath)
        .extract({
            left,
            top,
            width,
            height
        })
        .toBuffer();
}