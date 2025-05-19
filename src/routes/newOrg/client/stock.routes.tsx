
import { Route } from "react-router-dom";
import { SummaryStockPage } from "@/pages/stockUpdate/summary/summary.page";
import { DetailsStockLotPage } from "@/pages/stockUpdate/detailsLot/detailsLotBatch.page";
import { DetailsStockLotBatchPage } from "@/pages/stockUpdate/detailsLotBatch/detailsLotBatch.page";

export const StockRoutes = (
  <Route path="stock">
    <Route path="summary" element={<SummaryStockPage />} />
    <Route path="detailsLot" element={<DetailsStockLotPage />} />
    <Route path="detailsLotBatch" element={<DetailsStockLotBatchPage />} />
    <Route index element={<SummaryStockPage />} />
  </Route>
);
