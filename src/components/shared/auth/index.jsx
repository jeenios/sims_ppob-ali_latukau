import { IlustrasiAsset, LogoAsset } from "@/assets";
import { Label } from "@/components";

const AuthLayout = ({ children, title }) => {
  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center min-h-screen md:h-screen w-full md:overflow-hidden">
      <div className="w-full md:w-full lg:w-1/2 flex flex-col justify-center items-center gap-6">
        <div className="flex justify-center items-center gap-2">
          <img src={LogoAsset} alt="Logo SIMS PPOB" />
          <Label className="text-2xl">SIMS PPOB</Label>
        </div>
        <Label className="text-2xl text-center max-w-80">{title}</Label>

        {children}
      </div>
      <div className="hidden md:hidden lg:flex justify-center items-center md:w-1/2">
        <img src={IlustrasiAsset} alt="Illustrasi Login" />
      </div>
    </div>
  );
};

export default AuthLayout;
