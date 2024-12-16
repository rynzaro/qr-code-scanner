"use client";

import QrCodeScanner from "@/components/qr-code-scanner";

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="text-3xl">QR Code Scanner</div>
      <QrCodeScanner />
    </div>
  );
}
