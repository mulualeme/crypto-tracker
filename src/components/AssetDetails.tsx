import { useNavigate, useParams } from "react-router-dom";
import {
  useAssetDetails,
  useAssetHistory,
  formatPrice,
  formatMarketCap,
  formatPercentage,
  getAssetImageUrl,
} from "../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const AssetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: asset, isLoading: isLoadingAsset } = useAssetDetails(id!);
  const { data: history, isLoading: isLoadingHistory } = useAssetHistory(id!);

  if (isLoadingAsset || isLoadingHistory) {
    return <div className="text-center p-8">Loading asset details...</div>;
  }

  if (!asset || !history) {
    return <div className="text-center p-8 text-red-500">Asset not found</div>;
  }

  const chartData = history.map((point) => ({
    time: new Date(point.time).toLocaleDateString(),
    price: parseFloat(point.priceUsd),
  }));

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <button
        onClick={() => navigate("/")}
        className="brutalist-button mb-6 md:mb-8"
      >
        ← BACK TO LIST
      </button>

      <div className="brutalist-card p-4 md:p-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 md:h-16 md:w-16">
              <AvatarImage
                src={getAssetImageUrl(asset.symbol)}
                alt={asset.name}
              />
              <AvatarFallback>{asset.symbol.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">
                {asset.name}
              </h1>
              <p className="text-xl md:text-2xl">{asset.symbol}</p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">
              {formatPrice(asset.priceUsd)}
            </p>
            <p
              className={`text-lg md:text-xl ${
                parseFloat(asset.changePercent24Hr) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {formatPercentage(asset.changePercent24Hr)}
            </p>
          </div>
        </div>

        <div className="h-[300px] md:h-[400px] mb-6 -ml-10 md:mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis
                dataKey="time"
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis
                domain={["auto", "auto"]}
                tick={{ fontSize: 12 }}
                width={80}
              />
              <Tooltip
                contentStyle={{
                  background: "white",
                  border: "2px solid black",
                  borderRadius: "0px",
                  padding: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#000000"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <div className="p-3 md:p-4 bg-gray-100 border-2 border-black hover:bg-gray-200 transition-colors">
            <p className="text-xs md:text-sm mb-1">MARKET CAP</p>
            <p className="text-lg md:text-xl font-bold">
              {formatMarketCap(asset.marketCapUsd)}
            </p>
          </div>
          <div className="p-3 md:p-4 bg-gray-100 border-2 border-black hover:bg-gray-200 transition-colors">
            <p className="text-xs md:text-sm mb-1">RANK</p>
            <p className="text-lg md:text-xl font-bold">#{asset.rank}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
