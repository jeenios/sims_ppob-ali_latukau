import { Button } from "@/components";
import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

// kalau dipake aja
const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <h1 className="text-2xl">{error.statusText || error.message}</h1>
      <p className="text-muted-foreground">Sepertinya anda tersesat</p>

      <Link to="/login">
        <Button>Kembali ke halaman utama</Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
