import { ProfileAsset, BgSaldoAsset } from "@/assets";
import { Label } from "@/components";
import { useSelector } from "react-redux";
import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { formatThousand } from "@/lib/format";

const Hero = () => {
  const { user } = useSelector((state) => state.profile);
  const { balance } = useSelector((state) => state.transaction);
  const [showBalance, setShowBalance] = useState(false);
  const formattedBalance = formatThousand(balance || 0);

  const toggleBalance = () => {
    setShowBalance(!showBalance);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex md:hidden items-center gap-3">
          <img
            src={
              user?.profile_image &&
              user?.profile_image !==
                "https://minio.nutech-integrasi.com/take-home-test/null"
                ? user.profile_image
                : ProfileAsset
            }
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div className="flex flex-col">
            <Label className="text-sm">Selamat Datang,</Label>
            <Label className="text-lg font-semibold">
              {user ? `${user.first_name} ${user.last_name}` : "User"}
            </Label>
          </div>
        </div>

        <div className="w-full hidden md:flex flex-col md:w-[40%] gap-2 p-4 md:p-0">
          <img
            src={
              user?.profile_image &&
              user?.profile_image !==
                "https://minio.nutech-integrasi.com/take-home-test/null"
                ? user.profile_image
                : ProfileAsset
            }
            alt="Profile"
            width={80}
            height={80}
            className="mb-4 rounded-full"
          />
          <Label className="text-xl">Selamat Datang,</Label>
          <Label className="text-3xl font-semibold">
            {user ? `${user.first_name} ${user.last_name}` : "User"}
          </Label>
        </div>

        <div className="w-full md:w-[60%] h-40 md:h-40 lg:h-full overflow-hidden rounded-3xl relative">
          <img
            src={BgSaldoAsset}
            alt="Logo Saldo"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center pl-8 text-white gap-2.5">
            <Label className="text-lg font-medium">Saldo anda</Label>
            <Label className="text-4xl font-bold">
              Rp {showBalance ? formattedBalance : "• • • • • • •"}
            </Label>
            <div className="flex items-center gap-2 mt-2">
              <Label className="text-sm font-medium text-white">
                Lihat Saldo
              </Label>
              <div className="cursor-pointer" onClick={toggleBalance}>
                {showBalance ? (
                  <LuEyeOff className="text-white" />
                ) : (
                  <LuEye className="text-white" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
