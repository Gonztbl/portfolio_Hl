import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Star, 
  ChevronDown,
  Menu,
  X,
  Music,
  Coffee,
  Gamepad2,
  MessageCircle,
  Mail
} from 'lucide-react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const Facebook = ({ size = 24, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = ({ size = 24, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);


// Custom colors based on the requested "cute bright green" theme
const theme = {
  primary: '#a3e635', // Lime 400
  secondary: '#d9f99d', // Lime 200
  accent: '#ecfccb', // Lime 100
  dark: '#365314', // Lime 900
  text: '#172554', // Blue 900 (for good contrast)
  bg: '#f7fee7' // Lime 50
};

const galleryImages = [
  {
    id: 1,
    title: "Dạo phố đêm ✨",
    category: "Daily Life",
    image: "/images/image_2.png", 
    color: "#bbf7d0",
    rotate: "-2deg"
  },
  {
    id: 2,
    title: "Cuối tuần vui vẻ 🌷",
    category: "Weekend",
    image: "/images/image_3.png", 
    color: "#fef08a",
    rotate: "3deg"
  },
  {
    id: 3,
    title: "Góc chill 🍵",
    category: "Cafe Hopping",
    image: "/images/image_4.png",
    color: "#cffafe",
    rotate: "-1deg"
  },
  {
    id: 4,
    title: "Ngày đầy nắng 🌻",
    category: "Travel",
    image: "/images/image_5.png",
    color: "#fbcfe8",
    rotate: "2deg"
  }
];

const MorphingShape = ({ className = '', delay = 0, style = {} }: { className?: string; delay?: number; style?: React.CSSProperties }) => (
  <motion.div
    className={`absolute rounded-full mix-blend-multiply filter blur-xl opacity-70 ${className}`}
    style={style}
    animate={{
      scale: [1, 1.2, 1],
      rotate: [0, 90, 0],
      borderRadius: ["50%", "30%", "50%"],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }}
  />
);

