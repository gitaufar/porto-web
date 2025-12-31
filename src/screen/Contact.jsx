import React from 'react'

import TextType from '../component/Text/TextType.jsx'
const Contact = () => {

  const logo = [
    {
      img: "/icon_email.svg",
      link: "mailto:zhafiraufar123@gmail.com"
    },
    {
      img: "/icon_instagram.svg",
      link: "https://www.instagram.com/aufarzhfr/"
    },
    {
      img: "/icon_linkedin.svg",
      link: "https://www.linkedin.com/in/zhafir-aufar-522312289/"
    },
    {
      img: "/icon_github.svg",
      link: "https://github.com/gitaufar"
    },
  ]


  return (
    <section id='contact' className='min-h-screen min-w-screen py-20 px-6 md:px-10 lg:px-20 flex items-center justify-center'>
      <div className="relative z-2 flex justify-center h-full px-20 items-center text-white">
        <div className="text-center flex flex-col items-center gap-6">
          <h1 className="text-6xl text-white flex justify-center" style={{
            textShadow: '0 4px 16px rgba(0,0,0,0.6)',
          }}>
            Let's work
          </h1>
          <h1 className="text-6xl" style={{
            textShadow: '0 4px 16px rgba(0,0,0,0.6)',
          }}>together</h1>
          <div className="inline-block px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
            <h2
              className="text-4xl text-white font-medium underline"
              style={{
                textShadow: '0 4px 16px rgba(0,0,0,0.6)',
              }}
            >
              zhafiraufar123@gmail.com
            </h2>
          </div>
          <ul className="flex flex-row gap-6">
            {logo.map((item, index) => (
              <li key={index} data-aos="fade-left" data-aos-delay={index * 200}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <img
                    src={item.img}
                    alt="icon"
                    className="
            md:w-10 md:h-10
            w-8 h-8
            object-contain
            transition-all duration-300
            drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]
            hover:drop-shadow-[0_0_18px_rgba(255,255,255,0.6)]
            hover:scale-110
          "
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Contact