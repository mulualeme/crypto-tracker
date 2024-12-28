import { useNavigate } from "react-router-dom";
import { useAssets, formatPrice, formatMarketCap, formatPercentage } from "../services/api";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const AssetList = () => {
  const { data: assets, isLoading, error } = useAssets();
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="text-center p-8">Loading assets...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Error loading assets</div>;
  }

  return (
    <div className="p-8">
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-4xl font-bold">TOP 50 CRYPTO ASSETS</h1>
        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => navigate('/gainers')} 
            className="brutalist-button"
          >
            TOP GAINERS
          </button>
          <button 
            onClick={() => navigate('/losers')} 
            className="brutalist-button"
          >
            TOP LOSERS
          </button>
        </div>
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
            {assets?.map((asset) => (
              <tr key={asset.id} onClick={() => navigate(`/asset/${asset.id}`)}>
                <td>{asset.rank}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={asset.imageUrl} alt={asset.name} />
                      <AvatarFallback>{asset.symbol.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="font-bold">{asset.name}</span>
                      <span className="text-gray-600">{asset.symbol}</span>
                    </div>
                  </div>
                </td>
                <td>{formatPrice(asset.priceUsd)}</td>
                <td className={parseFloat(asset.changePercent24Hr) >= 0 ? "text-green-600" : "text-red-600"}>
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