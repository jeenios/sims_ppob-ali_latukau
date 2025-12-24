import { Hero, Label, InputWithAddon, Button } from "@/components";
import { TopupData } from "@/constants/topupdata";
import { LuTicket } from "react-icons/lu";
import { formatThousand } from "@/lib/format";

const TopupPage = () => {
  const TopupDatas = TopupData;

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
            />
            <Button className="w-full text-white rounded-md">Top Up</Button>
          </div>
          <div className="w-full md:w-[40%] grid grid-cols-3 gap-2 mr-auto md:mr-0 lg:mr-10">
            {TopupDatas.map((item, index) => (
              <Button key={index} className="w-full" variant="outline">
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
