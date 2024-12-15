import React ,{useState,useEffect} from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import c1 from '../../assets/images/home/c1.jpeg'
import c2 from '../../assets/images/home/c2.jpeg'
import c3 from '../../assets/images/home/c3.jpg'
import bank from '../../assets/images/home/bank.jpg'
import tax from '../../assets/images/home/tax.jpeg'
import tele from '../../assets/images/home/tele.jpeg'
import urban from '../../assets/images/home/urban.jpeg'
import personal from '../../assets/images/home/personal.jpg'
import lodge from '../../assets/images/home/lodge.png'
import status from '../../assets/images/home/status.png'
import redres from '../../assets/images/home/redres.png'
import asses from '../../assets/images/home/asses.png'
import labour from '../../assets/images/home/labour.jpg'
import grievlogo from '../../assets/images/home/grievlogo.png'
import logo from '../../assets/images/logo.png'



const items = [
    {
      id: 1,
      icon: lodge,
      heading: "Guidance Chatbot",
      text: "Integrating an AI-powered chatbot for real-time support, guiding users through tasks, answering questions to enhance engagement.",
    },
    {
      id: 2,
      icon: status,
      heading: "Multilingual Support",
      text: "Offers a multilingual interface and voice search to accommodate diverse users, enhancing accessibility and usability.",
    },
    {
      id: 3,
      icon: asses,
      heading: "Custom Alerts",
      text: "Allow users to set up custom alerts for specific conditions, enabling personalized monitoring tailored to individual needs.",
    },
    {
      id: 4,
      icon: redres,
      heading: "Enhanced Data Visualization",
      text: "Utilize advanced visualization techniques to display trends and geographical distribution of DWLRs for improved decision-making.",
    },
  ];  

