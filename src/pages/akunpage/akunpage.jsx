import { Label, InputWithAddon, Button } from "@/components";
import { LuAtSign, LuUser } from "react-icons/lu";
import { ProfileAsset } from "@/assets";

const AkunPage = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center justify-center w-full max-w-2xl gap-4 px-4 py-6">
        <img
          src={ProfileAsset}
          alt="Logo Akun"
          className="w-32 h-32 rounded-full border-2 border-gray-100"
        />
        <Label className="text-2xl font-semibold">Ali Latukau</Label>
        <form
          className="flex w-full flex-col gap-4 mt-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium">Email</Label>
            <InputWithAddon
              name="email"
              placeholder="masukan email anda"
              leftIcon={<LuAtSign />}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium">Nama Depan</Label>
            <InputWithAddon
              name="firstName"
              placeholder="masukan nama depan anda"
              leftIcon={<LuUser />}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium">Nama Belakang</Label>
            <InputWithAddon
              name="lastName"
              placeholder="masukan nama belakang anda"
              leftIcon={<LuUser />}
            />
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <Button
              type="submit"
              className="w-full  text-red-500 border-red-500 hover:text-red-600 hover:bg-red-50 font-semibold"
              variant="outline"
            >
              Edit Profile
            </Button>
            <Button type="button" className="w-full font-semibold">
              Logout
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AkunPage;
