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

    // 1. Draw Template Poster
    ctx.drawImage(templateImage, 0, 0, width, height);

    // 2. Draw User Photo inside center circle
    if (userPhoto) {
      ctx.save();

      const circleX = width * 0.50;
      const circleY = height * 0.485;
      const radius = width * 0.20;

      ctx.beginPath();
      ctx.arc(circleX, circleY, radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();

      const scale = Math.max((radius * 2) / userPhoto.width, (radius * 2) / userPhoto.height);
      const x = circleX - (userPhoto.width / 2) * scale;
      const y = circleY - (userPhoto.height / 2) * scale;

      ctx.drawImage(userPhoto, x, y, userPhoto.width * scale, userPhoto.height * scale);
      ctx.restore();
    }

    // 3. Render Name text
    if (userName.trim()) {
      ctx.save();
      ctx.font = "bold 32px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const textX = width * 0.50;
      const textY = height * 0.73;

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

  // Triggers immediate download + opens social platform/share picker
  const handleShareAndDownload = async (platform: "whatsapp" | "facebook" | "native") => {
    // 1. Download image immediately
    downloadBadge();

    const canvas = canvasRef.current;
    const shareText = "I just registered for Salt & Light '26! Join me in Samonda, Ibadan!";
    const shareUrl = typeof window !== "undefined" ? window.location.origin : "";

    // 2. Share to requested channel
    if (platform === "native" && navigator.share) {
      try {
        if (canvas) {
          canvas.toBlob(async (blob) => {
            if (blob) {
              const file = new File([blob], "Salt_and_Light_Badge.png", { type: "image/png" });
              if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                  title: "Salt & Light '26",
                  text: shareText,
                  files: [file],
                });
                return;
              }
            }
            await navigator.share({ title: "Salt & Light '26", text: shareText, url: shareUrl });
          });
        }
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else if (platform === "whatsapp") {
      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}${shareUrl}`)}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");
    } else if (platform === "facebook") {
      const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
      window.open(fbUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="surface-obsidian p-5 sm:p-6 border border-white/10 rounded-2xl space-y-5">
      <div className="text-center space-y-1">
        <h3 className="font-display text-lg font-bold text-white">Customize & Share Your Social Badge</h3>
        <p className="text-xs text-zinc-400">
          Upload your picture and edit your name to create your custom badge.
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
            Upload Your Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full text-xs text-zinc-300 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#f5d061] file:text-black hover:file:bg-[#e0bc4e] cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
            Display Name
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="e.g. SAMUEL ADEBAYO"
            className="w-full bg-white/[0.03] border border-white/10 px-3.5 py-2 text-xs text-white placeholder-zinc-600 focus:border-[#f5d061] focus:outline-none"
          />
        </div>
      </div>

      {/* Canvas Preview */}
      <div className="relative flex justify-center bg-black/40 p-3 rounded-xl border border-white/10 overflow-hidden">
        <canvas ref={canvasRef} className="max-w-full h-auto rounded-lg shadow-2xl max-h-[320px]" />
      </div>

      {/* Share & Download Actions */}
      <div className="space-y-2">
        <span className="block text-center text-[11px] font-bold uppercase tracking-wider text-zinc-400">
          Share Badge (Auto-Downloads On Click)
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleShareAndDownload("whatsapp")}
            disabled={!isReady}
            className="py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba5a] text-black text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            <span>Share to WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={() => handleShareAndDownload("facebook")}
            disabled={!isReady}
            className="py-2.5 px-3 bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            <span>Share to Facebook</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => handleShareAndDownload("native")}
          disabled={!isReady}
          className="btn-primary w-full py-3 text-xs font-bold tracking-wider flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          DOWNLOAD & SHARE BADGE →
        </button>
      </div>
    </div>
  );
}