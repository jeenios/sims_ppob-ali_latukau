import { ProfileAsset, BgSaldoAsset } from "@/assets";
import { Label } from "@/components";

const Hero = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full hidden md:flex flex-col md:w-[40%] gap-2 p-4 md:p-0">
          <img
            src={ProfileAsset}
            alt="Profile"
            width={80}
            height={80}
            className="mb-4"
          />
          <Label className="text-xl">Selamat Datang,</Label>
          <Label className="text-3xl font-semibold">Ali Latukau</Label>
        </div>
        <div className="w-full md:w-[60%] h-50 md:h-40 lg:h-full overflow-hidden rounded-3xl relative">
          <img
            src={BgSaldoAsset}
            alt="Logo Saldo"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center pl-8 text-white gap-2.5">
            <Label className="text-lg font-medium">Saldo anda</Label>
            <Label className="text-4xl font-bold">Rp 100.000</Label>
            <Label className="text-sm font-medium mt-2">Lihat saldo</Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
