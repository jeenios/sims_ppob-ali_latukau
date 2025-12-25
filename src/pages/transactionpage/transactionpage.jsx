import { Label, Card, CardContent, Hero, Button } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { formatThousand } from "@/lib/format";
import { getHistoryAction, resetHistoryState } from "@/store/historySlice";

const TransactionPage = () => {
  const dispatch = useDispatch();
  const { items, isLoading, limit, offset, hasMore, isError, errorMessage } =
    useSelector((state) => state.history);

  useEffect(() => {
    dispatch(resetHistoryState());
    dispatch(getHistoryAction({ limit: 5, offset: 0 }));
  }, [dispatch]);

  const showMore = () => {
    const nextOffset = offset + limit;
    dispatch(getHistoryAction({ limit, offset: nextOffset }));
  };

  return (
    <div>
      <Hero />

      <div className="w-full mt-10">
        <div className="flex flex-col gap-2.5">
          <Label className="text-xl font-medium">Semua Transaksi</Label>
        </div>
        <div className="flex flex-col gap-6 mt-6">
          {isError && errorMessage && (
            <Label className="text-sm text-red-500">{errorMessage}</Label>
          )}
          {items.map((trx, idx) => {
            const amount = trx.amount ?? trx.total_amount ?? trx.nominal ?? 0;
            const type = trx.transaction_type ?? trx.type ?? "";
            const isTopup = String(type).toUpperCase() === "TOPUP";
            const sign = isTopup ? "+" : "-";
            const date =
              trx.created_on ?? trx.transaction_date ?? trx.created_at ?? "";
            const title =
              trx.description ??
              (isTopup ? "Top Up Saldo" : "Pembayaran Layanan");
            return (
              <Card key={`${date}-${idx}`} className="w-full">
                <CardContent className="flex items-start justify-between p-4">
                  <div className="flex flex-col gap-2">
                    <Label
                      className={`text-2xl font-bold ${
                        isTopup ? "text-teal-500" : "text-red-500"
                      }`}
                    >
                      {sign} {formatThousand(amount)}
                    </Label>
                    <Label className="text-xs text-muted-foreground">
                      {date}
                    </Label>
                  </div>
                  <div className="text-right">
                    <Label className="text-xs">{title}</Label>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {items.length === 0 && !isLoading && (
            <Label className="text-sm text-muted-foreground">
              Belum ada transaksi
            </Label>
          )}
        </div>
        <div className="flex w-full items-center justify-center mt-6">
          <Button
            variant="outline"
            className="text-sm font-semibold"
            disabled={isLoading || !hasMore}
            onClick={showMore}
          >
            {isLoading ? "Memuat..." : hasMore ? "Show More" : "Tidak ada lagi"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
