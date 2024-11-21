import { useTranslation } from "react-i18next";
import { ConnectButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { client } from "@/client";
import { chain } from "@/chain";
import { ClaimButton } from "@/components/ClaimButton";
import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { formatEther } from "viem";
import Select from "react-select";
import logoWhite from "@/assets/logos/logo-white.png";
import nft1 from "@/assets/images/nft1.png";

const contract = getContract({
  client,
  chain: defineChain(56),
  address: "0x3c1641A0de76B550C26D25d7f8ee3Ca19966E981",
});

interface LanguageOption {
  value: string;
  label: string;
  flag: string;
}

const languageOptions: LanguageOption[] = [
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "zh", label: "中文", flag: "🇨🇳" },
  { value: "ja", label: "日本語", flag: "🇯🇵" },
  { value: "ko", label: "한국어", flag: "🇰🇷" },
  { value: "ms", label: "Bahasa Melayu", flag: "🇲🇾" },
  { value: "th", label: "ไทย", flag: "🇹🇭" },
  { value: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { value: "fr", label: "Français", flag: "🇫🇷" }
];

export function Landing() {
  const { t, i18n } = useTranslation();
  const account = useActiveAccount();

  const { data: activeConditionId } = useReadContract({
    contract,
    method: "getActiveClaimConditionId",
    params: [],
  });

  const { data: claimCondition } = useReadContract({
    contract,
    method: "getClaimConditionById",
    params: activeConditionId ? [activeConditionId] : [],
  });

  const handleLanguageChange = (option: LanguageOption | null) => {
    if (option) {
      i18n.changeLanguage(option.value);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-black to-black text-white">
      <nav className="fixed top-0 w-full bg-black/30 backdrop-blur-lg border-b border-white/10 px-6 py-4 flex justify-between items-center z-50">
        <div className="flex items-center gap-4">
          <img 
            src={logoWhite} 
            alt="Logo" 
            className="h-10 w-auto"
          />
          <Select<LanguageOption>
            value={languageOptions.find(opt => opt.value === i18n.language)}
            onChange={handleLanguageChange}
            options={languageOptions}
            className="w-32"
            classNamePrefix="select"
            formatOptionLabel={(option: LanguageOption) => (
              <div className="flex items-center gap-2">
                <span>{option.flag}</span>
                <span>{option.label}</span>
              </div>
            )}
            styles={{
              control: (base) => ({
                ...base,
                background: 'rgba(0, 0, 0, 0.3)',
                borderColor: 'rgba(139, 92, 246, 0.2)',
                '&:hover': { borderColor: 'rgba(139, 92, 246, 0.4)' },
                boxShadow: 'none',
              }),
              menu: (base) => ({
                ...base,
                background: 'rgba(0, 0, 0, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
              }),
              option: (base, state) => ({
                ...base,
                background: state.isFocused ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                color: 'white',
                '&:hover': { background: 'rgba(139, 92, 246, 0.3)' },
              }),
              singleValue: (base) => ({
                ...base,
                color: 'white',
              }),
            }}
          />
        </div>
        <ConnectButton
          client={client}
          chain={chain}
          connectButton={{
            label: t("Connect Wallet"),
            className: "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-purple-500/20"
          }}
          switchButton={{
            label: t("Switch to BSC"),
            className: "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-purple-500/20"
          }}
        />
      </nav>

      <div className="flex min-h-screen pt-20 pb-10">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center">
          <div className="text-center mb-16 w-full">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              {t("NFT Claim")}
            </h1>
            <p className="text-xl text-gray-300/80">{t("Claim your exclusive NFT now")}</p>
          </div>

          <div className="w-full max-w-lg mx-auto bg-gradient-to-b from-purple-900/40 to-black/40 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/20 shadow-xl shadow-purple-500/10">
            <div className="text-center">
              <img 
                src={nft1}
                alt="NFT Preview"
                className="w-full h-80 object-cover rounded-xl mb-8 border border-purple-500/20 shadow-lg shadow-purple-500/10"
              />
              
              <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                {t("Exclusive NFT")}
              </h2>
              <p className="text-gray-300/80 mb-6 text-lg">{t("Limited Edition NFT Collection")}</p>
              
              {claimCondition && (
                <div className="mb-8">
                  <p className="text-2xl font-bold text-purple-400 mb-6">1000 USDT</p>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="bg-purple-900/30 rounded-xl p-4 border border-purple-500/20">
                      <p className="text-sm text-gray-300/80 mb-1">{t("Total Supply")}</p>
                      <p className="text-2xl font-bold text-purple-400">100</p>
                    </div>
                    <div className="bg-purple-900/30 rounded-xl p-4 border border-purple-500/20">
                      <p className="text-sm text-gray-300/80 mb-1">{t("Available")}</p>
                      <p className="text-2xl font-bold text-purple-400">50</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8">
              {account ? (
                <ClaimButton 
                  address={account.address}
                  claimCondition={claimCondition}
                />
              ) : (
                <p className="text-gray-400/80 text-center text-lg">
                  {t("Please connect your wallet to claim")}
                </p>
              )}
            </div>
          </div>

          {account && (
            <div className="w-full max-w-lg mx-auto bg-gradient-to-b from-purple-900/40 to-black/40 rounded-2xl p-8 backdrop-blur-sm mt-8 border border-purple-500/20 shadow-xl shadow-purple-500/10">
              <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                {t("Your Referral Link")}
              </h2>
              <div className="flex gap-4">
                <label className="sr-only" htmlFor="referral-link">{t("Referral Link")}</label>
                <input
                  id="referral-link"
                  type="text"
                  value={`${window.location.origin}?REF=${account.address}`}
                  readOnly
                  aria-label={t("Referral Link")}
                  className="flex-1 bg-purple-900/30 rounded-xl px-4 py-3 border border-purple-500/20 text-gray-300"
                />
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}?REF=${account.address}`);
                  }}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-purple-500/20"
                >
                  {t("Copy")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
