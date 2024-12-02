import React from "react";
import { Typography } from "@material-tailwind/react";
import { Footer } from "@/widgets/layout";
import {
    ArrowDownCircleIcon,
    DevicePhoneMobileIcon,
    BellAlertIcon,
    ComputerDesktopIcon,
} from "@heroicons/react/24/solid";

export function Usage() {
    const usageSteps = [
        {
          title: "Install the App",
          description:
            "Download the Tilt Care app from the App Store or Google Play to get started. The app provides essential features such as real-time posture monitoring, historical data analysis, and personalized feedback to help you maintain healthy posture habits. Ensure that your smartphone is compatible with the app for a seamless experience.",
          image: "/img/howto1.png",
          icon: <ArrowDownCircleIcon className="h-8 w-8 text-white" />, // 다운로드 아이콘
        },
        {
          title: "Attach to Vest",
          description:
            "Place your smartphone securely on the designated area of the posture vest. The vest is designed to hold your device in the optimal position for tracking both forward and side-to-side tilt. Proper attachment ensures that the sensors accurately measure your body’s posture and send reliable data to the app.",
          image: "/img/howto2.png",
          icon: <DevicePhoneMobileIcon className="h-8 w-8 text-white" />, // 스마트폰 아이콘
        },
        {
          title: "Track Posture Online",
          description:
            "Log in to the Tilt Care website using your registered credentials to view detailed insights into your posture trends. The platform provides graphical analyses of your daily, weekly, and monthly data, allowing you to identify patterns and focus on areas for improvement. Access personalized recommendations to maintain better posture over time.",
          image: "/img/howto3.png",
          icon: <ComputerDesktopIcon className="h-8 w-8 text-white" />, // 컴퓨터 아이콘
        },
        {
          title: "Get Real-time Alerts",
          description:
            "Stay aware of your posture with real-time alerts sent directly to your smartphone. The system detects poor posture and notifies you immediately, helping you make quick corrections. Customize the alert thresholds in the app to suit your specific needs and ensure continuous posture improvement throughout your day.",
          image: "/img/howto4.png",
          icon: <BellAlertIcon className="h-8 w-8 text-white" />, // 알림 벨 아이콘
        },
      ];
      

    return (
        <>
            {/* 상단 섹션 */}
            <section className="relative block h-[50vh]">
                <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-marble.jpg')] bg-cover bg-center scale-105" />
                <div className="absolute top-0 h-full w-full flex flex-col items-center justify-center text-center pt-20">
                    <Typography variant="h1" color="black" className="font-black mb-4">
                        How to Use Tilt Care
                    </Typography>
                    <Typography
                        variant="lead"
                        color="black"
                        className="opacity-80 max-w-2xl mx-auto text-base"
                    >
                        Follow these simple steps to set up and use Tilt Care for optimal posture tracking.
                    </Typography>
                </div>
            </section>

            {/* 사용법 섹션 */}
            <section className="bg-white px-4 py-20">
                <div className="container mx-auto space-y-16">
                    {usageSteps.map(({ title, description, image, icon }, index) => (
                        <div
                            key={index}
                            className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-8"
                        >
                            {/* 텍스트 설명 */}
                            <div className="w-full md:w-6/12">
                                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-500 p-2 text-center shadow-lg">
                                    {icon}
                                </div>
                                <Typography variant="h3" className="mb-3 font-bold" color="blue-gray">
                                    {title}
                                </Typography>
                                <Typography className="mb-4 font-normal text-blue-gray-500">
                                    {description}
                                </Typography>
                            </div>

                            {/* 이미지 */}
                            <div className="w-full md:w-3/12">
                                <img
                                    alt={title}
                                    src={image}
                                    className="h-full w-full object-cover rounded-lg shadow-lg"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="bg-white">
                <Footer />
            </div>
        </>
    );
}

export default Usage;
