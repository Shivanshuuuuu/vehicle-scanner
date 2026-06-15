import { detectPlate } from "./detectPlate.js";
import { cropPlate } from "./cropPlate.js";
import { readPlate } from "./readPlate.js";
import { detectUsage } from "./detectUsage.js";

export async function scanVehicle(
    imagePath
) {
    const bbox =
        await detectPlate(
            imagePath
        );

    if (!bbox) {
        return {
            plateNumber: null,
            vehicleUsage: null
        };
    }

    const croppedPlate =
        await cropPlate(
            imagePath,
            bbox
        );

    const vehicleUsage =
        await detectUsage(
            croppedPlate
        );

    const plateNumber =
        await readPlate(
            croppedPlate
        );

    return {
        plateNumber,
        vehicleUsage
    };
}