import { NFTInfoCard } from './cards/NFTInfoCard';
import { OPEInfoCard } from './cards/OPEInfoCard';
import { ClaimConditionsCard } from './cards/ClaimConditionsCard';

interface InfoSliderProps {
  address?: string;
}

export function InfoSlider({ address }: InfoSliderProps) {
  return (
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      <NFTInfoCard address={address} />
      <OPEInfoCard address={address} />
      <ClaimConditionsCard />
    </div>
  );
} 