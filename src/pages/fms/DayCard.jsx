import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios'
import img1 from './1.png'
import img2 from './2.png'
import img3 from './3.png'

const Card = (data) => {
  console.log(data.data)
  const [img, setImage] = useState('')
  const [weather, setWeather] = useState({})
  const [error, setError] = useState('')
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (data?.data?.latitude && data?.data?.longitude) {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather`,
            {
              params: {
                lat: data.data.latitude,
                lon: data.data.longitude,
                appid: "10f63079af260fb543d5900d2517bb4d",
                units: "metric",
              },
            }
          );
          setWeather(response.data); 
          

          if (weather.weather[0].main === 'Clouds') {
            setImage(img1)
          } else if (weather.weather[0].main === 'Clear') {
            setImage(img3)
          } else {
            setImage(img2)
          }
          
          
        }
      } catch (err) {
        setError(err.message);
      }
    };
    
    fetchWeather();


    // if (data.data.latitude === 20.5301) {
    //   weather.weather[0].main ="Rainy"
    // }
  }, [data.data]);
 

  
  return (
    <StyledWrapper className={`mx-24 ${data.data.latitude === 20.5301 ? "text-white" : ""
      }`}>
      
      <div
        className={`card`}
      >
        <section className="landscape-section">
          <div className="sky" />
          <div className="sun" />
          <div className="hill-1" />
          <div className="hill-2" />
          <div className="ocean">
            <div className="reflection" />
            <div className="reflection" />
            <div className="reflection" />
            <div className="reflection" />
            <div className="reflection" />
            <div className="shadow-hill-1" />
            <div className="shadow-hill-2" />
          </div>
          <div className="hill-3" />
          <div className="hill-4" />
          <div className="tree-1">
            <svg
              strokeWidth="0.00064"
              stroke="#b77873"
              fill="#b77873"
              xmlSpace="preserve"
              viewBox="0 0 64.00 64.00"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              version={1.0}
            >
              <g strokeWidth={0} id="SVGRepo_bgCarrier" />
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                id="SVGRepo_tracerCarrier"
              />
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M32,0C18.148,0,12,23.188,12,32c0,9.656,6.883,17.734,16,19.594V60c0,2.211,1.789,4,4,4s4-1.789,4-4v-8.406 C45.117,49.734,52,41.656,52,32C52,22.891,46.051,0,32,0z"
                  fill="#b77873"
                />
              </g>
            </svg>
          </div>
          <div className="tree-2">
            <svg
              strokeWidth="0.00064"
              stroke="#b77873"
              fill="#b77873"
              xmlSpace="preserve"
              viewBox="0 0 64.00 64.00"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              version={1.0}
            >
              <g strokeWidth={0} id="SVGRepo_bgCarrier" />
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                id="SVGRepo_tracerCarrier"
              />
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M32,0C18.148,0,12,23.188,12,32c0,9.656,6.883,17.734,16,19.594V60c0,2.211,1.789,4,4,4s4-1.789,4-4v-8.406 C45.117,49.734,52,41.656,52,32C52,22.891,46.051,0,32,0z"
                  fill="#b77873"
                />
              </g>
            </svg>
          </div>
          <div className="tree-3">
            <svg
              version={1.0}
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 64.00 64.00"
              xmlSpace="preserve"
              fill="#a16773"
              stroke="#a16773"
              strokeWidth="0.00064"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path
                  fill="#a16773"
                  d="M32,0C18.148,0,12,23.188,12,32c0,9.656,6.883,17.734,16,19.594V60c0,2.211,1.789,4,4,4s4-1.789,4-4v-8.406 C45.117,49.734,52,41.656,52,32C52,22.891,46.051,0,32,0z"
                />
              </g>
            </svg>
          </div>
          <div className="filter " />
        </section>
        <section className="content-section ">
          <div className="weather-info">
            <div className="left-side">
              <div className="icon">
                <img src={img}></img>
              </div>
              {weather.weather && ((data.data.latitude !== 20.5301 )?(<p>{weather.weather[0].main}</p>):(<p>Rainy</p>))}
            </div>
            <div className="right-side">
              <div className="location ">
                <div>
                  {data.data.latitude !== 20.5301 && (
                    <svg
                      version={1.0}
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="64px"
                      height="64px"
                      viewBox="0 0 64 64"
                      xmlSpace="preserve"
                      fill="#ffffff"
                      stroke="#ffffff"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}

                  <span>{data.data.telemetry_uid}</span>
                </div>
              </div>
              <p>Monday, 4th May</p>
              <p className="temperature"></p>
              <p>{data.data.water_level} </p>
            </div>
          </div>
          <div
            className={`forecast ${
              data.data.latitude === 20.5301 ? "bg-red-500 text-white text-semibold" : ""
            }`}
          >
            <div>
              <p>Latitude</p>
              <p>{data.data.latitude}</p>
            </div>
            <div className="separator" />
            <div>
              <p>longitude</p>
              <p>{data.data.longitude}</p>
            </div>
            <div className="separator" />
            <div>
              <p>Location</p>
              <p>{data.data.state}</p>
            </div>
            {data.data.latitude === 20.5301 && (
              <p className="text-white text-sm font-bold ">
                OVERFLOW POSSIBLE
              </p>
            )}
          </div>
        </section>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 220px;
    height: 350px;
    border-radius: 20px;
    overflow: hidden;
   
    background-color: white;
  }

  /* Landscape section */
  .landscape-section {
    position: relative;
    width: 100%;
    height: 70%;
    overflow: hidden;
  }

  .landscape-section * {
    position: absolute;
  }

  .sky {
    width: 100%;
    height: 100%;
    background: rgb(247, 225, 87);
    background: linear-gradient(
      0deg,
      rgba(247, 225, 87, 1) 0%,
      rgba(233, 101, 148, 1) 100%
    );
  }

  .sun {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: white;
    bottom: 40%;
    left: 23%;
    filter: drop-shadow(0px 0px 10px white);
  }

  .sun::after {
    position: absolute;
    content: "";
    width: 118%;
    height: 118%;
    border-radius: 50%;
    background-color: white;
    opacity: 0.5;
  }

  .sun::before {
    position: absolute;
    content: "";
    width: 134%;
    height: 134%;
    border-radius: 50%;
    background-color: white;
    opacity: 0.1;
  }

  .ocean {
    overflow: hidden;
    bottom: 0;
    width: 100%;
    height: 28%;
    background: rgb(241, 192, 125);
    background: linear-gradient(
      0deg,
      rgba(241, 192, 125, 1) 0%,
      rgba(247, 218, 150, 1) 100%
    );
  }

  .reflection {
    position: absolute;
    background-color: white;
    opacity: 0.5;
    z-index: 1;
  }

  .reflection:nth-child(1) {
    width: 40px;
    height: 10px;
    clip-path: polygon(0% 0%, 100% 0%, 50% 20%);
    top: 5%;
    left: 32%;
  }

  .reflection:nth-child(2) {
    width: 80px;
    height: 15px;
    clip-path: polygon(0% 0%, 100% 0%, 60% 20%, 40% 20%);
    top: 15%;
    left: 39%;
  }

  .reflection:nth-child(3) {
    width: 60px;
    height: 2px;
    clip-path: polygon(0% 50%, 40% 0%, 60% 0%, 100% 50%, 60% 100%, 40% 100%);
    top: 27%;
    right: 15%;
  }

  .reflection:nth-child(4) {
    width: 70px;
    height: 2px;
    clip-path: polygon(0% 50%, 40% 0%, 60% 0%, 100% 50%, 60% 100%, 40% 100%);
    top: 37%;
    right: 28%;
  }
  .reflection:nth-child(5) {
    width: 70px;
    height: 3px;
    clip-path: polygon(0% 50%, 40% 0%, 60% 0%, 100% 50%, 60% 100%, 40% 100%);
    top: 46%;
    right: 8%;
  }

  .hill-1 {
    right: -25%;
    bottom: 20%;
    width: 150px;
    height: 40px;
    border-radius: 50%;
    background-color: #e6b29d;
  }

  .shadow-hill-1 {
   adow-hill-2 {
    right: -36%;
    top: -65%;
    width: 150px;
    height: 80px;
    border-radius: 50%;
    background-color: #e5bb96;
    opacity: 1;
  }

  .hill-3 {
    left: -100%;
    bottom: -28%;
    width: 350px;
    height: 150px;
    border-radius: 50%;
    background-color: #b77873;
    z-index: 3;
  }
 right: -25%;
    top: -30%;
    width: 150px;
    height: 40px;
    border-radius: 50%;
    background-color: #f1c7a0;
    opacity: 1;
  }

  .hill-2 {
    right: -36%;
    bottom: 10%;
    width: 150px;
    height: 80px;
    border-radius: 50%;
    background-color: #c29182;
  }

  .sh
  .tree-1 {
    bottom: 20%;
    left: 3%;
    width: 50px;
    height: 70px;
    z-index: 3;
  }

  .tree-2 {
    bottom: 14%;
    left: 25%;
    width: 50px;
    height: 70px;
    z-index: 3;
  }

  .hill-4 {
    right: -100%;
    bottom: -40%;
    width: 350px;
    height: 150px;
    border-radius: 50%;
    background-color: #a16773;
    z-index: 3;
  }

  .tree-3 {
    bottom: 10%;
    right: 1%;
    width: 65px;
    height: 80px;
    z-index: 3;
  }

  .filter {
    height: 100%;
    width: 100%;
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 40%
    );
    z-index: 5;
    opacity: 0.2;
  }

  /* Content section */
  .content-section {
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .weather-info {
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    text-align: center;
    top: 0;
    right: 0%;
    width: 100%;
    padding-top: 15px;
    color: white;
    z-index: 10;
  }

  .weather-info .left-side:not(.icon) {
    width: 20%;
    font-size: 11pt;
    font-weight: 600;
    align-self: baseline;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon svg {
    width: 40px;
  }

  .weather-info .right-side {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .weather-info .right-side p:nth-child(2) {
    font-size: 9pt;
    margin: 0;
    padding: 0;
  }

  .weather-info .location span {
    font-size: 11pt;
    font-weight: 700;
    text-transform: uppercase;
  }

  .location {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    padding: 0;
    margin: 0;
  }

  .location svg {
    width: 14px;
    height: auto;
  }

  .temperature {
    font-size: 20pt;
    font-weight: 700;
    line-height: 30px;
  }

  .forecast {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 100%;
    width: 100%;
    padding: 10px 25px;
  }

  .forecast > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 9pt;
  }

  .separator {
    width: 100%;
    height: 2px;
    background-color: rgb(233, 233, 233);
    border-radius: 1px;
  }
`;

export default Card;
