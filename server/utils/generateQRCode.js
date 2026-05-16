import QRCode from 'qrcode';

export const generateQRCode = async (payload) => {
  const text = JSON.stringify(payload);
  return QRCode.toDataURL(text);
};
