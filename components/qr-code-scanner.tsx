"use client";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

export default function QrCodeScanner() {
  const [currentId, setCurrentId] = useState(0);
  const [scanned, setScanned] = useState<string | null>(null);
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);

  function restartScanner() {
    setCurrentId((prev) => prev + 1);
  }

  function success(result: string) {
    setScanned(result);
  }

  function failure(err: string) {
    console.log(err);
  }

  useEffect(() => {
    if (scanner) scanner.clear();

    const tempScanner = new Html5QrcodeScanner(
      `reader-${currentId}`,
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      },
      false
    );

    setScanner(tempScanner);
    tempScanner.render(success, failure);

    setScanned(null);
  }, [currentId]);

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="min-h-20 min-w-60 p-3 border-2 border-black">
        {scanned ? (
          <div>{scanned}</div>
        ) : (
          <div id={`reader-${currentId}`}></div>
        )}
      </div>
      <button
        className="mt-2 px-3 py-2 radius-2 bg-blue-500 text-white rounded-lg"
        onClick={restartScanner}
      >
        scan again
      </button>
    </div>
  );
}
