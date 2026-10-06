import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Lightbulb, 
  Battery, 
  Wrench, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  Info,
  ShieldCheck,
  Cpu
} from 'lucide-react';

const MATERIALS = [
  {
    id: 'copper_wire',
    name: 'Dây đồng',
    type: 'conductor',
    category: 'Kim loại',
    icon: '🔶',
    description: 'Đồng là kim loại có tính dẫn điện rất tốt, thường dùng làm lõi dây điện trong gia đình.',
    conductivity: 'Cao'
  },
  {
    id: 'iron_nail',
    name: 'Đinh sắt',
    type: 'conductor',
    category: 'Kim loại',
    icon: '🔩',
    description: 'Sắt là kim loại dẫn điện tốt, tuy nhiên ít dùng làm dây dẫn bằng đồng vì dễ bị gỉ sét.',
    conductivity: 'Trung bình'
  },
  {
    id: 'stainless_spoon',
    name: 'Thìa inox',
    type: 'conductor',
    category: 'Hợp kim',
    icon: '🥄',
    description: 'Inox (thép không gỉ) là hợp kim của sắt và crôm, có khả năng dẫn điện.',
    conductivity: 'Trung bình'
  },
  {
    id: 'wood_block',
    name: 'Thanh gỗ',
    type: 'insulator',
    category: 'Vật liệu tự nhiên',
    icon: '🪵',
    description: 'Gỗ khô là vật liệu cách điện hoàn toàn, ngăn chặn dòng điện chạy qua.',
    conductivity: 'Không có (Cách điện)'
  },
  {
    id: 'plastic_piece',
    name: 'Mảnh nhựa',
    type: 'insulator',
    category: 'Chất dẻo',
    icon: '🧩',
    description: 'Nhựa không dẫn điện, được ứng dụng rộng rãi làm vỏ bọc bảo vệ an toàn cho dây điện.',
    conductivity: 'Không có (Cách điện)'
  },
  {
    id: 'fabric_cloth',
    name: 'Vải cotton',
    type: 'insulator',
    category: 'Vật liệu dệt',
    icon: '🧶',
    description: 'Vải khô là vật liệu cách điện. Tuy nhiên, vải ẩm ướt có thể dẫn điện do chứa nước và tạp chất.',
    conductivity: 'Không có (Cách điện)'
  }
];

