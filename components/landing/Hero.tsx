import { ArrowRight, Sparkles, QrCode } from 'lucide-react';
import { motion } from 'motion/react';
import { MyButton } from '../myButtons';

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFF5F5] rounded-full border border-[#FFE0E0]">
              <Sparkles className="size-4 text-[#FF6B6B]" />
              <span className="text-sm text-[#FF6B6B]">Modern Dijital Menü Çözümü</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-gray-900">
                Kafenizi{' '}
                <span className="text-[#FF6B6B]">
                  QR Kod Menülerle
                </span>
                dönüştürün
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Dakikalar içinde etkileyici dijital menüler oluşturun. QR kod
                teknolojisiyle müşterilerinize kesintisiz bir sipariş deneyimi
                sunun. Uygulama indirmeye gerek yok; tara ve incele.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <MyButton 
                className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white text-lg px-8 py-6"
              >
                Ücretsiz Deneme Başlat
                <ArrowRight className="size-5 ml-2" />
              </MyButton>
              <MyButton 
                className="bg-transparent text-lg px-8 py-6 border border-gray-300 shadow-none hover:border-[#FF6B6B] hover:text-[#FF6B6B]"
              >
                Demoyu İzle
              </MyButton>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-gray-900">10,000+</div>
                <div className="text-sm text-gray-600">Aktif Kafe</div>
              </div>
              <div className="h-12 w-px bg-gray-300" />
              <div>
                <div className="text-3xl font-bold text-gray-900">99.9%</div>
                <div className="text-sm text-gray-600">Erişilebilirlik</div>
              </div>
              <div className="h-12 w-px bg-gray-300" />
              <div>
                <div className="text-3xl font-bold text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-600">Puan</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - App Screenshots */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#FF6B6B] rounded-3xl blur-3xl opacity-10" />
            <div className="relative grid grid-cols-3 gap-4">
              <img
                src="/src/imports/original-58507d97c33ff1dd23e1504881d7ce03.jpg"
                alt="Menü uygulaması ekranı 1"
                className="rounded-2xl shadow-2xl col-span-1 h-auto object-cover"
              />
              <img
                src="/src/imports/original-bf2e460a93abc90d2bd7fb50e3ab4607.jpg"
                alt="Menü uygulaması ekranı 2"
                className="rounded-2xl shadow-2xl col-span-1 h-auto object-cover"
              />
              <img
                src="/src/imports/original-a0e6d1de9843867b5fb9f050f578f471.jpg"
                alt="Menü uygulaması ekranı 3"
                className="rounded-2xl shadow-2xl col-span-1 h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-[#FFF5F5] p-3 rounded-xl">
                  <QrCode className="size-8 text-[#FF6B6B]" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">QR Menü Hazır</div>
                  <div className="text-sm text-gray-600">Sipariş için tara</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
