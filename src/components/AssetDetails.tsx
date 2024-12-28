import { useNavigate, useParams } from "react-router-dom";
import { useAssetDetails, useAssetHistory, formatPrice, formatMarketCap, formatPercentage } from "../services/api";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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
    <div className="p-8">
      <button onClick={() => navigate("/")} className="brutalist-button mb-8">
        ← BACK TO LIST
      </button>

      <div className="brutalist-card p-8 mb-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">{asset.name}</h1>
            <p className="text-2xl">{asset.symbol}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold mb-2">{formatPrice(asset.priceUsd)}</p>
            <p className={`text-xl ${parseFloat(asset.changePercent24Hr) >= 0 ? "text-green-600" : "text-red-600"}`}>
              {formatPercentage(asset.changePercent24Hr)}
            </p>
          </div>
        </div>

        <div className="h-[400px] mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="time" />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip />
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

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-100 border-2 border-black">
            <p className="text-sm mb-1">MARKET CAP</p>
            <p className="text-xl font-bold">{formatMarketCap(asset.marketCapUsd)}</p>
          </div>
          <div className="p-4 bg-gray-100 border-2 border-black">
            <p className="text-sm mb-1">RANK</p>
            <p className="text-xl font-bold">#{asset.rank}</p>
          </div>
        </div>
      </div>
    </div>
  );
};