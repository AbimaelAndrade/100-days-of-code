const photoFile = document.getElementById("photo-file");
const photoPreview = document.getElementById("photo-preview");
const selectionTool = document.getElementById("selection-tool");
const cropButton = document.getElementById("crop-image");
const downloadButton = document.getElementById("download");
let startX,
  startY,
  relativeStartX,
  relativeStartY,
  endX,
  endY,
  relativeEndX,
  relativeEndY,
  startSelection = false,
  photoName,
  image;

// Select and preview image

document.getElementById("select-image").onclick = function () {
  photoFile.click();
};

window.addEventListener("DOMContentLoaded", function () {
  // Load preview image
  photoFile.addEventListener("change", () => {
    let file = photoFile.files.item(0);

    photoName = file.name;

    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      image = new Image();
      image.src = event.target.result;
      image.onload = onLoadImage;
    };
  });
});

// Selection tool
const events = {
  mouseover(event) {
    this.style.cursor = "crosshair";
  },
  mousedown(event) {
    const { clientX, clientY, offsetX, offsetY } = event;
    startX = clientX;
    startY = clientY;
    relativeStartX = offsetX;
    relativeStartY = offsetY;

    startSelection = true;
  },
  mousemove(event) {
    const { clientX, clientY } = event;
    endX = clientX;
    endY = clientY;

    if (startSelection) {
      selectionTool.style.display = "initial";

      selectionTool.style.top = startY + "px";
      selectionTool.style.left = startX + "px";

      selectionTool.style.width = endX - startX + "px";
      selectionTool.style.height = endY - startY + "px";
    }
  },
  mouseup(event) {
    const { layerX, layerY } = event;
    relativeEndX = layerX;
    relativeEndY = layerY;

    startSelection = false;

    // show button crop image
    cropButton.style.display = "initial";
  },
};

Object.keys(events).forEach((eventName) => {
  photoPreview.addEventListener(eventName, events[eventName]);
});

// Create a canvas
const canvas = document.createElement("canvas");
let context = canvas.getContext("2d");

const onLoadImage = () => {
  const { width, height } = image;
  canvas.width = width;
  canvas.height = height;

  context.clearRect(0, 0, width, height);
  context.drawImage(image, 0, 0);

  photoPreview.src = canvas.toDataURL();
};

// Crop image

cropButton.onclick = (event) => {
  const { width: imgW, height: imgH } = image;
  const { width: previewW, height: previewH } = photoPreview;

  const [widthFactor, heightFactor] = [+(imgW / previewW), +(imgH / previewH)];
  const [selectionWidth, selectionHeight] = [
    +selectionTool.style.width.replace("px", ""),
    +selectionTool.style.height.replace("px", ""),
  ];

  const [cropWidth, cropHeight] = [
    +(selectionWidth * widthFactor),
    +(selectionHeight * heightFactor),
  ];

  const [actualX, actualY] = [
    +(relativeStartX * widthFactor),
    +(relativeStartY * heightFactor),
  ];

  // get of context image regios
  const croppedImage = context.getImageData(
    actualX,
    actualY,
    cropWidth,
    cropHeight
  );

  // clean context image
  context.clearRect(0, 0, context.width, context.height);
  image.width = canvas.width = cropWidth;
  image.height = canvas.height = cropHeight;

  context.putImageData(croppedImage, 0, 0);

  selectionTool.style.display = "none";

  photoPreview.src = canvas.toDataURL();

  downloadButton.style.display = "initial";
};

// Download

downloadButton.onclick = (event) => {
  const a = document.createElement("a");
  a.download = photoName + "-cropped.png";
  a.href = canvas.toDataURL();
  a.click();
};
