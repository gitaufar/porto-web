import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiDownload } from "react-icons/fi";

export default function About() {

  useEffect(() => {
    AOS.init({
      duration: 1000, // Durasi animasi dalam milidetik
      once: true, // Animasi hanya dijalankan sekali
    });
  }, []);

  function Counter({ end = 0, duration = 1500, suffix = "", startDelay = 1100 }) {
    const ref = useRef(null);
    const [value, setValue] = useState(0);
    const frameRef = useRef();
    const timerRef = useRef();

    useEffect(() => {
      const node = ref.current;
      if (!node) return;

      let started = false;

      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

      const startAnimation = () => {
        const start = performance.now();

        const step = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeOutCubic(progress);
          const current = Math.round(end * eased);
          setValue(current);
          if (progress < 1) frameRef.current = requestAnimationFrame(step);
          else setValue(end);
        };

        frameRef.current = requestAnimationFrame(step);
      };

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !started) {
              started = true;
              timerRef.current = setTimeout(() => startAnimation(), startDelay);
            }
          });
        },
        { threshold: 0.3 }
      );

      obs.observe(node);

      return () => {
        obs.disconnect();
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, [end, duration]);

    return (
      <h2 ref={ref} className="text-white font-bold text-2xl">
        {value}
        {suffix}
      </h2>
    );
  }

  return (
    <div className="grid grid-cols-2 min-w-screen min-h-screen">
      <div className="flex flex-col pl-24 justify-center" id="about">
        <h1 className="text-white text-4xl font-bold" data-aos="fade-up">
          About Me
        </h1>
        <p className="text-white" data-aos="fade-up">I’m an Informatics Engineering student at Universitas Brawijaya with a several real world experience in Software Development.</p>
        <p className="text-white text-sm" data-aos="fade-up">Enjoying in learning new things, always open to new challenges. Vibe coding, but never blindly copying😁. Always ready to learn and collaborate!</p>
        <div className="flex gap-6 mt-4">
          <div className='flex flex-col gap-2' data-aos="fade-up">
            <Counter end={20} suffix="+" />
            <h1 className="text-white text-base">Projects</h1>
          </div>
          <div className='flex flex-col gap-2' data-aos="fade-up">
            <Counter end={10} suffix="+" />
            <h1 className="text-white text-base">Technology</h1>
          </div>
          <div className='flex flex-col gap-2' data-aos="fade-up">
            <Counter end={2} />
            <h1 className="text-white text-base">Internship Experience</h1>
          </div>
        </div>
        <div className="h-0.5 w-full bg-white my-6"></div>
        <h1 className="text-white font-bold text-xl mb-4" data-aos="fade-up">Education</h1>
        <div className="flex flex-col">
          <p className="text-white font-semibold text-xl" data-aos="fade-up">Universitas Brawijaya</p>
          <p className="text-white" data-aos="fade-up">Bachelor of Informatics Engineering</p>
          <p className="text-white text-sm" data-aos="fade-up">3.72 GPA</p>
          <p className="text-white text-sm" data-aos="fade-up">2023 - 2027</p>
        </div>
        {/* button download cv*/}
        <div className="mt-6" data-aos="fade-up">
          <a href="/cv.pdf" download className="inline-block bg-white text-black font-semibold px-4 py-2 rounded-md hover:opacity-90 transition">
            <div className="flex flex-row items-center gap-2">
              Download CV
              <FiDownload size={20}/>
            </div>
          </a>
        </div>
      </div>

      <div>

      </div>
    </div>
  )
}

/* <ul className='flex flex-row gap-0.5'>
          {logo.map((item, index) => (
            <li key={index} data-aos="fade-left" data-aos-delay={index * 200}>
              <a href={item.link}><img src={item.img} alt="icon" className="md:w-10 md:h-10 h-8 w-8 object-contain transition-transform duration-300 hover:scale-110" /></a>
            </li>
          ))}
        </ul> */