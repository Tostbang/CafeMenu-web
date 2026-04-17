import { motion } from 'motion/react';
import { Upload, Palette, QrCode, Rocket } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Menünü Yükle',
    description: 'Sezgisel panelimiz üzerinden ürünlerini, fiyatlarını ve görsellerini kolayca ekle. Rahat gezinim için ürünleri kategorilere ayır.',
    step: '01',
    color: '#FF6B6B',
  },
  {
    icon: Palette,
    title: 'Tasarımı Özelleştir',
    description: 'Hazır şablonlardan seç veya kendi marka kimliğini oluştur. Menünü kafenin tarzına uygun hale getir.',
    step: '02',
    color: '#FF8E8E',
  },
  {
    icon: QrCode,
    title: 'QR Kodunu Oluştur',
    description: 'Benzersiz QR kodunu anında oluştur. Baskıya hazır şekilde farklı format ve boyutlarda indir.',
    step: '03',
    color: '#FFB1B1',
  },
  {
    icon: Rocket,
    title: 'Yayına Al ve Servise Başla',
    description: 'QR kodları masalara, afişlere veya müşterilerin tarayabileceği her yere yerleştir. İlk günden daha akıllı servis sun.',
    step: '04',
    color: '#FFD4D4',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
            Başlayın:{' '}
            <span className="text-[#FF6B6B]">
              4 Basit Adım
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dijital menünüzü dakikalar içinde yayına alın. Teknik bilgi gerekmez.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow h-full border border-gray-100">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 text-6xl font-bold text-gray-100">
                  {step.step}
                </div>

                {/* Icon */}
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 relative z-10"
                  style={{ backgroundColor: step.color }}
                >
                  <step.icon className="size-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-[#FFE0E0]" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
