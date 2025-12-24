import { InputWithAddon, Button } from "@/components";
import { LuAtSign, LuLock, LuEye, LuEyeOff } from "react-icons/lu";

import { useState } from "react";

const FormLogin = () => {
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
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="masukan password anda"
        leftIcon={<LuLock />}
        rightIcon={showPassword ? <LuEyeOff /> : <LuEye />}
        onRightIconClick={() => setShowPassword(true)}
      />
      <Button type="submit" className="w-full mt-6">
        Masuk
      </Button>
    </form>
  );
};

export default FormLogin;
