import './About.css'
import BlurText from './blocks/Components/BlurText'

export default function About(){
    return (
    <div className="about-section" id="about">
        <BlurText
        text="Muhammad Zhafir Aufar"
        delay={0.2}
        animateBy="words"
        direction="top"
        className="custom-blur-text name"
      />
      <BlurText
        text="I am an Informatics Engineering student with a strong passion for Software Engineering. I enjoy designing and developing software."
        delay={0.2}
        animateBy="words"
        direction="top"
        className="custom-blur-text descriptive"
      />
    </div>
    ) 
}