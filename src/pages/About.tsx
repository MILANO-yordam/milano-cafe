import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Award, Users, Clock, Heart } from 'lucide-react'

const About = () => {
  const { t } = useTranslation()

  const stats = [
    { icon: Users, value: '10,000+', label: 'Mamnun mijozlar' },
    { icon: Award, value: '5', label: 'Yillik tajriba' },
    { icon: Clock, value: '24/7', label: 'Xizmat vaqti' },
    { icon: Heart, value: '100%', label: 'Sifat kafolati' }
  ]

  const team = [
    {
      name: 'Ahmad Karimov',
      position: 'Bosh oshpaz',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: '15 yillik tajribaga ega professional oshpaz'
    },
    {
      name: 'Malika Tosheva',
      position: 'Restoran menejeri',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Mijozlar xizmatida 8 yillik tajriba'
    },
    {
      name: 'Bobur Aliyev',
      position: 'Sous-chef',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Italyan oshxonasi mutaxassisi'
    }
  ]

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold gradient-text mb-6">
            {t('about.title')}
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Milano Cafe - bu zamonaviy restoran bo'lib, 2019-yildan beri Toshkent shahrida 
            faoliyat yuritib kelmoqda. Biz mijozlarimizga eng sifatli taomlar va professional 
            xizmat ko'rsatishni maqsad qilganmiz.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect rounded-2xl p-6 text-center"
            >
              <stat.icon size={48} className="text-gold-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold gradient-text mb-2">{stat.value}</h3>
              <p className="text-white/70">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="glass-effect rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Bizning hikoyamiz</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Milano Cafe 2019-yilda kichik oilaviy restoran sifatida boshlangan. 
              Bizning maqsadimiz oddiy edi - odamlarga mazali va sifatli taomlar taklif etish.
            </p>
            <p className="text-white/70 leading-relaxed mb-4">
              Bugun biz Toshkentdagi eng mashhur restoranlardan biriga aylandik. 
              Bizning muvaffaqiyatimiz sirri - mijozlarimizga bo'lgan mehr va 
              sifatli xizmat ko'rsatishdir.
            </p>
            <p className="text-white/70 leading-relaxed">
              Har bir taom sevgi bilan tayyorlanadi va har bir mijoz maxsus 
              e'tibor bilan kutib olinadi. Bu bizning falsafamizdir.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <img
              src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Restaurant interior"
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold gradient-text text-center mb-12">
            Bizning jamoa
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="glass-effect rounded-2xl p-6 text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-gold-400 font-semibold mb-3">{member.position}</p>
                <p className="text-white/70 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-2xl p-8 text-center"
        >
          <h2 className="text-4xl font-bold gradient-text mb-8">Bizning qadriyatlarimiz</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-xl font-bold text-white mb-3">Sifat</h3>
              <p className="text-white/70">
                Faqat eng sifatli mahsulotlar va zamonaviy texnologiyalar
              </p>
            </div>
            
            <div>
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-bold text-white mb-3">Mehr</h3>
              <p className="text-white/70">
                Har bir taom sevgi va g'amxo'rlik bilan tayyorlanadi
              </p>
            </div>
            
            <div>
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-white mb-3">Ishonch</h3>
              <p className="text-white/70">
                Mijozlarimiz bilan uzoq muddatli munosabatlar qurish
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About