import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { MyButton } from '../myButtons';

export function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-[#FF6B6B] rounded-3xl shadow-2xl"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative px-8 sm:px-12 py-16 sm:py-20">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-4xl sm:text-5xl font-bold text-white">
                Kafenizi dönüştürmeye hazır mısınız?
              </h2>
              <p className="text-xl text-white/90">
                Dünya genelinde 10 binden fazla kafe ve restorana katılın.
                14 günlük ücretsiz denemenizi bugün başlatın; kredi kartı
                gerekmez.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <MyButton 
                  // size="lg" 
                  className="bg-white text-[#FF6B6B] hover:bg-gray-100 text-lg px-8 py-6 shadow-xl"
                >
                  Ücretsiz Deneme Başlat
                  <ArrowRight className="size-5 ml-2" />
                </MyButton>
                <MyButton 
                  className="border-2 border-white bg-transparent text-white shadow-none hover:bg-white/10 text-lg px-8 py-6"
                >
                  Demo Planla
                </MyButton>
              </div>

              <div className="flex flex-wrap justify-center gap-6 pt-6">
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle2 className="size-5" />
                  <span>14 gün ücretsiz deneme</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle2 className="size-5" />
                  <span>Kredi kartı gerekmez</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle2 className="size-5" />
                  <span>İstediğiniz zaman iptal edin</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
