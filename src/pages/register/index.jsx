import { IlustrasiAsset } from "@/assets";
import { Label } from "@/components/ui/label";
import { LogoAsset } from "@/assets";
import { Link } from "react-router-dom";
import { FormRegister } from "@/components";

const RegisterPage = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center min-h-screen md:h-screen w-full md:overflow-hidden">
      <div className="w-full md:w-full lg:w-1/2 flex flex-col justify-center items-center gap-6">
        <div className="flex justify-center items-center gap-2">
          <img src={LogoAsset} alt="Logo SIMS PPOB" />
          <Label className="text-2xl">SIMS PPOB</Label>
        </div>
        <Label className="text-2xl text-center max-w-80">
          Lengkapi data untuk membuat akun
        </Label>

        <FormRegister />

        <p className="text-muted-foreground text-sm">
          Sudah punya akun? login{" "}
          <Link to="/login" className="text-primary font-bold">
            di sini
          </Link>
        </p>
      </div>
      <div className="hidden md:hidden lg:flex justify-center items-center md:w-1/2">
        <img src={IlustrasiAsset} alt="Illustrasi Login" />
      </div>
    </div>
  );
};

export default RegisterPage;
