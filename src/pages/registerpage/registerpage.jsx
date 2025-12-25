import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { LuAtSign, LuLock, LuEye, LuEyeOff, LuUser } from "react-icons/lu";

import { AuthLayout, Button, Input } from "@/components";
import { registerSchema } from "@/lib/validation";
import { registerActionUser, resetState } from "@/store/authSlice";
import { Toast } from "@/lib/toast";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isSuccess, isError, errorMessage } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirm_password: "",
    },
  });

  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      Toast.fire({
        icon: "success",
        title: "Registrasi berhasil silakan login.",
      });
      dispatch(resetState());
      navigate("/login");
    }

    if (isError) {
      Toast.fire({ icon: "error", title: errorMessage });
      dispatch(resetState());
    }
  }, [isSuccess, isError, errorMessage, navigate, dispatch]);

  const onSubmit = (data) => {
    const payload = { ...data };
    delete payload.confirm_password;
    dispatch(registerActionUser(payload));
  };

  return (
    <AuthLayout title="Lengkapi data untuk membuat akun">
      <form
        className="flex w-full max-w-sm flex-col gap-4 px-4 md:px-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-1 relative">
          <LuAtSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="masukan email anda"
            className="pl-9"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500 text-xs text-left">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 relative">
          <LuUser className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="nama depan"
            className="pl-9"
            {...register("first_name")}
          />
          {errors.first_name && (
            <span className="text-red-500 text-xs text-left">
              {errors.first_name.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 relative">
          <LuUser className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="nama belakang"
            className="pl-9"
            {...register("last_name")}
          />
          {errors.last_name && (
            <span className="text-red-500 text-xs text-left">
              {errors.last_name.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 relative">
          <LuLock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="buat password"
            className="pl-9 pr-9"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            {showPassword ? <LuEyeOff /> : <LuEye />}
          </button>
          {errors.password && (
            <span className="text-red-500 text-xs text-left">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 relative">
          <LuLock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="konfirmasi password"
            className="pl-9 pr-9"
            {...register("confirm_password")}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            {showConfirmPassword ? <LuEyeOff /> : <LuEye />}
          </button>
          {errors.confirm_password && (
            <span className="text-red-500 text-xs text-left">
              {errors.confirm_password.message}
            </span>
          )}
        </div>

        <Button type="submit" className="w-full mt-6" disabled={isLoading}>
          {isLoading ? "Loading..." : "Registrasi"}
        </Button>
      </form>

      <p className="text-muted-foreground text-sm mt-4 text-center">
        Sudah punya akun? login{" "}
        <Link to="/login" className="text-primary font-bold">
          di sini
        </Link>
      </p>
    </AuthLayout>
  );
};

export default RegisterPage;
