import React from 'react'

import TextType from '../component/Text/TextType.jsx'
const Contact = () => {

  return (
    <section id='contact' className='min-h-screen min-w-screen py-20 px-6 md:px-10 lg:px-20 flex items-center justify-center'>
      <div className="relative z-2 flex justify-center h-full px-20 items-center text-white">
        <div className="text-center">
          <h1 className="text-6xl font-bold">M Zhafir Aufar</h1>
          <TextType
            text={["Software Engineer", "Frontend Developer", "Mobile Developer"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            className="mt-4 text-5xl text-white"
          />
        </div>
      </div>
    </section>
  )
}

export default Contact