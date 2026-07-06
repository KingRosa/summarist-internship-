"use client" 


import { useAuth } from "@/app/context/AuthContext"
import Image from "next/image";
import "./HomeHero.css"; 

import LandingImage from "../../summarist-home-page/assets/landing.png";


export default function HomeHero(){
    const { openLogin } = useAuth(); 


    return(
        <section id="landing">
            <div className="container">
                <div className="row">
                    <div className="landing__wrapper">

                        {/* LEFT SECTION */} 

                        <div className="landing__content">
                            <h1 className="landing__content__title">
                                Gain more knowledge
                                <br /> 
                                in less time
                            </h1>


                            <p className="landing__content__subtitle">
                                Great summaries for busy, people
                                individuals who barely have time to read, 
                                and even people who don&apos;t have to read. 
                            </p>
                            
                            <button className="btn home__cta--btn" onClick={openLogin}
                            >
                                Login
                            </button>
                        </div>

                        {/* RIGHT SECTION */}

                        <figure className="landing__image">
                            <Image src={LandingImage} alt="Summarist Landing" priority /> 


                        </figure>
                    </div>
                </div>
            </div>
        </section>
    )
}





























