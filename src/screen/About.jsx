import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function About() {

  useEffect(() => {
    AOS.init({
      duration: 1000, // Durasi animasi dalam milidetik
      once: true, // Animasi hanya dijalankan sekali
    });
  }, []);

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
    <div className="w-screen h-screen flex flex-col items-center justify-center" id="about">

      
      <div className='flex flex-row'>
        <ul className='flex flex-row gap-0.5'>
          {logo.map((item, index) => (
            <li key={index} data-aos="fade-left" data-aos-delay={index * 200}>
              <a href={item.link}><img src={item.img} alt="icon" className="md:w-10 md:h-10 h-8 w-8 object-contain transition-transform duration-300 hover:scale-110" /></a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}