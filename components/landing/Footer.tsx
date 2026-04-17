import { FacebookFilled, InstagramFilled, Linkedin01Filled } from 'asem-icons';
import { QrCode, } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#FF6B6B] p-2 rounded-xl">
                <QrCode className="size-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">MenuQR</span>
            </div>
            <p className="text-sm mb-4">
              Kafe ve restoranları modern dijital menü çözümleriyle güçlendiriyoruz.
            </p>
            <div className="flex gap-3">
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-[#FF6B6B] transition-colors">
                <FacebookFilled className="size-5" />
              </a>
              {/* <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-[#FF6B6B] transition-colors"> */}
              {/*   <Twitter className="size-5" /> */}
              {/* </a> */}
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-[#FF6B6B] transition-colors">
                <InstagramFilled className="size-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-[#FF6B6B] transition-colors">
                <Linkedin01Filled className="size-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-white mb-4">Ürün</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#FF6B6B] transition-colors">Özellikler</a></li>
              <li><a href="#" className="hover:text-[#FF6B6B] transition-colors">Fiyatlandırma</a></li>
              <li><a href="#" className="hover:text-[#FF6B6B] transition-colors">Şablonlar</a></li>
              <li><a href="#" className="hover:text-[#FF6B6B] transition-colors">Analitik</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Şirket</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#FF6B6B] transition-colors">Hakkımızda</a></li>
              <li><a href="#" className="hover:text-[#FF6B6B] transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-[#FF6B6B] transition-colors">Kariyer</a></li>
              <li><a href="#" className="hover:text-[#FF6B6B] transition-colors">İletişim</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Destek</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#FF6B6B] transition-colors">Yardım Merkezi</a></li>
              <li><a href="#" className="hover:text-[#FF6B6B] transition-colors">Dokümantasyon</a></li>
              <li><a href="#" className="hover:text-[#FF6B6B] transition-colors">API Referansı</a></li>
              <li><a href="#" className="hover:text-[#FF6B6B] transition-colors">Durum</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; 2026 MenuQR. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#FF6B6B] transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-[#FF6B6B] transition-colors">Kullanım Koşulları</a>
            <a href="#" className="hover:text-[#FF6B6B] transition-colors">Çerez Politikası</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