export default function App() {
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS[0]);
  const [switchClosed, setSwitchClosed] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('lab');
  const [animationSpeed, setAnimationSpeed] = useState(1);

  // Derived state
  const isLit = switchClosed && selectedMaterial.type === 'conductor';

  const playTingSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.25); // A5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch (e) {
      console.log("Audio Context blocked or not supported");
    }
  };

  useEffect(() => {
    if (isLit) {
      playTingSound();
    }
  }, [isLit]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans select-none">
      {/* Top Navbar */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <div className="bg-amber-500/20 p-2 rounded-xl border border-amber-500/30 text-amber-400">
            <Zap className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Phòng Thí Nghiệm Ảo: Mạch Điện Đơn Giản
            </h1>
            <p className="text-xs text-slate-400">Khám phá tính dẫn điện của vật liệu xung quanh bạn</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-xl bg-slate-700/50 hover:bg-slate-700 border border-slate-600 transition text-slate-300 hover:text-white"
            title={soundEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 text-emerald-400" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
          </button>
          
          <button 
            onClick={() => {
              setSelectedMaterial(MATERIALS[0]);
              setSwitchClosed(true);
            }}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition shadow-lg shadow-indigo-600/30"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Đặt lại</span>
          </button>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 lg:p-6 overflow-hidden">
        
        {/* Left Column: Mode Menu & Instructions (3 cols) */}
        <div className="lg:col-span-3 flex flex-col space-y-4">
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 shadow-xl">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Menu Chế Độ</span>
            </h2>
            <div className="space-y-2">
              <button 
                onClick={() => setActiveTab('lab')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition ${activeTab === 'lab' ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300' : 'hover:bg-slate-700/50 text-slate-300'}`}
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Thí Nghiệm Mạch Điện</span>
              </button>
              <button 
                onClick={() => setActiveTab('guide')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition ${activeTab === 'guide' ? 'bg-indigo-500/20 border border-indigo-500/40 text-indigo-300' : 'hover:bg-slate-700/50 text-slate-300'}`}
              >
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Hướng Dẫn Sử Dụng</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 shadow-xl flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center space-x-2">
                <Info className="w-4 h-4 text-emerald-400" />
                <span>Trạng Thái Mạch</span>
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-700">
                  <span className="text-sm text-slate-400">Công tắc:</span>
                  <button 
                    onClick={() => setSwitchClosed(!switchClosed)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${switchClosed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}
                  >
                    {switchClosed ? 'ĐÓNG (ON)' : 'MỞ (OFF)'}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-700">
                  <span className="text-sm text-slate-400">Trạng thái đèn:</span>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center space-x-1.5 ${isLit ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-700 text-slate-400'}`}>
                    <span className={`w-2 h-2 rounded-full ${isLit ? 'bg-amber-400 animate-ping' : 'bg-slate-500'}`}></span>
                    <span>{isLit ? 'SÁNG' : 'TẮT'}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 leading-relaxed">
              💡 <strong>Mẹo:</strong> Click vào các vật liệu bên phải để đưa vào khoảng hở của mạch điện và quan sát hiện tượng!
            </div>
          </div>
        </div>

        {/* Center Column: Circuit Diagram / Workspace (6 cols) */}
        <div className="lg:col-span-6 bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-xl flex flex-col relative overflow-hidden">
          {activeTab === 'lab' ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-slate-200 flex items-center space-x-2">
                  <Wrench className="w-4 h-4 text-amber-400" />
                  <span>Sơ Đồ Mạch Điện Thực Tế</span>
                </h2>
                <div className="text-xs px-2.5 py-1 rounded-lg bg-slate-700/50 text-slate-300 border border-slate-600">
                  Vật liệu thử: <strong className="text-amber-400">{selectedMaterial.name} {selectedMaterial.icon}</strong>
                </div>
              </div>

              {/* Circuit Board Canvas / Graphic Container */}
              <div className="flex-1 bg-slate-950/80 rounded-2xl border border-slate-700/80 flex flex-col items-center justify-center p-6 relative overflow-hidden min-h-[380px]">
                
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30"></div>

                {/* SVG Circuit Path & Components */}
                <div className="relative w-full max-w-lg h-72 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 250">
                    {/* Wires */}
                    <path 
                      d="M 60 125 L 120 125 M 280 125 L 340 125 M 60 40 L 340 40 L 340 125 M 60 40 L 60 125" 
                      fill="none" 
                      stroke={isLit ? "#ef4444" : "#64748b"} 
                      strokeWidth="5" 
                      strokeLinecap="round"
                      strokeDasharray={isLit ? "8 4" : "none"}
                      className={isLit ? "animate-[dash_1s_linear_infinite]" : ""}
                    />
                  </svg>

                  {/* Top Bar: Battery */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl flex items-center space-x-3 shadow-lg z-10">
                    <Battery className="w-6 h-6 text-amber-400" />
                    <div>
                      <div className="text-xs font-bold text-slate-200">Nguồn Điện (Pin 9V)</div>
                      <div className="text-[10px] text-slate-400">Cung cấp dòng điện</div>
                    </div>
                  </div>

                  {/* Left Box: Switch */}
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-slate-900 border border-slate-700 p-3 rounded-xl flex flex-col items-center shadow-lg z-10">
                    <span className="text-[10px] text-slate-400 mb-1">Công tắc</span>
                    <button 
                      onClick={() => setSwitchClosed(!switchClosed)}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xs transition shadow ${switchClosed ? 'bg-emerald-600 text-white shadow-emerald-600/40' : 'bg-rose-600 text-white shadow-rose-600/40'}`}
                    >
                      {switchClosed ? 'ON' : 'OFF'}
                    </button>
                  </div>

                  {/* Right Box: Light Bulb */}
                  <div className={`absolute right-6 top-1/2 -translate-y-1/2 bg-slate-900 border p-3 rounded-xl flex flex-col items-center shadow-lg z-10 transition-all duration-300 ${isLit ? 'border-amber-500 shadow-amber-500/40 bg-amber-950/20' : 'border-slate-700'}`}>
                    <span className="text-[10px] text-slate-400 mb-1">Bóng Đèn</span>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isLit ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/80 scale-110' : 'bg-slate-800 text-slate-500'}`}>
                      <Lightbulb className={`w-7 h-7 ${isLit ? 'text-slate-950 fill-slate-950 animate-bounce' : 'text-slate-500'}`} />
                    </div>
                    <span className={`text-[10px] mt-1 font-bold ${isLit ? 'text-amber-400' : 'text-slate-500'}`}>
                      {isLit ? 'PHÁT SÁNG' : 'TẮT'}
                    </span>
                  </div>

                  {/* Center Gap: Material Under Test */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className={`px-4 py-3 rounded-2xl border-2 flex items-center space-x-2.5 shadow-2xl transition-all duration-300 ${selectedMaterial.type === 'conductor' ? 'bg-slate-900/90 border-emerald-500/80 shadow-emerald-500/20' : 'bg-slate-900/90 border-rose-500/80 shadow-rose-500/20'}`}>
                      <span className="text-2xl">{selectedMaterial.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-slate-200">{selectedMaterial.name}</div>
                        <div className={`text-[10px] font-semibold ${selectedMaterial.type === 'conductor' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {selectedMaterial.type === 'conductor' ? '⚡ Dẫn điện' : '🛡️ Cách điện'}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Status Notice Banner */}
                <div className={`w-full mt-4 p-3 rounded-xl border flex items-center space-x-3 transition-all ${isLit ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' : 'bg-rose-950/30 border-rose-500/40 text-rose-200'}`}>
                  {isLit ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div className="text-xs">
                        <strong>Mạch kín & Vật liệu dẫn điện:</strong> Dòng điện chạy qua mạch làm bóng đèn phát sáng rực rỡ!
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      <div className="text-xs">
                        <strong>Mạch hở hoặc Vật liệu cách điện:</strong> Không có dòng điện chạy qua, bóng đèn không sáng.
                      </div>
                    </>
                  )}
                </div>

              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col justify-center p-6 space-y-4">
              <h3 className="text-lg font-bold text-amber-400 flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Hướng Dẫn Thí Nghiệm Khoa Học</span>
              </h3>
              <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700">
                  <strong>Bước 1:</strong> Chọn một vật liệu thử nghiệm từ bảng danh sách bên phải màn hình.
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700">
                  <strong>Bước 2:</strong> Đảm bảo công tắc ở trạng thái Đóng (ON).
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700">
                  <strong>Bước 3:</strong> Quan sát hiện tượng: Nếu đèn sáng, vật liệu đó dẫn điện; nếu đèn không sáng, vật liệu đó cách điện.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Material Selection & Knowledge Explanation (3 cols) */}
        <div className="lg:col-span-3 flex flex-col space-y-4 overflow-hidden">
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 shadow-xl flex-1 flex flex-col overflow-hidden">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Bảng Chọn Vật Liệu</span>
            </h2>

            <div className="space-y-2.5 overflow-y-auto pr-1 flex-1">
              {MATERIALS.map((mat) => {
                const isSelected = selectedMaterial.id === mat.id;
                return (
                  <button
                    key={mat.id}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between ${isSelected ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg' : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-700/40 hover:border-slate-600'}`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{mat.icon}</span>
                      <div>
                        <div className="text-xs font-bold">{mat.name}</div>
                        <div className="text-[10px] text-slate-400">{mat.category}</div>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${mat.type === 'conductor' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'}`}>
                      {mat.type === 'conductor' ? 'Dẫn điện' : 'Cách điện'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation Card */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 shadow-xl">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-2">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>Giải Thích Khoa Học</span>
            </h3>
            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-700 text-xs text-slate-300 leading-relaxed">
              <p className="font-bold text-amber-300 mb-1">{selectedMaterial.name} ({selectedMaterial.type === 'conductor' ? 'Vật dẫn điện' : 'Vật cách điện'})</p>
              <p>{selectedMaterial.description}</p>
            </div>
          </div>

        </div>

      </div>

      {/* Footer */}
      <footer className="bg-slate-800 border-t border-slate-700 px-6 py-3 text-center text-xs text-slate-400">
        Ứng dụng phòng thí nghiệm ảo giáo dục • Hỗ trợ học tập môn Khoa học tự nhiên
      </footer>
    </div>
  );
}