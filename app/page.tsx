"use client";
import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function Home() {
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const scannerContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scannerContainerRef.current) return;
    const scanner = new Html5QrcodeScanner(
      scannerContainerRef.current.id,
      {
        fps: 10,
        qrbox: 250,
      },
      false
    );

    scanner.render(success, error);

    function success(result: string) {
      scanner.clear();
      setScannedCode(result);
    }

    function error(err: string) {
      console.warn(err);
    }
  }, [scannerContainerRef]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center  bg-blue-100 gap-4">
      <div className="text-3xl ">QR Code Scanner</div>
      <div ref={scannerContainerRef} id="scanner-container"></div>
      {scannedCode ? (
        <div>Scanned Result: {scannedCode}</div>
      ) : (
        <div className="text-3xl">No result yet</div>
      )}
    </div>
  );
}
