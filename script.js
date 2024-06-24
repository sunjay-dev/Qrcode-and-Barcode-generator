const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');
const heading_1 = document.getElementById('heading-1');
const qcode = document.getElementById('placeHolder');
const bar = document.getElementById('barcode');
const downloadButton = document.getElementById('downloadButton');
const downloadImage = document.getElementById('downloadImg');
const barcodeContainer = document.getElementById('barcodeContainer');
bar.style.display = "none";
barcodeContainer.style.display = "none";

downloadButton.style.display = "none";
let first_one = true;
var leftCreated=false;
var RightCreated=false;
downloadImage.onclick=downloadQRCode;

function we() {
    let i1 = document.getElementById("in1").value;
    if (i1 === "") {
        alert("Please give some input");
        return;
    }
    if (first_one == false) {
        JsBarcode("#barcode", `${i1}`);
        RightCreated=true;
        downloadButton.style.display = "block";
    }
    else {
        leftCreated=true;
        downloadButton.style.display = "block";
        var typeNumber = 4;
        var errorCorrectionLevel = 'L';
        var qr = qrcode(typeNumber, errorCorrectionLevel);
        qr.addData(`${i1}`);
        qr.make();
        document.getElementById('placeHolder').innerHTML = qr.createImgTag(10);
        increaseImageSize();
        downloadButton.style.display = "block";
    }
}


function leftclick() {
    if(leftCreated==false)
    downloadButton.style.display = "none";
    else{
        downloadButton.style.display = "block";
    }


    downloadImage.onclick=downloadQRCode;
    heading_1.innerHTML = "QRcode Generator";
    first_one = true;
    bar.style.display = "none";
    barcodeContainer.style.display = "none";
    qcode.style.display = "block";
    qcode.style.removeProperty('display');
    leftButton.classList.add('active');
    leftButton.classList.remove('inactive');
    rightButton.classList.add('inactive');
    rightButton.classList.remove('active');

}

function rightclick() {
    if(RightCreated==false)
        downloadButton.style.display = "none";
    else
    downloadButton.style.display = "block";
    
    bar.style.removeProperty('display');
    barcodeContainer.style.removeProperty('display');
    
    downloadImage.onclick=downloadBarCode;
    heading_1.innerHTML = "Barcode Generator";
    first_one = false;
    bar.style.display = "block";
    barcodeContainer.style.display = "block";
    bar.style.removeProperty('display');
    barcodeContainer.style.removeProperty('display');
    qcode.style.display = "none";
    rightButton.classList.add('active');
    rightButton.classList.remove('inactive');
    leftButton.classList.add('inactive');
    leftButton.classList.remove('active');

}

function increaseImageSize() {
    var img = document.querySelector('#placeHolder img');
    if (img) {
        img.width = 140;  // Set new width
        img.height = 140; // Set new height
    }
}


function downloadQRCode() {
    var img = document.querySelector('#placeHolder img');
    if (img) {
        var link = document.createElement('a');
        link.href = img.src;
        link.download = 'qrcode.png';
        link.click();
    }
}

function downloadBarCode(){
// Get the SVG element
var svgElement = document.getElementById('barcode');

// Convert SVG XML to a Blob
var svgData = new XMLSerializer().serializeToString(svgElement);
var blob = new Blob([svgData], { type: 'image/svg+xml' });

// Create a URL for the Blob
var url = URL.createObjectURL(blob);

// Create a link element and trigger download
var a = document.createElement('a');
a.href = url;
a.download = 'barcode.svg';
document.body.appendChild(a);
a.click();

// Clean up
document.body.removeChild(a);
URL.revokeObjectURL(url);

}