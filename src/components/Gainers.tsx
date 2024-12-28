import { useNavigate } from "react-router-dom";
import { useAssets, formatPrice, formatMarketCap, formatPercentage } from "../services/api";

export const Gainers = () => {
  const { data: assets, isLoading, error } = useAssets();
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="text-center p-8">Loading assets...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Error loading assets</div>;
  }

  const gainers = assets
    ?.filter((asset) => parseFloat(asset.changePercent24Hr) > 0)
    .sort((a, b) => parseFloat(b.changePercent24Hr) - parseFloat(a.changePercent24Hr))
    .slice(0, 10);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">TOP 10 GAINERS</h1>
        <button 
          onClick={() => navigate('/')} 
          className="brutalist-button"
        >
          BACK TO ALL
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="brutalist-table">
          <thead>
            <tr>
              <th>RANK</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>24H CHANGE</th>
              <th>MARKET CAP</th>
            </tr>
          </thead>
          <tbody>
            {gainers?.map((asset) => (
              <tr key={asset.id} onClick={() => navigate(`/asset/${asset.id}`)}>
                <td>{asset.rank}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{asset.name}</span>
                    <span className="text-gray-600">{asset.symbol}</span>
                  </div>
                </td>
                <td>{formatPrice(asset.priceUsd)}</td>
                <td className="text-[#F97316] font-bold">
                  {formatPercentage(asset.changePercent24Hr)}
                </td>
                <td>{formatMarketCap(asset.marketCapUsd)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};