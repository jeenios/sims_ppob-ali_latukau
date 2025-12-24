import { useState } from "react";
import { Link } from "react-router-dom";
import { InputWithAddon, Button, AuthLayout } from "@/components";
import { LuAtSign, LuLock, LuEye, LuEyeOff } from "react-icons/lu";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <AuthLayout title="Masuk atau buat akun untuk menggunakan">
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

      <p className="text-muted-foreground text-sm">
        Belum punya akun? registrasi{" "}
        <Link to="/register" className="text-primary font-bold">
          di sini
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
