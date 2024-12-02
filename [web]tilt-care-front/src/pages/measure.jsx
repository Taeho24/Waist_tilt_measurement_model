import React, { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { Footer } from "@/widgets/layout";

export function Measure() {
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [angleLimit, setAngleLimit] = useState(10); // 각도 설정 (기본값 10도)
  const [hours, setHours] = useState(0); // 선택된 시간
  const [minutes, setMinutes] = useState(0); // 선택된 분
  const [currentAngle, setCurrentAngle] = useState(0); // 현재 기울기 값 (시뮬레이션)

  // 측정 시작/중지
  const toggleMeasure = () => {
    setIsMeasuring((prev) => !prev);
  };

  // 현재 기울기 상태 (Excellent/Bad)
  const getPostureStatus = () => {
    if (currentAngle <= angleLimit) return "Excellent";
    return "Bad";
  };

  // 드롭다운 옵션 생성 함수
  const generateOptions = (max) => {
    return Array.from({ length: max + 1 }, (_, i) => (
      <option key={i} value={i}>
        {i}
      </option>
    ));
  };

  return (
    <>
      {/* 상단 섹션 */}
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-marble.jpg')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full flex flex-col items-center justify-center text-center pt-20">
          <Typography variant="h1" color="black" className="font-black mb-4">
            Measure Your Posture
          </Typography>
          <Typography
            variant="lead"
            color="black"
            className="opacity-80 max-w-2xl mx-auto text-base"
          >
            Start tracking your posture now <br />
            Set your angle limit, target time, and monitor your current posture status in real-time
          </Typography>
        </div>
      </section>

      {/* 기능 섹션 */}
      <section className="relative bg-white py-16">
        <div className="container mx-auto">
          {/* 측정 On/Off */}
          <div className="mb-10 text-center">
            <Typography variant="h5" className="mb-4 font-bold">
              Posture Measurement
            </Typography>
            <Button
              onClick={toggleMeasure}
              variant="gradient"
              color={isMeasuring ? "red" : "green"}
              className="px-6 py-3"
            >
              {isMeasuring ? "Stop Measurement" : "Start Measurement"}
            </Button>
            <Typography variant="h6" className="mt-4">
              {isMeasuring
                ? "Measurement is in progress..."
                : "Click the button to start measuring your posture."}
            </Typography>
          </div>

          {/* 측정 각도 설정 */}
          <div className="mb-10 text-center">
            <Typography variant="h5" className="mb-4 font-bold">
              Set Angle Limit
            </Typography>
            <div className="flex flex-col items-center justify-center">
              <input
                type="range"
                min="5"
                max="30"
                value={angleLimit}
                onChange={(e) => setAngleLimit(Number(e.target.value))}
                className="w-full max-w-xl"
              />
              <Typography className="mt-2">
                Current Angle Limit: <strong>{angleLimit}°</strong>
              </Typography>
            </div>
          </div>


          {/* 목표 시간 설정 */}
          <div className="mb-10 text-center">
            <Typography variant="h5" className="mb-4 font-bold">
              Set Target Time
            </Typography>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex gap-4">
                <div>
                  <label htmlFor="hours" className="block font-bold mb-2">
                    Hours
                  </label>
                  <select
                    id="hours"
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="p-2 border rounded"
                  >
                    {generateOptions(23)}
                  </select>
                </div>
                <div>
                  <label htmlFor="minutes" className="block font-bold mb-2">
                    Minutes
                  </label>
                  <select
                    id="minutes"
                    value={minutes}
                    onChange={(e) => setMinutes(Number(e.target.value))}
                    className="p-2 border rounded"
                  >
                    {generateOptions(59)}
                  </select>
                </div>
              </div>
              <Typography className="mt-4">
                Target Time:{" "}
                <strong>
                  {hours} hours {minutes} minutes
                </strong>
              </Typography>
            </div>
          </div>

          {/* 현재 기울기 보여주기 */}
          <div className="mb-10 text-center">
            <Typography variant="h5" className="mb-4 font-bold">
              Current Posture Status
            </Typography>
            <div className="flex items-center justify-center gap-6">
              <Typography
                variant="h4"
                className={`font-bold ${getPostureStatus() === "Excellent"
                  ? "text-green-500"
                  : "text-red-500"
                  }`}
              >
                {getPostureStatus()}
              </Typography>
              <Typography variant="h6">
                Current Angle: <strong>12°</strong>
              </Typography>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Measure;
