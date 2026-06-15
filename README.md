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

```js
import { scanVehicle } from "vehicle-scanner";

const result = await scanVehicle("car.jpg");

console.log(result);
```

Output:

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

## Limitations

* Two-line bike/scooter number plates are not fully supported.
* Designed primarily for Indian vehicle registration plates.

## License

MIT
