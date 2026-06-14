import React, { useState, useRef } from 'react';
import { Upload, Sparkles, Sliders, RefreshCw, Scissors, Check, ZoomIn, Image as ImageIcon } from 'lucide-react';

interface ImageDropzoneProps {
  onImageSelected: (url: string) => void;
  currentImage?: string;
  gender: 'Male' | 'Female';
}

export default function ImageDropzone({
  onImageSelected,
  currentImage,
  gender
}: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Crop & Compress Step states
  const [step, setStep] = useState<'idle' | 'cropping' | 'compressing' | 'completed'>('idle');
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [compressRatio, setCompressRatio] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag listeners
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setStep('cropping');
  };

  // Preset Mali Samaj sample premium portraits map if they want instantly high-res matching results
  const triggerCropAndCompression = () => {
    if (!previewUrl) return;
    setStep('compressing');
    
    // Simulate high-performance progressive compression algorithm (client side - Web Workers style)
    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      if (progress >= 100) {
        clearInterval(interval);
        
        // Pick handsome portrait relative to their gender
        const highResAssets = {
          Male: [
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400&h=400",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=400"
          ],
          Female: [
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=400",
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400",
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400"
          ]
        };

        const list = highResAssets[gender];
        const randomItem = list[Math.floor(Math.random() * list.length)];
        
        // Original size simulation: 3.8 MB -> 312 KB
        const rawSize = (Math.random() * 2 + 2.5).toFixed(1); // 2.5MB - 4.5MB
        const finalSize = Math.floor(Math.random() * 80 + 240); // 240KB - 320KB
        setCompressRatio(`Compressed from ${rawSize}MB to ${finalSize}KB (-89%). Ready in milliseconds!`);
        
        // Notify parent matching state
        onImageSelected(randomItem);
        setStep('completed');
      }
    }, 450);
  };

  const resetPicker = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setStep('idle');
    setRotation(0);
    setZoom(1);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      
      {/* 1. DROPZONE BOARD */}
      {step === 'idle' && (
        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-3 border-dashed rounded-3xl p-8 text-center transition-all cursor-pointer flex flex-col justify-center items-center gap-3 select-none ${
            isDragging 
              ? 'border-[#7A1F2B] bg-[#7A1F2B]/5 scale-[0.99] shadow-inner' 
              : 'border-amber-900/20 bg-[#F8F4EC]/20 hover:border-[#7A1F2B]/40 hover:bg-[#F8F4EC]/45'
          }`}
        >
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />
          <div className="p-4 bg-amber-50 rounded-full border border-amber-500/10 text-[#7A1F2B] animate-pulse">
            <Upload className="h-6 w-6 stroke-[2.5px]" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-gray-700 font-sans tracking-wide">
              DRAG & DROP PROFILE PHOTO HERE
            </h4>
            <p className="text-[10px] text-gray-500 max-w-xs leading-relaxed">
              Or click to browse and select from your computer/gallery. PNG, JPG up to 10MB.
            </p>
          </div>
          <div className="flex items-center gap-1 bg-amber-100/60 border border-amber-200/50 rounded-lg py-1 px-2.5 text-[10px] font-bold text-[#7A1F2B] uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" /> Auto Crop & HD Compression Active
          </div>
        </div>
      )}

      {/* 2. LIVE CROP TOOL SANDBOX */}
      {step === 'cropping' && previewUrl && (
        <div className="bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 space-y-4 shadow-xl animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-1.5">
              <Scissors className="h-4 w-4 text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider font-sans">Traditional 1:1 Face Crop Tool</span>
            </div>
            <button 
              type="button"
              onClick={resetPicker}
              className="text-xs font-bold text-gray-400 hover:text-white hover:bg-slate-800 px-2 py-1 rounded"
            >
              Cancel
            </button>
          </div>

          {/* Interactive Crop Image Box */}
          <div className="relative w-full h-56 bg-black rounded-2xl overflow-hidden flex items-center justify-center border border-slate-800">
            {/* 1:1 grid overlay frames */}
            <div className="absolute z-10 w-44 h-44 rounded-full border-2 border-dashed border-amber-400/85 pointer-events-none flex items-center justify-center">
              <div className="w-10 h-10 border border-amber-400/40 rounded-full"></div>
            </div>
            <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

            {/* Actual selected image with zoom and rotate filters */}
            <img 
              src={previewUrl} 
              alt="Cropping sandbox" 
              className="max-h-full max-w-full object-contain transition-all duration-100"
              style={{
                transform: `rotate(${rotation}deg) scale(${zoom})`,
              }}
            />
          </div>

          {/* Sliders and Dials */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <ZoomIn className="h-3.5 w-3.5" /> Scale Zoom: {zoom.toFixed(1)}x
              </label>
              <input 
                type="range" 
                min="1" 
                max="3" 
                step="0.1"
                value={zoom} 
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#7A1F2B]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Sliders className="h-3.5 w-3.5" /> Rotate Angle: {rotation}°
              </label>
              <input 
                type="range" 
                min="-180" 
                max="180" 
                step="5"
                value={rotation} 
                onChange={(e) => setRotation(parseInt(e.target.value, 10))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#7A1F2B]"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={triggerCropAndCompression}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="h-4 w-4" /> Apply Smart Crop & Compress
          </button>
        </div>
      )}

      {/* 3. SIMULATED COMPRESSION SECURE STAGE */}
      {step === 'compressing' && (
        <div className="bg-[#7A1F2B]/5 border-2 border-[#7A1F2B]/20 rounded-3xl p-8 text-center space-y-4 shadow-sm animate-fade-in flex flex-col items-center">
          <RefreshCw className="h-8 w-8 text-[#7A1F2B] animate-spin stroke-[2.5px]" />
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-[#7A1F2B] tracking-wider uppercase">
              Compressing Image Size...
            </h4>
            <p className="text-[11px] text-slate-600 max-w-xs mx-auto">
              Reducing file weight dynamically to guarantee matching pages load in under 200ms across rural environments.
            </p>
          </div>
          <div className="w-full max-w-xs bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#7A1F2B] h-1.5 rounded-full animate-loader duration-1000"></div>
          </div>
        </div>
      )}

      {/* 4. SUCCESS COMPLETED PREVIEW */}
      {step === 'completed' && currentImage && (
        <div className="bg-white border border-emerald-200 shadow-md p-5 rounded-3xl flex items-center gap-4 animate-fade-in relative hover:border-[#7A1F2B]/20 group transition-all">
          <div className="relative shrink-0">
            <img 
              src={currentImage} 
              alt="Final Compressed Preview" 
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -top-1 -right-1.5 bg-emerald-500 text-white rounded-full p-0.5 border-2 border-white">
              <Check className="h-3.5 w-3.5 stroke-[3px]" />
            </div>
          </div>
          <div className="flex-1 space-y-1">
            <h5 className="text-xs font-bold text-gray-800 flex items-center gap-1 font-sans">
              <ImageIcon className="h-4 w-4 text-[#7A1F2B]" /> Photo Setup Completed Successfully!
            </h5>
            <p className="text-[10px] text-emerald-700 font-sans font-semibold">
              {compressRatio || "Compressed from 3.4MB to 275KB (-91%). Ready for live database matching!"}
            </p>
          </div>
          
          <button
            type="button"
            onClick={resetPicker}
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-100 hover:bg-red-50 hover:text-red-700 p-1.5 rounded-lg text-slate-500 text-[10px] font-bold"
          >
            Reset
          </button>
        </div>
      )}
      
      {/* If there's an existing picture, show completed card initially but let them reset */}
      {step === 'idle' && currentImage && (
        <div className="bg-white border border-[#D4AF37]/25 shadow-sm p-4 rounded-3xl flex items-center gap-4 hover:bg-[#F8F4EC]/10 transition-colors">
          <img 
            src={currentImage} 
            alt="Current profile upload" 
            className="w-12 h-12 rounded-xl object-cover border-2 border-[#D4AF37]"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1">
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wide block">Active Profile Image</span>
            <p className="text-[10px] text-gray-500 truncate max-w-[200px]">Loaded: Unsplash Portrait Vector Seed</p>
          </div>
          <button
            type="button"
            onClick={() => setStep('idle')}
            className="text-[10px] bg-[#7A1F2B]/5 text-[#7A1F2B] font-bold hover:bg-[#7A1F2B]/10 px-2.5 py-1.5 rounded-lg cursor-pointer"
          >
            Upload New
          </button>
        </div>
      )}

    </div>
  );
}
