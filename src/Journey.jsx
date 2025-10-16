import React from 'react'
import './Journey.css'

const Journey = () => {
  const journeyData = [
    {
      id: 1,
      title: "IFEST Hackathon - Top 15 Finalist",
      organizer: "Universitas Padjadjaran",
      achievement: "Finalis Top 15 dari 42 Tim",
      image: "./journey/ifest.jpg",
      description: "Menjadi finalis top 15 dari 42 tim di IFEST Hackathon yang diadakan oleh Universitas Padjadjaran. Saya membuat website hanya dalam 24 jam dengan tugas sebagai:",
      tasks: [
        "Slicing Figma ke kode",
        "Fine-tuning AI model",
        "Integrasi seluruh komponen"
      ]
    },
    {
      id: 2,
      title: "Slashcom Android Hackathon - Juara 1",
      organizer: "UPN Veteran Jakarta",
      achievement: "Juara 1",
      image: "./journey/slashcom.jpg",
      description: "Meraih juara 1 di Slashcom Android Hackathon yang diselenggarakan oleh UPN Veteran Jakarta. Saya membuat aplikasi Android hanya dalam waktu 3 hari dengan tugas sebagai:",
      tasks: [
        "Slicing Figma ke Android UI",
        "Setup Firebase",
        "Integrasi aplikasi dengan backend"
      ]
    }
  ]

  return (
    <section id='journey' className='journey-section py-20 px-6 md:px-10 bg-[#0a0a0a]'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-4xl md:text-5xl font-bold text-center mb-4 text-white'>My Journey</h1>
        <p className='text-center text-gray-400 mb-16 max-w-2xl mx-auto text-base md:text-lg'>
          Transforming ideas into reality through code, one hackathon at a time. Here's my journey during college era, pushing boundaries and building solutions under pressure.
        </p>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12'>
          {journeyData.map((journey) => (
            <div key={journey.id} className='journey-card bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-blue-500'>
              <div className='relative overflow-hidden group h-64 md:h-80'>
                <img 
                  src={journey.image} 
                  alt={journey.title}
                  className='w-full h-full object-contain bg-[#0f0f0f] transition-transform duration-300 group-hover:scale-105'
                />
                <div className='absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg'>
                  {journey.achievement}
                </div>
              </div>
              
              <div className='p-6 md:p-8'>
                <h2 className='text-2xl md:text-3xl font-bold mb-2 text-white'>{journey.title}</h2>
                <p className='text-blue-400 mb-4 text-sm md:text-base font-medium'>{journey.organizer}</p>
                
                <p className='text-gray-300 mb-6 leading-relaxed text-sm md:text-base'>
                  {journey.description}
                </p>
                
                <div className='space-y-2'>
                  <h3 className='font-semibold text-lg mb-3 text-white'>Tugas & Kontribusi:</h3>
                  <ul className='space-y-2'>
                    {journey.tasks.map((task, index) => (
                      <li key={index} className='flex items-start'>
                        <span className='text-blue-400 mr-3 mt-1 text-lg'>▹</span>
                        <span className='text-gray-300 text-sm md:text-base'>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Journey