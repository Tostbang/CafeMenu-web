import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const benefits = [
  'Baskı maliyetlerini %90 azaltın',
  'Menü ürünlerini anında güncelleyin',
  'Çevre dostu dijital çözüm',
  'Müşteri deneyimini iyileştirin',
  'Menü analizlerini takip edin',
  'Uygulama indirmeye gerek yok',
  'Her akıllı telefonda çalışır',
  'Çoklu şube desteği',
];

export function Benefits() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FFF9F9]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute inset-0 bg-[#FF6B6B] rounded-3xl blur-3xl opacity-10" />
            <div className="relative">
              <img
                src="/src/imports/original-58507d97c33ff1dd23e1504881d7ce03.jpg"
                alt="Menü uygulaması önizlemesi"
                className="rounded-3xl shadow-2xl w-full h-auto"
              />
            </div>
          </motion.div>

          {/* Right - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8 order-1 lg:order-2"
          >
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
                Kafe sahipleri neden{' '}
                <span className="text-[#FF6B6B]">
                  MenuQR seviyor
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                İşletmesini dijital menülerle dönüştüren binlerce başarılı
                kafe ve restorana katılın.
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="bg-[#FF6B6B] rounded-full p-1 shrink-0">
                    <CheckCircle2 className="size-5 text-white" />
                  </div>
                  <span className="text-lg text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl border border-[#FFE0E0]">
              <div className="flex items-start gap-4">
                <div className="bg-[#FFF5F5] rounded-full p-3 shrink-0">
                  <svg className="size-6 text-[#FF6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1 text-gray-900">Hızlı Kurulum Garantisi</h4>
                  <p className="text-gray-600">Dijital menünüzü 15 dakikadan kısa sürede yayına alın; aksi halde MenuQR ekibi sizin için tamamen ücretsiz kurulum yapar.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
