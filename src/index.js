import QrCodeWithLogo from 'qrcode-with-logos';
import './css/reset.css';
import './css/style.css';
import LOGO from './assets/stepmerrily-logo.png';

const canvas = document.querySelector('#canvas');
const url = document.querySelector('#url');
const name = document.querySelector('#name');
const generateButton = document.querySelector('#generate');

generateButton.addEventListener('click', () => {
  const qr = new QrCodeWithLogo({
    canvas,
    content: url.value.trim().replace("'", ''),
    width: 380,
    logo: { src: LOGO, borderWidth: 5 },
    nodeQrCodeOptions: {},
    cornersOptions: {},
    dotsOptions: {},
    onError: (error) => {
      console.error(error);
    },
  });

  qr.downloadImage(name.value.trim());
});