const NewsCard = ({ text,date}) => (
    <div className="w-[320px] px-4 py-6 bg-white rounded-md news_card_shadow">
      <p className="text-[#5B6469] font-bold text-[15px]">{text} </p>
      <div className="pt-7 text-[13px] flex items-center gap-2">
        <div>
          <h1 className="font-medium">{date}</h1>
        </div>
      </div>
    </div>
);
const cards = [
    {
      id: 1,
      date: "14.05.24",
      dept:"Real Time Data Monitoring",
      topic: "Ensure continuous data flow from over 14,000 DWLRs, enabling real-time updates on water levels and battery status.",
      image: bank,
    },
    {
      id: 2,
      date: "14.05.24",
      dept:"AI Powered Anomaly Detection",
      topic:
        "Identify unusual patterns, such as sudden fluctuations or data inconsistencies ensuring timely intervention, improves system efficiency.",
      image: labour,
    },
    {
      id: 3,
      date: "14.05.24",
      dept:"Real Time Centralized Dashboard",
      topic:
        "A real-time dashboard where key metrics, such as the number of active DWLRs and flagged anomalies, are displayed.",
      image: tax,
    },
    {
      id: 4,
      date: "14.05.24",
      dept:"Automated Alerts / Notifications",
      topic: "Send instant notifications to stakeholders when anomalies or battery issues are detected.",
      image: tele,
    },
    {
      id: 5,
      date: "14.05.24",
      dept:"Role Based Access",
      topic: "Ensure data security through JWT and Spring Security to manage specific roles by restricting sensitive information to authorized personnel.",
      image: urban,
    },
    {
      id: 6,
      date: "14.05.24",
      dept:"Reliable Data Processing",
      topic: "Handle large datasets in real time which guarantees the availability of reliable and actionable data for analysis.",
      image: personal,
    }
];
export default function Home() {
    const[selectedLanguage,setSelectedLanguage]=useState('en');
    const navigate = useNavigate();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };
    const images = [
        c1, c2, c3
    ];
    
    return (
        <>
        <nav className="py-2 z-10" style={{marginLeft:'4.1%',marginRight:'4.1%',backgroundImage:'url("https://tse2.mm.bing.net/th?id=OIP.J2xR076jlOX-7CmZJSeCVQHaEo&pid=Api&P=0&w=300&h=300")',backgroundSize:'cover'}}>
        <div className="md:w-11/12 w-full md:px-0 px-3 mx-auto ">     
            <div className="flex items-center justify-between h-16">
                    <img src={logo} style={{width:'3%', marginRight:'8%'}}></img>
            <div className="flex gap-4 items-center" style={{marginLeft:'-10%'}}>
                <p style={{fontSize:'25px', marginLeft:'-40%'}}><b>BlueEye</b></p>
                <div style={{marginLeft:'12%'}}className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                    <Link
                    to="/" style={{fontSize:'16.5px'}}
                    className=" hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                    Home
                    </Link>
                    <a
                    href="#about" style={{fontSize:'16.5px'}}
                    className="hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                    About
                    </a>
                    <a
                    href="#departments" style={{fontSize:'16.5px'}}
                    className="hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                    Key Features
                    </a>
                    <a
                    href="#start" style={{fontSize:'16.5px'}}
                    className="hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                    New
                    </a>
                    <a
                    href="#contact" style={{fontSize:'16.5px'}}
                    className="hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                    Contact
                    </a>
                </div>
                </div>
            </div>

            {/* <Link to="/deptlogin" style={{marginLeft:'21%'}}>
                <div className="hidden md:block hover:bg-button-primary px-4 py-1 rounded-xl">
                <b>DepartmentLogin</b>
                </div>
            </Link> */}
            <Link to="/login">
                <div className="hidden md:block hover:bg-button-primary px-4 py-1 rounded-xl">
                <b>Login</b>
                </div>
            </Link>
            </div>
            </div>
        </nav>
        {/* <div id="google_translate_element" style={{marginLeft:'50%',marginBottom:'-2%',marginTop:'1%'}}></div> */}
        <section className="z-10" >
            <div className="sm:w-11/12 mx-auto mt-6">
                <Slider {...settings}>
                {images.map((image, index) => (
                <div key={index}>
                    <img style={{width:'100%'}}src={image} alt={`Slide ${index+ 1}`} />
                </div>
                ))}
            </Slider>
            </div>
        </section>

        <section className="my-14">
            <div className="md:w-11/12 w-full md:px-0 px-3 mx-auto" id="about">
                <div className="pt-14 pl-10 pb-4 h-[50%] overflow-auto bg-[#F7F7F7] flex items-center lg:flex-nowrap flex-wrap gap-1">
                <div className="lg:w-1/2 w-full lg:pb-0 pb-4 flex flex-col lg:items-start items-center lg:ml-14">
                <p style={{fontSize:'25px'}}><b>ABOUT CGWB </b></p><br></br>
                    <p className="text-[#5B6469]">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To Develop and disseminate technologies, and monitor and implement national policies for the Scientific and Sustainable development and management of India's Ground Water Resources, including their exploration, assessment, conservation, augmentation, protection from pollution and distribution, based on principles of economic and ecological efficiency and equity.
                    <br></br><br></br>
                    <b>VISION:</b>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br></br>Sustainable development and management of Ground Water resources of the Country.</p>
                    <br></br>
                    <ul class="mt-2 list-style-none pb-0">
                        <span class="font-bold text-info"><i class="fa fa-info-circle"></i>&nbsp;Activities :</span><br></br><br></br>
                        <li className="ml-3"><i class="fa fa-caret-right"></i> &nbsp;Aquifier Mapping</li>
                        <li className="ml-3"><i class="fa fa-caret-right"></i> &nbsp;Aquifier Rejuvenation</li>
                        <li className="ml-3"><i class="fa fa-caret-right"></i> &nbsp;Exploratory Drilling</li>
                        <li className="ml-3"><i class="fa fa-caret-right"></i> &nbsp;Geophysical Exploration</li>
                        <li className="ml-3"><i class="fa fa-caret-right"></i> &nbsp;Ground Water Quality</li>
                        <li className="ml-3"><i class="fa fa-caret-right"></i> &nbsp;Ground Water Resource Assessment</li>
                        <li className="ml-3"><i class="fa fa-caret-right"></i> &nbsp;PMKSY-HKKP-Ground Water</li>
                        <li className="ml-3"><i class="fa fa-caret-right"></i> &nbsp;Ground Water Regulation</li>
                        <li className="ml-3"><i class="fa fa-caret-right"></i> &nbsp;Ground Water Level Monitoring</li>
                        <li className="ml-3"><i class="fa fa-caret-right"></i> &nbsp;Ground Water Modeling</li>
                        <li className="ml-3"><i class="fa fa-caret-right"></i> &nbsp;Technical Assistance</li>
                        <li className="ml-3"><i class="fa fa-caret-right"></i> &nbsp;Training and Capacity Building</li>
                        <li className="ml-3"><i class="fa fa-caret-right"></i> &nbsp;Research and Innovation</li>
                        <li className="ml-3"><i class="fa fa-caret-right"></i> &nbsp;Technical Collaborations</li>
                        <li className="ml-3"><i class="fa fa-caret-right"></i> &nbsp;Outreach Activites</li>
                        <li className="ml-3"><i class="fa fa-caret-right"></i> &nbsp;Atal Bhujal Yojana</li>
                    </ul>
                    <br></br>
                </div>
                <div className="gap-2 sm:flex-nowrap flex-wrap lg:w-1/2 mx-auto">
                    <div >
                    <p style={{fontSize:'20px',marginLeft:'38%',marginBottom:'3%'}}><b>WHAT'S NEW</b></p>
                    </div>
                    <div className="rounded-md w-full flex flex-col gap-3 items-center">
                    <NewsCard text="Strengthening of Machinery for Redressal of Public Grievance (CPGRAMS)." 
                    date="27 JULY 2022"/>
                    <NewsCard text="Reduction of stipulated time limit for disposal of Public Grievance in CPGRAMS." 
                    date="22 JUNE 2021"/>
                    <NewsCard text="Tracking of grievance registered in CPGRAMS." 
                    date="22 SEPTEMPER 2020"/>
                    <NewsCard text=" Handling of Public Grievances received in CPGRAMS on COVID-19 in States." 
                    date="31 MARCH 2020"/>
                    <NewsCard text="Handling Public Grievances pertaining to COVID-19 in Ministries /Departments of GoI." 
                    date="30 MAR 2020"/>
                    </div>
                </div>
                </div>
            </div>
        </section>
        
        <div className="md:w-11/12 w-full md:px-0 px-3 mx-auto">
        <div className="flex items-center sm:justify-between justify-center flex-wrap my-8" id="departments">
            <p style={{fontSize:'30px'}}><b>Key Features</b></p>
            <article className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center lg:gap-14 gap-4" style={{marginTop:'2%'}}>
                {cards.map((card) => (
                <div className="h-[340px] w-[32 0px]" key={card.id} style={{marginTop:'7%'}}>
                    <div className="relative rounded-xl overflow-hidden " >
                    <img style={{width:'450px', height:'225px' }} src={card.image} alt="fund1" />
                </div>
                <div className="hover:text-[#6D9886] transition-colors cursor-pointer" style={{fontSize:'18px', marginTop:'5%', color:'#d48026',textAlign:'center'}}>
                    <b>{card.dept}</b>
                </div>
                <div className="flex items-center gap-4 my-4 px-2">
                </div>
                    <p className="text-[17px] px-2 hover:text-[#6D9886] transition-colors cursor-pointer">
                    {card.topic}
                    </p>
                </div>
                ))}
            </article>
        </div>
      </div>
      <section className="my-14" id="start">
        <div className="md:w-11/12 w-full md:px-0 px-3 mx-auto">
            <div className="bg-quiz-bg h-auto sm:bg-cover bg-center bg-no-repeat bg-[#6D9886] rounded-xl relative">
            <article className="py-24 md:px-14 px-4 md:w-9/12 md:mx-0 mx-auto md:text-left text-center leading-none">
                <h1 className="font-bold md:text-[30px] text-[40px] text-white pb-8">
                Empower sustainability by monitoring observations.<br></br><br></br>Kickstart the journey towards effective water conservation by reporting rainwater data from sensors today.
                </h1>
                <button style={{borderRadius:'12px'}} className="capitalize bg-button-primary hover:bg-button-primary-hover transition-colors px-14 py-3 rounded-sm font-bold text-[#6C6252]" onClick={()=>{navigate("/signup")}}>
                Get Started
                </button>
            </article>
            </div>
        </div>
        </section>

        <section className="my-14">
            <div className="md:w-11/12 w-full md:px-0 px-3 mx-auto">
                <p style={{fontSize:'30px'}}><b>Process Flow</b></p>
                <div className="bg-[#D9CAB3] bg-opacity-30 px-8 py-14 rounded-md mt-8">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 place-items-center lg:gap-14 gap-8">
                    {items.map((item) => (
                    <div
                        className="text-center flex flex-col items-center justify-center"
                        key={item.id}
                    >
                        <img style={{width:'450px',height:'225px'}} src={item.icon} alt="icon" className="pb-4 w-24" />
                        <h1 className="font-bold text-lg py-4">{item.heading}</h1>
                        <p>{item.text}</p>
                    </div>
                    ))}
                </div>
                </div>
            </div>
        </section>

        <footer className="bg-[#212121] py-14 text-white" id="contact">
            <div className="md:w-11/12 w-full md:px-0 px-3 mx-auto">
                <div className="grid place-items-center sm:text-left text-center lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                <div className="sm:mt-0 mt-14">
                    <h1 className="font-bold capitalize sm:pt-0 pt-8 pb-4">company</h1>
                    <ul>
                    <li>
                        <a href="#">About Us</a>
                    </li>
                    <li>
                        <a href="#">Contact Us</a>
                    </li>
                    <li>
                        <a href="#">Knowledge Base</a>
                    </li>
                    <li>
                        <a href="#">Tutorials</a>
                    </li>
                    <li>
                        <a href="#">Terms and Conditions</a>
                    </li>
                    <li>
                        <a href="#">Cookie Policy</a>
                    </li>
                    <li>
                        <a href="#">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#">Careers</a>
                    </li>
                    </ul>
                </div>
                <div>
                    <h1 className="font-bold capitalize sm:pt-0 pt-8 pb-4">browser</h1>
                    <ul>
                    <li>
                        <a href="#">Memberships</a>
                    </li>
                    <li>
                        <a href="#">CJobs</a>
                    </li>
                    <li>
                        <a href="#">Experts</a>
                    </li>
                    <li>
                        <a href="#">Organizations</a>
                    </li>
                    <li>
                        <a href="#">Funding</a>
                    </li>
                    <li>
                        <a href="#">CAwards</a>
                    </li>
                    <li>
                        <a href="#">Donors</a>
                    </li>
                    <li>
                        <a href="#">News</a>
                    </li>
                    </ul>
                </div>
                <div>
                    <h1 className="font-bold capitalize sm:pt-0 pt-8 pb-4">connect</h1>
                    <ul>
                    <li>
                        <a href="#">Twitter</a>
                    </li>
                    <li>
                        <a href="#">Facebook</a>
                    </li>
                    <li>
                        <a href="#">Linkedin</a>
                    </li>
                    <li>
                        <a href="#">Youtube</a>
                    </li>
                    <li>
                        <a href="#">RSS</a>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
        </footer>

        </>
    )
}
