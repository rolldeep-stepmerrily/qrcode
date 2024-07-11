import QrCodeWithLogo from 'qrcode-with-logos';
import './css/reset.css';
import './css/style.css';
import LOGO from '../assets/stepmerrily-logo.png';

const link = document.querySelector('#url');
const name = document.querySelector('#name');
const generateButton = document.querySelector('#generate');
const canvas = document.querySelector('#canvas');

generateButton.addEventListener('click', () => {
  if (!link.value.trim()) {
    alert('Please enter a link to generate QR code');
  }

  if (!name.value.trim()) {
    alert('Please enter a name for the QR code');
  }

  const qr = new QrCodeWithLogo({
    canvas,
    content: link.value.trim().replace("'", ''),
    width: 380,
    logo: { src: LOGO },
    nodeQrCodeOptions: {},
    cornersOptions: {},
    dotsOptions: {},
    onError: (error) => {
      console.error(error);
    },
  });

  qr.downloadImage(name.value.trim());
});
