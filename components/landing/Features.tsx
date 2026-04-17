import { motion } from 'motion/react';
import { 
  Smartphone, 
  TrendingUp, 
  Globe, 
  Zap, 
  Shield, 
  BarChart3,
  Clock,
  DollarSign,
  Image as ImageIcon
} from 'lucide-react';

const features = [
  {
    icon: Smartphone,
    title: 'Mobil Öncelikli Tasarım',
    description: 'Tüm cihazlar için optimize edildi. Menünüz her akıllı telefon ve tablette kusursuz görünür.',
    color: '#FF6B6B',
  },
  {
    icon: TrendingUp,
    title: 'Anlık Güncellemeler',
    description: 'Fiyatları ve ürünleri anında güncelleyin. Değişiklikler menüleri yeniden bastırmadan hemen yansır.',
    color: '#FF7777',
  },
  {
    icon: Globe,
    title: 'Çok Dilli Destek',
    description: 'Menünüzü birden fazla dile otomatik çevirerek uluslararası müşterilere kolayca hizmet verin.',
    color: '#FF8383',
  },
  {
    icon: Zap,
    title: 'Işık Hızında',
    description: 'Anında yükleme sayesinde müşteriler menünüzü saniyeler içinde inceleyebilir.',
    color: '#FF8F8F',
  },
  {
    icon: Shield,
    title: 'Güvenli ve Güvenilir',
    description: 'İşletmeniz için kurumsal düzeyde güvenlik ve %99,9 erişilebilirlik garantisi.',
    color: '#FF9B9B',
  },
  {
    icon: BarChart3,
    title: 'Gelişmiş Analitik',
    description: 'Popüler ürünleri, yoğun saatleri ve müşteri tercihlerini ayrıntılı içgörülerle takip edin.',
    color: '#FFA7A7',
  },
  {
    icon: Clock,
    title: 'Zamanlanmış Menüler',
    description: 'Kahvaltı, öğle ve akşam için farklı menüler ayarlayın. Saate göre otomatik geçiş yapın.',
    color: '#FFB3B3',
  },
  {
    icon: DollarSign,
    title: 'Gizli Ücret Yok',
    description: 'Siparişlerde komisyonsuz, şeffaf fiyatlandırma. Gördüğünüz fiyatı ödersiniz.',
    color: '#FFBFBF',
  },
  {
    icon: ImageIcon,
    title: 'Yüksek Kaliteli Görseller',
    description: 'Müşterilerin iştahını açan etkileyici fotoğraflarla ürünlerinizi öne çıkarın.',
    color: '#FFCBCB',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
            Başarı için ihtiyacınız olan{' '}
            <span className="text-[#FF6B6B]">
              her şey
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Kafe ve restoran sahipleri için özel olarak tasarlanmış güçlü özellikler
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-gray-100 hover:border-[#FF6B6B]/20">
                {/* Icon */}
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: feature.color }}
                >
                  <feature.icon className="size-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#FF6B6B] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
