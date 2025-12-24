import { Label, Input, InputWithAddon, Button } from "@/components";
import { LuTicket } from "react-icons/lu";
import { TopupData } from "@/components/atoms/topupdata";

const TopupMenu = () => {
  const TopupDatas = TopupData;
  return (
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
          />
          <Button className="w-full text-white rounded-md disabled">
            Top Up
          </Button>
        </div>
        <div className="w-full md:w-[40%] grid grid-cols-3 gap-2 mr-auto md:mr-0 lg:mr-10">
          {TopupDatas.map((item, index) => (
            <Button key={index} className="w-full" variant="outline">
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopupMenu;
