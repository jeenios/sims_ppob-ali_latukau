import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { LuAtSign, LuLock, LuEye, LuEyeOff } from "react-icons/lu";

import { AuthLayout, Button, Input } from "@/components";
import { loginSchema } from "@/lib/validation";
import { loginActionUser, resetState } from "@/store/authSlice";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, errorMessage, token } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (token) {
      navigate("/homepage");
    }

    return () => {
      dispatch(resetState());
    };
  }, [token, navigate, dispatch]);

  const onSubmit = (data) => {
    dispatch(loginActionUser(data));
  };

  return (
    <AuthLayout title="Masuk atau buat akun untuk menggunakan">
      <form
        className="flex w-full max-w-sm flex-col gap-4 px-4 md:px-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        {isError && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm mb-2">
            {errorMessage}
          </div>
        )}

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
          <LuLock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="masukan password anda"
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

        <Button type="submit" className="w-full mt-6" disabled={isLoading}>
          {isLoading ? "Loading..." : "Masuk"}
        </Button>
      </form>

      <p className="text-muted-foreground text-sm mt-4 text-center">
        Belum punya akun? registrasi{" "}
        <Link to="/register" className="text-primary font-bold">
          di sini
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
