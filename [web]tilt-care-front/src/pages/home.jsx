import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";
import { FingerPrintIcon, UsersIcon, StarIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";

export function Home() {
  // 캐러셀 이미지를 배열로 정의
  const images = [
    "/img/background-doctor.jpeg",
    "/img/background-staff.png",
    "/img/background-somewhat.jpg",
  ];

  // 현재 보여지는 이미지의 인덱스를 관리하는 상태
  const [current, setCurrent] = useState(0);

  // 자동 슬라이드 설정
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // 5초마다 슬라이드 변경
    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 정리
  }, [images.length]);

  // 다음 이미지로 이동하는 함수
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  // 이전 이미지로 이동하는 함수
  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* 캐러셀 섹션 */}
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        {/* 현재 이미지 상태에 따라 배경 이미지를 변경 */}
        <div
          className="absolute top-0 h-full w-full bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url(${images[current]})` }}
        />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="black"
                className="mb-6 font-black"
              >
                Keep your posture in check
              </Typography>
              <Typography variant="lead" color="black" className="opacity-80">
                Track your posture effortlessly with smart technology. Get
                instant alerts to correct your alignment and access detailed
                trends over time. Stay proactive about your health, starting
                now
              </Typography>
              <Button
                variant="gradient"
                color="purple"
                className="mt-4"
              >
                Track Now
              </Button>
            </div>
          </div>
        </div>

        {/* 왼쪽 화살표 버튼 */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
          <button
            onClick={prevSlide}
            className="bg-white/60 hover:bg-white p-2 rounded-full"
          >
            &lt;
          </button>
        </div>

        {/* 오른쪽 화살표 버튼 */}
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
          <button
            onClick={nextSlide}
            className="bg-white/60 hover:bg-white p-2 rounded-full"
          >
            &gt;
          </button>
        </div>

        {/* 하단 점 네비게이션 */}
        <div className="absolute bottom-8 flex w-full justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-3 w-3 rounded-full ${current === index ? "bg-purple-500" : "bg-white/60"
                }`}
            />
          ))}
        </div>
      </div>

      {/* 기능 섹션 */}
      <section className="-mt-32 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-5 h-5 text-white",
                })}
                description={description}
              />
            ))}
          </div>
          <div className="mt-32 flex flex-wrap items-center">
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-500 p-2 text-center shadow-lg">
                <UsersIcon className="h-8 w-8 text-white " />
              </div>
              <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="blue-gray"
              >
                Trusted by Thousands of Users
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500">
                I've tried many posture devices before, but this one stands out. It doesn't just track forward or backward tilt—it also monitors side-to-side angles, helping to prevent scoliosis. The real-time alerts gently remind me to fix my posture instantly.
                <br />
                <br />
                This system seamlessly fits into my routine. Its clear insights and trend tracking keep me motivated to improve. It's not just about posture—it's about feeling healthier and more confident every day.
              </Typography>
              {/* 별점 섹션 */}
              <div className="flex items-center mt-4">
                {[...Array(5)].map((_, index) => (
                  <StarIcon key={index} className="h-6 w-6 text-yellow-500" />
                ))}
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="ml-2 font-medium"
                >
                  5.0 / 5.0
                </Typography>
              </div>
            </div>
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
              <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
                <CardHeader floated={false} className="relative h-56">
                  <img
                    alt="Card Image"
                    src="/img/home-review.png"
                    className="h-full w-full object-cover"
                  />
                </CardHeader>
                <CardBody>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    Tilt Care
                  </Typography>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 mt-2 font-bold"
                  >
                    Advanced Posture Monitoring
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                  Real-time posture tracking and personalized insights to support your spinal health every day.
                  </Typography>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer 섹션 */}
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Home;
