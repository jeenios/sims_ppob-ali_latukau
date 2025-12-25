import { Hero, Label, InputWithAddon, Button } from "@/components";
import { TopupData } from "@/constants/topupdata";
import { LuTicket } from "react-icons/lu";
import { formatThousand } from "@/lib/format";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { postTopupAction, resetTopupState } from "@/store/topupSlice";
import { getBalanceAction } from "@/store/balanceSlice";
import { Toast } from "@/lib/toast";

const TopupPage = () => {
  const TopupDatas = TopupData;
  const dispatch = useDispatch();
  const { isLoading, errorMessage } = useSelector((state) => state.topup);
  const [amount, setAmount] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const MIN_TOPUP = 10000;
  const MAX_TOPUP = 1000000;

  const isValidAmount = useMemo(
    () => amount >= MIN_TOPUP && amount <= MAX_TOPUP,
    [amount]
  );

  const onChangeAmount = (e) => {
    const raw = e.target.value.replace(/[^\d]/g, "");
    const num = Number(raw);
    setAmount(num);
    setSelectedIndex(null);
  };

  const onSelectPreset = (value, index) => {
    setAmount(value);
    setSelectedIndex(index);
  };

  const onSubmitTopup = () => {
    if (!isValidAmount) return;
    dispatch(postTopupAction(amount))
      .unwrap()
      .then(() => {
        Toast.fire({ icon: "success", title: "Top Up berhasil" });
        dispatch(getBalanceAction());
        setSelectedIndex(null);
        setAmount(0);
        dispatch(resetTopupState());
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err || errorMessage || "Top Up gagal",
        });
        dispatch(resetTopupState());
      });
  };

  return (
    <div>
      <Hero />

      <div className="w-full mt-10">
        <div className="flex flex-col gap-2.5">
          <Label className="text-xl font-medium">Silahkan masukan</Label>
          <Label className="text-3xl font-semibold">Nominal Top Up</Label>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mt-12">
          <div className="w-full md:w-[60%] flex flex-col gap-3">
            <InputWithAddon
              name="topup"
              placeholder="masukan nominal Top Up"
              leftIcon={<LuTicket />}
              value={amount ? formatThousand(amount) : ""}
              onChange={onChangeAmount}
            />
            <Button
              className="w-full text-white rounded-md"
              disabled={!isValidAmount || isLoading}
              onClick={onSubmitTopup}
            >
              {isLoading ? "Memproses..." : "Top Up"}
            </Button>
          </div>
          <div className="w-full md:w-[40%] grid grid-cols-3 gap-2 mr-auto md:mr-0 lg:mr-10">
            {TopupDatas.map((item, index) => (
              <Button
                key={index}
                className={`w-full ${
                  selectedIndex === index ? "border-primary text-primary" : ""
                }`}
                variant="outline"
                onClick={() => onSelectPreset(item.value, index)}
              >
                Rp{formatThousand(item.value)}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopupPage;
