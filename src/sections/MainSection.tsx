import { useTranslation } from "react-i18next";
import mandalink_logo from "@/assets/logos/mandalink_logo.svg";
import { IoDocumentTextOutline } from "react-icons/io5";

const MainSection = ({
  initialWallet,
  initialEarnings,
  initialCommissions,
  initialTlv,
  totalInvested,
  distributed,
}: {
  initialWallet: number;
  initialEarnings: number;
  initialCommissions: number;
  initialTlv: number;
  totalInvested: number;
  distributed: number;
}) => {
  const { t } = useTranslation();
  return (
    <main className="MainSection flex w-full items-center justify-center flex-col">
      <img
        src={mandalink_logo}
        alt="mandalink logo"
        className="filter invert brightness-0 w-[70%] h-[70%] lg:w-[45%] lg:h-[45%] 2xl:w-[60%] 2xl:h-[60%] mt-8"
      />

      <div className="w-full flex flex-col items-center justify-center mt-10">
        <div className="w-full flex flex-row justify-between gap-4">
          <button className="bg-[#632667] text-white font-light rounded-md  items-center flex flex-row gap-2 hover:!bg-opacity-80 px-2 py-1.5 hover:outline outline-1">
            <IoDocumentTextOutline className="w-6 h-6" />
            <span className="text-md">{t("landing.downloadHereEnglish")}</span>
          </button>
          <button className="bg-[#632667] text-white font-light rounded-md  items-center flex flex-row gap-2 hover:!bg-opacity-80 px-2 py-1.5 hover:outline outline-1">
            <IoDocumentTextOutline className="w-6 h-6" />
            <span className="text-md">{t("landing.downloadHereSpanish")}</span>
          </button>
        </div>

        <div className="w-full flex flex-col mt-4">
          <div className="w-full flex flex-row justify-between">
            <p>{t("landing.yourWallet")}</p>
            <p className="font-bold">
              {initialWallet} {" USDT"}
            </p>
          </div>
          <div className="w-full flex flex-row justify-between">
            <p>{t("landing.earnings")}</p>
            <p className="font-bold">
              {initialEarnings} {" USDT"}
            </p>
          </div>
          <div className="w-full flex flex-row justify-between">
            <p>{t("landing.commissions")}</p>
            <p className="font-bold">
              {initialCommissions} {" USDT"}
            </p>
          </div>
        </div>

        <h2 className="mt-8 font-semibold">
          {t("landing.availableForWithdrawal")}
        </h2>
        <div className="w-full flex flex-col mt-4">
          <div className="w-full flex flex-row justify-between">
            <p>TVL</p>
            <p className="font-bold">
              {initialTlv} {" USDT"}
            </p>
          </div>
          <div className="w-full flex flex-row justify-between">
            <p>{t("landing.totalInvested")}</p>
            <p className="font-bold">
              {totalInvested} {" USDT"}
            </p>
          </div>
          <div className="w-full flex flex-row justify-between">
            <p>{t("landing.totalDistributed")}</p>
            <p className="font-bold">
              {distributed} {" USDT"}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainSection;
