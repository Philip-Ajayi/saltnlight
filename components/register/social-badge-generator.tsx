"use client";

import { useRef, useState, useEffect, ChangeEvent } from "react";

interface BadgeProps {
  initialName?: string;
  templateSrc?: string;
}

export function SocialBadgeGenerator({
  initialName = "",
  templateSrc = "/salt-and-light-badge-template.jpeg",
}: BadgeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [userName, setUserName] = useState(initialName);
  const [userPhoto, setUserPhoto] = useState<HTMLImageElement | null>(null);
  const [templateImage, setTemplateImage] = useState<HTMLImageElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Load badge background template
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = templateSrc;
    img.onload = () => {
      setTemplateImage(img);
      setIsReady(true);
    };
  }, [templateSrc]);

  // Render poster badge on canvas
  const renderBadge = () => {
    const canvas = canvasRef.current;
    if (!canvas || !templateImage) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = templateImage.naturalWidth || 1000;
    const height = templateImage.naturalHeight || 1100;

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    // 1. Draw User Photo inside the Central Circle
    if (userPhoto) {
      ctx.save();
      
      // Target coordinates matching the circle on the poster (X: 50%, Y: 48%, Radius: 20%)
      const circleX = width * 0.50;
      const circleY = height * 0.485;
      const radius = width * 0.20;

      ctx.beginPath();
      ctx.arc(circleX, circleY, radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();

      // Cover-fit user photo inside circle
      const scale = Math.max((radius * 2) / userPhoto.width, (radius * 2) / userPhoto.height);
      const x = circleX - (userPhoto.width / 2) * scale;
      const y = circleY - (userPhoto.height / 2) * scale;

      ctx.drawImage(userPhoto, x, y, userPhoto.width * scale, userPhoto.height * scale);
      ctx.restore();
    }

    // 2. Overlay Template Image
    ctx.drawImage(templateImage, 0, 0, width, height);

    // 3. Render Name text on "I ____________ WILL BE ATTENDING"
    if (userName.trim()) {
      ctx.save();
      ctx.font = "bold 34px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Coordinates over the name line
      const textX = width * 0.50;
      const textY = height * 0.725;

      ctx.fillText(userName.toUpperCase(), textX, textY);
      ctx.restore();
    }
  };

  useEffect(() => {
    renderBadge();
  }, [userName, userPhoto, templateImage]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => setUserPhoto(img);
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadBadge = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${userName.replace(/\s+/g, "_") || "Salt_and_Light_26"}_Badge.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="surface-obsidian p-6 sm:p-8 border border-white/10 rounded-2xl space-y-6">
      <div className="text-center space-y-2">
        <h3 className="font-display text-xl font-bold text-white">Generate Your Social Media Badge</h3>
        <p className="text-xs text-zinc-400">
          Upload your photo to place it in the center circle and share on WhatsApp & Social Media[cite: 1, 2].
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
            Upload Your Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full text-xs text-zinc-300 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#f5d061] file:text-black hover:file:bg-[#e0bc4e] cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
            Your Display Name
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="e.g. SAMUEL ADEBAYO"
            className="w-full bg-white/[0.03] border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:border-[#f5d061] focus:outline-none"
          />
        </div>
      </div>

      {/* Canvas Preview */}
      <div className="relative flex justify-center bg-black/40 p-4 rounded-xl border border-white/10 overflow-hidden">
        <canvas ref={canvasRef} className="max-w-full h-auto rounded-lg shadow-2xl" />
      </div>

      <button
        type="button"
        onClick={downloadBadge}
        disabled={!isReady}
        className="btn-primary w-full py-3.5 text-xs font-bold tracking-wider flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        DOWNLOAD BADGE TO SHARE →
      </button>
    </div>
  );
}
