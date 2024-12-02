import React, { useMemo, useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { Footer } from "@/widgets/layout";
import Chart from "react-apexcharts";
import "apexcharts/dist/apexcharts.css";

export function Statistics() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [goalAchieved, setGoalAchieved] = useState(false);
  const [progress, setProgress] = useState(0);

  const targetTime = 5;

  const goodPostureData = {
    "11-10": 2.54,
    "11-11": 2.4,
    "11-12": 3.2,
    "11-13": 4.12,
    "11-14": 3.1,
    "11-15": 4.5,
    "11-16": 5.01,
    "11-17": 4.2,
    "11-18": 5.0002,
    "11-19": 3.53,
    "11-20": 4.333,
    "11-21": 5.31,
    "11-22": 4.128,
    "11-23": 6.11,
  };

  const badPostureData = {
    "11-10": 1.08,
    "11-11": 1.1,
    "11-12": 2.3,
    "11-13": 1.1,
    "11-14": 1.2,
    "11-15": 0.22,
    "11-16": 1.1,
    "11-17": 1.1117,
    "11-18": 2.11121,
    "11-19": 1.01,
    "11-20": 2.41,
    "11-21": 1.3,
    "11-22": 2.001,
    "11-23": 1.7,
  };

  const formatTime = (hours) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  useEffect(() => {
    const todayGoodPosture = goodPostureData[selectedDate.slice(5)] || 0;
    setGoalAchieved(todayGoodPosture >= targetTime);
    setProgress(Math.min((todayGoodPosture / targetTime) * 100, 100));
  }, [selectedDate]);

  const chartOptions = useMemo(
    () => ({
      chart: {
        type: "line", // 멀티라인 차트 설정
        zoom: { enabled: true },
        toolbar: { autoSelected: "zoom" },
      },
      xaxis: {
        categories: [
          "Nov 10", "Nov 11", "Nov 12", "Nov 13", "Nov 14", "Nov 15", "Nov 16",
          "Nov 17", "Nov 18", "Nov 19", "Nov 20", "Nov 21", "Nov 22", "Nov 23",
        ],
      },
      yaxis: {
        labels: {
          formatter: (val) => Math.round(val), // 소숫점 제거
        },
      },
      stroke: {
        curve: "smooth",
      },
      colors: ["#4CAF50", "#FF5722", "#2196F3"], // 좋은 자세, 나쁜 자세, 전체 시간 색상
      dataLabels: {
        enabled: false, // 데이터 라벨 비활성화
      },
      markers: {
        size: 0, // 기본 마커 크기 0으로 설정
        discrete: Object.entries(goodPostureData).map(([date, value], index) => {
          // 조건: seriesIndex가 0(Good Posture)인 경우에만 표시
          if (value >= targetTime) {
            return {
              seriesIndex: 0, // "Good Posture (hours)" 시리즈만
              dataPointIndex: index, // 해당 데이터 포인트에만 표시
              size: 10, // 별표 크기 설정
              fillColor: "#FFD700", // 별표 색상
              strokeColor: "#FFD700", // 테두리 색상
              shape: "star", // 별 모양으로 설정
            };
          }
          return null; // 목표치 미달성 시 마커를 생성하지 않음
        }).filter(Boolean), // null 제거
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (val) => formatTime(val),
        },
      },
      legend: {
        position: "top", // 범례 위치
        horizontalAlign: "center",
      },
    }),
    []
  );

  const chartSeries = useMemo(() => {
    const goodPostureArray = Object.values(goodPostureData);
    const badPostureArray = Object.values(badPostureData);
    const totalArray = goodPostureArray.map(
      (good, index) => good + badPostureArray[index]
    );

    return [
      { name: "Good Posture (hours)", data: goodPostureArray },
      { name: "Bad Posture (hours)", data: badPostureArray },
      { name: "Total Time (hours)", data: totalArray },
    ];
  }, []);

  return (
    <>
      <section className="relative block h-[50vh]">
        {/* 배경 이미지 */}
        <div className="absolute top-0 h-full w-full bg-[url('/img/background-marble.jpg')] bg-cover bg-center scale-105" />

        {/* 텍스트 콘텐츠 */}
        <div className="absolute top-0 h-full w-full flex flex-col items-center justify-center text-center pt-20">
          <Typography
            variant="h2"
            color="black"
            className="font-black mb-4"
          >
            Review Your Posture Trends
          </Typography>
          <Typography
            variant="lead"
            color="black"
            className="opacity-80 max-w-2xl mx-auto"
          >
            Discover how your posture has improved over time. Track daily progress,
            analyze trends, and achieve your posture goals with our detailed insights.
          </Typography>
        </div>
      </section>

      <section className="relative bg-white py-16">
        <div className="container mx-auto">
          <div className="mb-10">
            <Typography variant="h4" className="mb-4">
              Posture Trends
            </Typography>
            <Chart options={chartOptions} series={chartSeries} type="line" height={350} />
          </div>

          <div className="mb-10 flex items-center gap-4">
            <Typography variant="h6">Select Date:</Typography>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="p-2 border rounded"
            />
          </div>

          <div className="mb-10 text-center">
            <Typography variant="h6" className="mb-4">
              Daily Progress {goalAchieved && <span>🌟</span>}
            </Typography>
            <div className="flex justify-start h-4 bg-gray-200 rounded-full w-1/2 mx-auto">
              <div
                className="h-4 rounded-full bg-green-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <Typography variant="h6" className="mt-4">
              Progress: {progress.toFixed(0)}%
            </Typography>
          </div>


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <div>
              <Typography variant="h6">Good Posture Time</Typography>
              <Typography variant="h4" color="green">
                {formatTime(goodPostureData[selectedDate.slice(5)] || 0)}
              </Typography>
            </div>
            <div>
              <Typography variant="h6">Bad Posture Time</Typography>
              <Typography variant="h4" color="red">
                {formatTime(badPostureData[selectedDate.slice(5)] || 0)}
              </Typography>
            </div>
            <div>
              <Typography variant="h6">Target Time</Typography>
              <Typography variant="h4" color="blue">
                {formatTime(targetTime)}
              </Typography>
            </div>
            <div>
              <Typography variant="h6">Total Measurement Time</Typography>
              <Typography variant="h4" color="purple">
                {formatTime(
                  goodPostureData[selectedDate.slice(5)] || 0 +
                  badPostureData[selectedDate.slice(5)] || 0
                )}
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

export default Statistics;


