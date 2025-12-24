import { InputWithAddon, Button } from "@/components";
import { LuAtSign, LuLock, LuEye, LuEyeOff, LuUser } from "react-icons/lu";

import { useState } from "react";

const FormRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form
      className="flex w-full max-w-sm flex-col gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <InputWithAddon
        name="email"
        placeholder="masukan email anda"
        leftIcon={<LuAtSign />}
      />
      <InputWithAddon
        name="first_name"
        placeholder="nama depan"
        leftIcon={<LuUser />}
      />
      <InputWithAddon
        name="last_name"
        placeholder="nama belakang"
        leftIcon={<LuUser />}
      />
      <InputWithAddon
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="buat password"
        leftIcon={<LuLock />}
        rightIcon={showPassword ? <LuEyeOff /> : <LuEye />}
        onRightIconClick={() => setShowPassword(true)}
      />
      <InputWithAddon
        name="confirm_password"
        type={showPassword ? "text" : "password"}
        placeholder="konfirmasi password"
        leftIcon={<LuLock />}
        rightIcon={showPassword ? <LuEyeOff /> : <LuEye />}
        onRightIconClick={() => setShowPassword(true)}
      />
      <Button type="submit" className="w-full mt-6">
        Registrasi
      </Button>
    </form>
  );
};

export default FormRegister;
