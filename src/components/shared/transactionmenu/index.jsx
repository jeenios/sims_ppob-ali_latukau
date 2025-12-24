import { Label, Card, CardContent } from "@/components";
import { Link } from "react-router-dom";

const TransactionMenu = () => {
  return (
    <div className="w-full mt-10">
      <div className="flex flex-col gap-2.5">
        <Label className="text-xl font-medium">Semua Transaksi</Label>
      </div>
      <div className="flex flex-col gap-6 mt-6">
        <Card className="w-full">
          <CardContent className="flex items-start justify-between p-4">
            <div className="flex flex-col gap-2">
              <Label className="text-2xl font-bold text-teal-500">
                + Rp. 10.000
              </Label>
              <Label className="text-xs text-muted-foreground">
                17 Agustus 2025, 13.00 WIB
              </Label>
            </div>
            <div className="text-right">
              <Label className="text-xs">Top Up Saldo</Label>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex w-full items-center justify-center mt-6">
        <Link
          to="#"
          className="text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
        >
          Show More
        </Link>
      </div>
    </div>
  );
};

export default TransactionMenu;