const Navbar = ({ isScrolled }: { isScrolled: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-tighter"
          style={{ color: theme.dark }}
        >
          MiuMiu<span style={{ color: theme.primary }}>.</span>
        </motion.div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {['Work', 'About', 'Play', 'Contact'].map((item, i) => (
            <motion.a 
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium hover:text-lime-500 transition-colors"
              style={{ color: theme.text }}
            >
              {item}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 rounded-full font-medium shadow-sm transition-all inline-block"
            style={{ backgroundColor: theme.primary, color: theme.dark }}
          >
            Say Hi 👋
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} style={{ color: theme.dark }}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-lime-100"
          >
            <div className="flex flex-col p-6 space-y-4 text-center">
              {['Work', 'About', 'Play', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium py-2"
                  style={{ color: theme.text }}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const GallerySection = () => {
  return (
    <section id="work" className="py-16 md:py-32 relative z-20" style={{ backgroundColor: theme.bg }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12 md:mb-20 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="inline-block px-4 py-2 bg-lime-200 text-lime-900 rounded-full font-bold text-sm mb-4">
              📸 Kỷ niệm của Miu
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4" style={{ color: theme.text }}>My Moments</h2>
            <p className="text-lg md:text-xl font-medium" style={{ color: theme.dark }}>Những khoảnh khắc vui vẻ được lưu giữ lại 🧸</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {galleryImages.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: index * 0.15 
              }}
              className="relative group cursor-pointer mt-8 lg:mt-0"
              style={{
                // Tạo hiệu ứng so le cho các hàng
                marginTop: index % 2 !== 0 && window.innerWidth > 1024 ? '3rem' : '0'
              }}
            >
              {/* Trang trí Gấu bông (Teddy Bears) - responsive positioning */}
              <motion.div 
                animate={{ rotate: [-10, 10, -10], y: [0, -5, 0] }} 
                transition={{ repeat: Infinity, duration: 3 + index, ease: "easeInOut" }} 
                className="absolute -top-6 left-1 md:-left-6 text-4xl md:text-5xl z-30 drop-shadow-lg filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.1)] group-hover:scale-125 transition-transform"
              >
                🧸
              </motion.div>
              <motion.div 
                animate={{ rotate: [10, -10, 10], y: [0, 5, 0] }} 
                transition={{ repeat: Infinity, duration: 4 + index, ease: "easeInOut" }} 
                className="absolute -bottom-6 right-1 md:-right-4 text-3xl md:text-4xl z-30 drop-shadow-lg filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.1)] group-hover:scale-125 transition-transform"
              >
                🎀
              </motion.div>

              {/* Khung ảnh Polaroid */}
              <div 
                className="bg-white p-3 pb-8 rounded-[1.5rem] shadow-xl border-4 border-lime-50 transition-all duration-500 group-hover:shadow-2xl relative z-20"
                style={{ transform: `rotate(${item.rotate})` }}
              >
                {/* Băng dính trang trí */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/60 backdrop-blur-sm border border-gray-200/50 shadow-sm rotate-[-3deg] z-30"></div>

                {/* Container Hình ảnh */}
                <div 
                  className="relative overflow-hidden rounded-xl aspect-[3/4] mb-4 bg-gray-100"
                  style={{ backgroundColor: item.color }}
                >
                  <motion.img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Lớp phủ khi Hover */}
                  <div className="absolute inset-0 bg-lime-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Tiêu đề & Thể loại */}
                <div className="px-2 text-center">
                  <h3 className="text-xl font-black mb-1 font-['Comic_Sans_MS',_cursive,sans-serif]" style={{ color: theme.text }}>
                    {item.title}
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-lime-100" style={{ color: theme.dark }}>
                    {item.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MarqueeSection = () => {
  return (
    <div className="py-4 md:py-8 overflow-hidden flex whitespace-nowrap bg-lime-400 rotate-[-2deg] scale-105 border-y-4 border-lime-600 shadow-xl relative z-30">
      <motion.div 
        className="flex space-x-4 md:space-x-8 items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...Array(10)].map((_, i) => (
          <React.Fragment key={i}>
            <span className="text-xl md:text-4xl font-black text-lime-900 uppercase">Cute Design</span>
            <Star className="text-white w-5 h-5 md:w-8 md:h-8" />
            <span className="text-xl md:text-4xl font-black text-white uppercase outline-text">Happy Users</span>
            <Heart className="text-lime-900 w-5 h-5 md:w-8 md:h-8" />
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

const PlaySection = () => {
  return (
    <section id="play" className="py-16 md:py-32 relative z-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-2 bg-lime-100 text-lime-900 rounded-full font-bold text-sm mb-4">
              🎡 My Playground
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4" style={{ color: theme.text }}>Góc Giải Trí</h2>
            <p className="text-lg md:text-xl font-medium" style={{ color: theme.dark }}>Khi không bận rộn, Miu thường làm gì? 🎮</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Music */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="bg-lime-50 rounded-[2.5rem] p-8 border-4 border-lime-100 shadow-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-125 transition-transform duration-500">
              <Music size={100} color={theme.primary} />
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border-2 border-lime-200">
                <Music size={28} style={{ color: theme.dark }} />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: theme.text }}>Now Playing</h3>
              <p className="text-gray-600 font-medium mb-6">Những giai điệu Lofi chill chill để nạp lại năng lượng.</p>
              
              {/* Cute Vinyl Record Animation */}
              <div className="w-32 h-32 mx-auto bg-gray-900 rounded-full border-4 border-gray-800 shadow-lg flex items-center justify-center animate-spin-slow">
                <div className="w-12 h-12 bg-lime-300 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Hobbies */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -10 }}
            className="bg-blue-50 rounded-[2.5rem] p-8 border-4 border-blue-100 shadow-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-125 transition-transform duration-500">
              <Coffee size={100} color="#93c5fd" />
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border-2 border-blue-200">
                <Coffee size={28} className="text-blue-900" />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: theme.text }}>Caffeine Addict</h3>
              <p className="text-gray-600 font-medium mb-6">Trà sữa 50% đường, 50% đá hoặc một ly Matcha Latte. 🍵</p>
              
              {/* Floating bubbles */}
              <div className="flex justify-center gap-4 mt-8 h-24 items-end pb-4">
                {[1, 2, 3].map((i) => (
                  <motion.div 
                    key={i}
                    animate={{ y: [0, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 2 + i, ease: "easeInOut" }}
                    className="w-10 h-10 bg-blue-200 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-lg"
                  >
                    🧋
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 3: Games */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -10 }}
            className="bg-pink-50 rounded-[2.5rem] p-8 border-4 border-pink-100 shadow-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-125 transition-transform duration-500">
              <Gamepad2 size={100} color="#f9a8d4" />
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border-2 border-pink-200">
                <Gamepad2 size={28} className="text-pink-900" />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: theme.text }}>Cozy Gamer</h3>
              <p className="text-gray-600 font-medium mb-6">Giải trí nhẹ nhàng với Animal Crossing, Stardew Valley... 🌸</p>
              
              {/* Bouncing Game Controller */}
              <div className="flex justify-center mt-8">
                <motion.div 
                  animate={{ rotate: [-10, 10, -10], scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="px-6 py-3 bg-pink-200 rounded-full font-bold text-pink-900 border-2 border-white shadow-md flex items-center gap-2"
                >
                  <Star size={16} /> Press Start
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="relative pt-16 md:pt-32 pb-8 overflow-hidden" style={{ backgroundColor: theme.bg }}>
      {/* Nền uốn éo trang trí */}
      <MorphingShape className="w-[40rem] h-[40rem] -bottom-60 -right-20 opacity-40" style={{ backgroundColor: theme.primary }} />
      <MorphingShape className="w-[30rem] h-[30rem] -bottom-40 -left-20 opacity-40" style={{ backgroundColor: theme.secondary }} delay={2} />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-2 bg-white text-lime-600 rounded-full font-bold text-sm mb-4 shadow-sm border-2 border-lime-200">
              💌 Keep in touch
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-6" style={{ color: theme.text }}>
              Kết nối với Miu nhé! <span className="text-lime-500 hover:animate-ping inline-block">💬</span>
            </h2>
            <p className="text-lg md:text-xl font-medium text-gray-600 max-w-2xl mx-auto">
              Mình luôn sẵn lòng làm quen với những người bạn mới. Đừng ngại nhắn tin cho mình qua các mạng xã hội dưới đây nha! 🌻
            </p>
          </motion.div>
        </div>

        {/* Khung chứa các mạng xã hội */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-lg p-6 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-[3rem] shadow-xl border-4 border-lime-100 mb-16 relative"
        >
          {/* Icon trang trí - responsive positioning */}
          <div className="absolute -top-6 left-1 sm:-left-8 text-5xl sm:text-6xl drop-shadow-md animate-bounce">📮</div>
          <div className="absolute -bottom-6 right-1 sm:-right-6 text-5xl sm:text-6xl drop-shadow-md animate-bounce" style={{ animationDelay: '1s' }}>🕊️</div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Facebook Button */}
            <motion.a
              href="https://facebook.com/your-link" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center p-6 bg-blue-50 rounded-[2rem] border-2 border-blue-200 hover:bg-blue-100 hover:border-blue-400 transition-colors group"
            >
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <Facebook size={32} />
              </div>
              <span className="font-bold text-blue-900 text-lg">Facebook</span>
              <span className="text-blue-600 text-sm font-medium mt-1">@miumiu.cute</span>
            </motion.a>

            {/* Instagram Button */}
            <motion.a
              href="https://instagram.com/your-link" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center p-6 bg-pink-50 rounded-[2rem] border-2 border-pink-200 hover:bg-pink-100 hover:border-pink-400 transition-colors group"
            >
              <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 text-white rounded-full flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <Instagram size={32} />
              </div>
              <span className="font-bold text-pink-900 text-lg">Instagram</span>
              <span className="text-pink-600 text-sm font-medium mt-1">@miu_miu_ig</span>
            </motion.a>

            {/* Zalo Button */}
            <motion.a
              href="https://zalo.me/your-phone-number" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center p-6 bg-cyan-50 rounded-[2rem] border-2 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-400 transition-colors group"
            >
              <div className="w-16 h-16 bg-cyan-500 text-white rounded-full flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                <MessageCircle size={32} />
              </div>
              <span className="font-bold text-cyan-900 text-lg">Zalo Chat</span>
              <span className="text-cyan-600 text-sm font-medium mt-1">0987.xxx.xxx</span>
            </motion.a>

          </div>

          <div className="mt-8 text-center">
            <span className="text-gray-500 font-medium text-sm flex items-center justify-center gap-2">
              <Mail size={16} /> Hoặc email cho mình: <a href="mailto:hello@miumiu.design" className="text-lime-600 hover:underline font-bold">hello@miumiu.design</a>
            </span>
          </div>
        </motion.div>

        {/* Chân trang (Copyright) */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t-4 border-white/50 pt-8 mt-12 bg-white/30 backdrop-blur-sm p-6 rounded-3xl">
          <div className="text-2xl font-black tracking-tighter mb-4 md:mb-0" style={{ color: theme.dark }}>
            MiuMiu<span style={{ color: theme.primary }}>.</span>
          </div>
          
          <p className="text-sm font-bold text-lime-900 bg-lime-200/50 px-4 py-2 rounded-full">
            © {new Date().getFullYear()} MiuMiu. Coded with <Heart size={14} className="inline text-lime-600 fill-lime-600" /> & Matcha 🍵
          </p>
        </div>
      </div>
    </footer>
  );
};

const HeroSection = () => {
  return (
    <section id="about" className="relative min-h-[auto] md:min-h-screen flex items-center justify-center pt-24 pb-16 md:py-24 overflow-hidden" style={{ backgroundColor: theme.bg }}>
      {/* Background Morphing Shapes */}
      <MorphingShape className="w-60 h-60 md:w-80 md:h-80 -top-20 -left-20" style={{ backgroundColor: theme.primary }} delay={0} />
      <MorphingShape className="w-[20rem] h-[20rem] md:w-[30rem] md:h-[30rem] top-20 -right-40 opacity-60" style={{ backgroundColor: theme.secondary }} delay={1} />
      <MorphingShape className="w-72 h-72 md:w-96 md:h-96 -bottom-32 left-1/3 opacity-40" style={{ backgroundColor: theme.accent }} delay={2} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* CỘT TRÁI: KHUNG ẢNH */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotate: -5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="w-full md:w-1/2 flex justify-center relative mt-10 md:mt-0"
          >
            {/* Các icon lơ lửng trang trí - responsive positioning */}
            <motion.div animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute -top-6 left-2 sm:-left-2 text-4xl sm:text-5xl z-20 drop-shadow-md">✨</motion.div>
            <motion.div animate={{ y: [0, 15, 0], rotate: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute bottom-10 right-2 sm:-right-6 text-5xl sm:text-6xl z-20 drop-shadow-md">🌿</motion.div>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute top-1/2 left-2 sm:-left-8 text-3xl sm:text-4xl z-20 drop-shadow-md">💚</motion.div>

            {/* Khung viền và Hình ảnh */}
            <div className="relative p-3 sm:p-4 bg-white rounded-t-[15rem] rounded-b-[3rem] shadow-2xl border-4 border-dashed border-lime-300">
              {/* Bóng đổ khối phía sau (Brutalism effect) */}
              <div className="absolute inset-0 bg-lime-200 rounded-t-[15rem] rounded-b-[3rem] translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 -z-10 border-4 border-lime-400"></div>
              
              <img 
                src="/images/image_1.png" 
                alt="Miu Profile"
                className="w-[200px] h-[270px] sm:w-[280px] sm:h-[380px] md:w-[340px] md:h-[460px] object-cover rounded-t-[15rem] rounded-b-[2rem]"
              />
            </div>
          </motion.div>

          {/* CỘT PHẢI: THÔNG TIN & TRÍCH DẪN */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
            className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center"
          >
            <div className="inline-flex items-center justify-center md:justify-start gap-2 px-6 py-2 rounded-full mb-6 font-bold tracking-wide shadow-sm w-max mx-auto md:mx-0" style={{ backgroundColor: theme.secondary, color: theme.dark }}>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500"></span>
              </span>
              Hello world, mình là
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-2 tracking-tight drop-shadow-sm" style={{ color: theme.dark }}>
              Miu Miu<span style={{ color: theme.primary }}>.</span>
            </h1>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 opacity-80" style={{ color: theme.text }}>
              Creative Explorer 🧸
            </h2>
            
            {/* Khối Quote (Câu nói) */}
            <div className="relative bg-white/70 backdrop-blur-md p-5 sm:p-8 rounded-[2rem] border-2 border-white shadow-xl mb-10 text-left">
              <div className="absolute -top-5 -left-2 text-6xl text-lime-300 font-serif opacity-80 z-0">"</div>
              <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed relative z-10 italic" style={{ color: theme.dark }}>
                Mỗi ngày là một cơ hội để vẽ thêm một chút màu sắc rực rỡ vào cuộc sống. Mình luôn mong muốn tạo ra những niềm vui nhỏ bé, mang lại năng lượng tích cực cho mọi người xung quanh qua những điều mình làm! 🌻✨
              </p>
              <div className="absolute -bottom-8 right-4 text-6xl text-lime-300 font-serif opacity-80 z-0 rotate-180">"</div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <motion.a
                href="#work"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg shadow-lg flex items-center justify-center gap-3"
                style={{ backgroundColor: theme.primary, color: theme.dark }}
              >
                <Heart size={20} fill={theme.dark} />
                <span>Kỷ niệm của Miu</span>
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg border-2 bg-white/50 backdrop-blur-sm text-center"
                style={{ borderColor: theme.primary, color: theme.dark }}
              >
                Say Hi 👋
              </motion.a>
            </div>
          </motion.div>
          
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer z-20"
        style={{ color: theme.dark }}
      >
        <a href="#work" className="bg-white/50 p-2 rounded-full backdrop-blur-sm shadow-sm inline-block"><ChevronDown size={32} /></a>
      </motion.div>
    </section>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans antialiased text-gray-900 selection:bg-lime-300 selection:text-lime-900 overflow-x-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        body { font-family: 'Nunito', sans-serif; }
        .outline-text {
          color: transparent;
          -webkit-text-stroke: 2px white;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
      
      <Navbar isScrolled={isScrolled} />
      <main>
        <HeroSection />
        <MarqueeSection />
        <GallerySection />
        <PlaySection />
      </main>
      <Footer />
    </div>
  );
}
