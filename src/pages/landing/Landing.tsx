import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { ConnectButton, useActiveAccount, useReadContract, TransactionButton } from "thirdweb/react";
import { client } from "@/client";
import { NFTContract, OPEContract, NFTAddress } from "@/utils/contracts";
import { chain } from "@/chain";
import engFlag from "@/assets/icons/eng.png";
import espFlag from "@/assets/icons/esp.png";
import { showSuccessAlert } from "@/utils/notifications";
import { getContract } from "thirdweb";
import { claimTo } from "thirdweb/extensions/erc721";
import logoWhite from "@/assets/logos/logo-white.png";

// Language option type
interface LanguageOption {
  value: string;
  label: string;
  flag: string;
}

export function Landing() {
  const address = useActiveAccount();
  const { t, i18n } = useTranslation();

  // Get OPE balance
  const { data: opeBalance } = useReadContract({
    contract: OPEContract,
    method: "balanceOf",
    params: address ? [address.address] : ["0x0000000000000000000000000000000000000000"]
  });

  // Get NFT balance
  const { data: nftBalance } = useReadContract({
    contract: NFTContract,
    method: "balanceOf",
    params: address ? [address.address] : ["0x0000000000000000000000000000000000000000"]
  });

  // Get referral data from localStorage
  const [referralCount, setReferralCount] = useState(0);
  useEffect(() => {
    if(address) {
      const count = localStorage.getItem(`referralCount_${address.address}`) || "0";
      setReferralCount(Number(count));
    }
  }, [address]);

  // Language options
  const languageOptions: LanguageOption[] = [
    { value: "en", label: "English", flag: engFlag },
    { value: "ja", label: "日本語", flag: "🇯🇵" },
    { value: "th", label: "ไทย", flag: "🇹🇭" },
    { value: "ms", label: "Bahasa Melayu", flag: "🇲🇾" },
    { value: "ko", label: "한국어", flag: "🇰🇷" },
    { value: "zh", label: "中文", flag: "🇨🇳" }
  ];

  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const handleLanguageChange = (newValue: LanguageOption | null) => {
    if (newValue) {
      setCurrentLanguage(newValue.value);
      i18n.changeLanguage(newValue.value);
    }
  };

  // Handle copy referral link
  const handleCopyLink = () => {
    if (!address) return;
    
    const referralLink = `${window.location.origin}?REF=${address.address}`;
    navigator.clipboard.writeText(referralLink)
      .then(() => {
        showSuccessAlert(t("Referral link copied!"));
      })
      .catch((err) => {
        console.error("Copy failed:", err);
      });
  };

  const nftContract = getContract({
    client,
    address: NFTAddress,
    chain
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/30 backdrop-blur-md px-6 py-4 flex justify-between items-center z-50">
        <div className="flex items-center gap-4">
          <img 
            src={logoWhite} 
            alt="Logo" 
            className="h-8 w-auto"
          />
          <Select
            value={languageOptions.find(opt => opt.value === currentLanguage)}
            onChange={handleLanguageChange}
            options={languageOptions}
            className="w-32"
            classNamePrefix="select"
            styles={{
              control: (base) => ({
                ...base,
                background: 'rgba(0, 0, 0, 0.3)',
                borderColor: '#4B5563',
                '&:hover': {
                  borderColor: '#6B7280'
                },
                boxShadow: 'none',
                cursor: 'pointer'
              }),
              menu: (base) => ({
                ...base,
                background: 'rgba(0, 0, 0, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid #4B5563'
              }),
              option: (base, state) => ({
                ...base,
                background: state.isFocused ? 'rgba(139, 92, 246, 0.3)' : 'transparent',
                color: 'white',
                cursor: 'pointer',
                ':active': {
                  background: 'rgba(139, 92, 246, 0.5)'
                }
              }),
              singleValue: (base) => ({
                ...base,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }),
              input: (base) => ({
                ...base,
                color: 'white'
              }),
              dropdownIndicator: (base) => ({
                ...base,
                color: '#9CA3AF',
                ':hover': {
                  color: '#D1D5DB'
                }
              }),
              indicatorSeparator: (base) => ({
                ...base,
                backgroundColor: '#4B5563'
              })
            }}
            formatOptionLabel={(option: LanguageOption) => (
              <div className="flex items-center gap-2">
                <span className="text-lg">{option.flag}</span>
                <span>{option.label}</span>
              </div>
            )}
          />
        </div>
        <ConnectButton
          client={client}
          chain={chain}
          connectButton={{
            label: t("Connect Wallet"),
            className: "bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
          }}
          switchButton={{
            label: t("Switch to BSC"),
            className: "bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
          }}
        />
      </nav>

      {/* Hero Section */}
      <section className="pt-32 px-6 container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">{t("NFT Referral Program")}</h1>
          <p className="text-xl text-gray-300">{t("Earn rewards by sharing and collecting NFTs")}</p>
        </div>

        {address ? (
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* NFT Balance Card */}
            <div className="bg-purple-800/30 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-2">{t("Your NFTs")}</h3>
              <p className="text-3xl font-bold">{nftBalance?.toString() || "0"}</p>
            </div>

            {/* OPE Balance Card */}
            <div className="bg-purple-800/30 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-2">{t("OPE Balance")}</h3>
              <p className="text-3xl font-bold">
                {opeBalance ? Number(opeBalance) / 10**18 : "0"} OPE
              </p>
            </div>

            {/* Referrals Card */}
            <div className="bg-purple-800/30 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-2">{t("Total Referrals")}</h3>
              <p className="text-3xl font-bold">{referralCount}</p>
            </div>
          </div>
        ) : (
          <div className="text-center mb-16">
            <p className="text-xl text-gray-400 mb-4">{t("Connect your wallet to start")}</p>
          </div>
        )}

        {/* NFT Claim Section */}
        {address && (
          <div className="bg-purple-900/30 rounded-2xl p-8 backdrop-blur-sm mb-16">
            <h2 className="text-3xl font-bold mb-6">{t("Claim Your NFT")}</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 mb-4">
                  {t("Get your exclusive NFT and start earning rewards")}
                </p>
                <TransactionButton
                  transaction={async () => {
                    if (!address) throw new Error("No wallet connected");
                    
                    return claimTo({
                      contract: nftContract,
                      to: address.address,
                      quantity: 1n
                    });
                  }}
                >
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg transition">
                    {t("Claim NFT (1000 USDT)")}
                  </button>
                </TransactionButton>
              </div>
              <div className="w-48 h-48 bg-purple-700/50 rounded-xl">
                {/* NFT Preview */}
              </div>
            </div>
          </div>
        )}

        {/* Referral Link Section */}
        {address && (
          <div className="bg-purple-900/30 rounded-2xl p-8 backdrop-blur-sm mb-16">
            <h2 className="text-3xl font-bold mb-6">{t("Your Referral Link")}</h2>
            <div className="flex gap-4">
              <input
                type="text"
                value={`${window.location.origin}?REF=${address.address}`}
                readOnly
                aria-label="Referral Link"
                title="Your referral link"
                className="flex-1 bg-black/30 rounded-lg px-4 py-2"
              />
              <button 
                onClick={handleCopyLink}
                className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition"
              >
                {t("Copy")}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

