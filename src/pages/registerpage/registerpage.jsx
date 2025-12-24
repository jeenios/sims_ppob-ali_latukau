import { useState } from "react";
import { Link } from "react-router-dom";
import { LuAtSign, LuLock, LuEye, LuEyeOff, LuUser } from "react-icons/lu";
import { AuthLayout, InputWithAddon, Button } from "@/components";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <AuthLayout title="Lengkapi data untuk membuat akun">
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

      <p className="text-muted-foreground text-sm">
        Sudah punya akun? login{" "}
        <Link to="/login" className="text-primary font-bold">
          di sini
        </Link>
      </p>
    </AuthLayout>
  );
};

export default RegisterPage;
