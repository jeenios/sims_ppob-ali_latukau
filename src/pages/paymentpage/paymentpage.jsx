import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Label, Button, Hero, InputWithAddon } from "@/components";
import { formatThousand } from "@/lib/format";
import { getServicesAction } from "@/store/serviceSlice";
import { postTransactionAction, resetPaymentState } from "@/store/paymentSlice";
import { getBalanceAction } from "@/store/balanceSlice";
import { LuTicket } from "react-icons/lu";
import { Toast } from "@/lib/toast";

const PaymentPage = () => {
  const { service_code } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { services, isLoading: isServicesLoading } = useSelector(
    (state) => state.service
  );
  const { isLoading, errorMessage } = useSelector((state) => state.payment);

  useEffect(() => {
    if (!services || services.length === 0) {
      dispatch(getServicesAction());
    }
    dispatch(resetPaymentState());
  }, [dispatch]);

  const service = services?.find((s) => s.service_code === service_code);
  const price =
    service?.service_tariff ?? service?.tariff ?? service?.price ?? 0;

  const onPay = () => {
    if (!service_code) return;
    dispatch(postTransactionAction(service_code))
      .unwrap()
      .then(() => {
        Toast.fire({ icon: "success", title: "Pembayaran berhasil" });
        dispatch(getBalanceAction());
        navigate("/homepage");
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err || errorMessage || "Pembayaran gagal",
        });
      });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col gap-6 w-full max-w-7xl">
        <Hero />
        <div className="flex items-center gap-4">
          <div className="flex flex-col space-y-2">
            <Label className="text-lg text-muted-foreground">Pembayaran</Label>
            <div className="flex flex-row items-center gap-2">
              {service?.service_icon ? (
                <img
                  src={service.service_icon}
                  alt={service?.service_name || "Service"}
                  className="w-10 h-10 object-contain"
                />
              ) : null}
              <Label className="text-lg font-semibold">
                {service?.service_name || "Layanan"}
              </Label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <InputWithAddon
            name="total_amount_display"
            value={formatThousand(price)}
            readOnly
            leftIcon={<LuTicket />}
            className="text-2xl"
          />
        </div>

        <Button
          className="w-full"
          disabled={isLoading || isServicesLoading || !service}
          onClick={onPay}
        >
          {isLoading ? "Memproses..." : "Bayar"}
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;
