import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ClaimButton } from "./ClaimButton";
import { showErrorAlert } from "@/utils/notifications";
import { whitelistDB } from "@/utils/supabase";

interface CountdownButtonProps {
  targetDate: Date;
  address: string;
  claimCondition: any;
}

export function CountdownButton({ targetDate, address, claimCondition }: CountdownButtonProps) {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isEnded, setIsEnded] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    // 检查白名单状态
    const checkWhitelistStatus = async () => {
      try {
        const status = await whitelistDB.getStatus(address);
        console.log("Whitelist status for countdown:", status); // 调试日志
        setIsApproved(status?.status === 'approved');
      } catch (error) {
        console.error("Error checking whitelist status:", error);
      }
    };

    checkWhitelistStatus();
  }, [address]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
        setIsEnded(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsEnded(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // 如果不在白名单中，显示未批准状态
  if (!isApproved) {
    return (
      <button
        onClick={() => showErrorAlert(t("You are not approved for claiming"))}
        className="bg-gray-600 text-white px-6 py-2 rounded-lg cursor-not-allowed"
      >
        {t("Not Approved")}
      </button>
    );
  }

  // 如果倒计时结束，显示认领按钮
  if (isEnded) {
    return <ClaimButton address={address} claimCondition={claimCondition} />;
  }

  // 显示倒计时
  return (
    <div className="flex flex-col items-center">
      <button
        disabled
        className="bg-purple-600/50 text-white px-6 py-2 rounded-lg cursor-not-allowed mb-4"
      >
        {t("Claim starts in")}
      </button>
      
      <div className="flex items-center gap-2">
        {timeLeft.days > 0 && (
          <>
            <div className="bg-purple-800/50 rounded-lg p-3 text-center min-w-[80px]">
              <div className="text-2xl font-bold">{timeLeft.days}</div>
              <div className="text-xs text-purple-300">{t("days")}</div>
            </div>
            <div className="text-xl font-bold text-purple-300">:</div>
          </>
        )}
        
        <div className="bg-purple-800/50 rounded-lg p-3 text-center min-w-[80px]">
          <div className="text-2xl font-bold">
            {timeLeft.hours.toString().padStart(2, '0')}
          </div>
          <div className="text-xs text-purple-300">{t("hours")}</div>
        </div>
        
        <div className="text-xl font-bold text-purple-300">:</div>
        
        <div className="bg-purple-800/50 rounded-lg p-3 text-center min-w-[80px]">
          <div className="text-2xl font-bold">
            {timeLeft.minutes.toString().padStart(2, '0')}
          </div>
          <div className="text-xs text-purple-300">{t("minutes")}</div>
        </div>
        
        <div className="text-xl font-bold text-purple-300">:</div>
        
        <div className="bg-purple-800/50 rounded-lg p-3 text-center min-w-[80px]">
          <div className="text-2xl font-bold">
            {timeLeft.seconds.toString().padStart(2, '0')}
          </div>
          <div className="text-xs text-purple-300">{t("seconds")}</div>
        </div>
      </div>
    </div>
  );
} 