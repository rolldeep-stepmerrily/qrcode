import QrCodeWithLogo from 'qrcode-with-logos';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import './css/reset.css';
import './css/style.css';
import LOGO from '../assets/stepmerrily-logo.png';

const link = document.querySelector('#link');
const name = document.querySelector('#name');
const generateButton = document.querySelector('#generate');

generateButton.addEventListener('click', async () => {
  if (!link.value.trim()) {
    alert('Please enter a link to generate QR code');
    return false;
  }

  if (!name.value.trim()) {
    alert('Please enter a name for the QR code');
    return false;
  }

  const links = link.value.trim().split('\n');
  const names = name.value.trim().split('\n');

  if (links.length !== names.length) {
    alert('Number of links and names must be equal');
    return false;
  }

  const zip = new JSZip();
  const promises = [];

  links.forEach((link, index) => {
    const qr = new QrCodeWithLogo({
      content: link.trim().replace("'", ''),
      width: 380,
      logo: { src: LOGO },
      nodeQrCodeOptions: { margin: 0, scale: 0 },
      cornersOptions: { radius: { outer: 0, inner: 0 } },
      dotsOptions: {},
      onError: (error) => {
        console.error(error);
      },
    });

    promises.push(
      qr.getCanvas().then((canvas) => {
        return new Promise((resolve) => {
          canvas.toBlob((blob) => {
            zip.file(`${names[index].trim()}.png`, blob);
            resolve();
          });
        });
      })
    );
  });

  await Promise.all(promises);

  zip.generateAsync({ type: 'blob' }).then((content) => {
    saveAs(content, 'qr-codes.zip');
  });
});
