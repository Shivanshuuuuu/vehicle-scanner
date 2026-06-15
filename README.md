# Vehicle Scanner

Indian vehicle number plate scanner built with ONNX Runtime.

## Features

* License plate detection using YOLOv5 ONNX
* OCR using PP-OCRv4 ONNX
* Vehicle usage classification:

  * Personal
  * Commercial
  * EV
* Fully offline
* Node.js package

## Installation

```bash
npm install vehicle-scanner
```

## Usage

Create a file named `test.mjs`.

**Important:** Use the `.mjs` extension because the package uses ES Modules.

### test.mjs

```js
import { scanVehicle } from "vehicle-scanner";

const result = await scanVehicle("car.jpg");

console.log(result);
```

Run:

```bash
node test.mjs
```

## Output

```js
{
  plateNumber: "MH43CC1745",
  vehicleUsage: "personal"
}
```

## Example Outputs

```js
{
  plateNumber: "PB10EA7263",
  vehicleUsage: "personal"
}
```

```js
{
  plateNumber: "MH48F4053",
  vehicleUsage: "commercial"
}
```

```js
{
  plateNumber: "KA03AG3875",
  vehicleUsage: "ev"
}
```

## Requirements

* Node.js 18+
* Image path must point to a valid vehicle image
* Supports JPG, JPEG, PNG and WebP images

## Limitations

* Two-line bike/scooter number plates are not fully supported
* Designed primarily for Indian vehicle registration plates
* Image quality significantly affects OCR accuracy

## License

MIT
