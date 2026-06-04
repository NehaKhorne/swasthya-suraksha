import QRCode from "qrcode.react";

export default function WhatsAppQR() {
  const joinLink =
    "https://wa.me/14155238886?text=join%20clean-apple";

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Enable WhatsApp SOS</h3>
      <p>Scan the QR code and tap Send (one time only)</p>
      <QRCode value={joinLink} size={200} />
    </div>
  );
}
