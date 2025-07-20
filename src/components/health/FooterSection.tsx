import styles from '../../app/demo/health/health.module.css';

export default function FooterSection() {
  return (
    <footer className="w-full bg-[#13294B] text-white py-10 px-4 mt-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3 mb-2 md:mb-0">
          <div className="w-10 h-10 rounded-full bg-[#FFD600] flex items-center justify-center text-2xl font-bold text-[#13294B]">🦷</div>
          <div className="font-bold text-lg">BrightSmile Dental</div>
        </div>
        <div className="text-center md:text-left">
          <div>123 Main St, Suburbia</div>
          <div>Open 8am – 8pm, 7 Days</div>
          <div>Phone: <a href="tel:1234567890" className="underline text-[#FFD600]">(123) 456-7890</a></div>
        </div>
        <div className="flex gap-3 mt-3 md:mt-0">
          <a href="#" className="text-[#FFD600] text-xl" aria-label="Facebook">&#x1F426;</a>
          <a href="#" className="text-[#FFD600] text-xl" aria-label="Instagram">&#x1F4F7;</a>
        </div>
        <div className="text-center md:text-right text-xs mt-2 md:mt-0">
          <a href="#" className="underline text-[#FFD600]">Privacy Policy</a>
          <div className="text-gray-300 mt-1">&copy; {new Date().getFullYear()} BrightSmile Dental</div>
        </div>
      </div>
    </footer>
  );
} 