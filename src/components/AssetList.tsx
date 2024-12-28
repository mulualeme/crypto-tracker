import { useNavigate } from "react-router-dom";
import {
  useAssets,
  formatPrice,
  formatPercentage,
  getAssetImageUrl,
} from "../services/api";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const AssetList = () => {
  const navigate = useNavigate();
  const { data: assets, isLoading } = useAssets();

  if (isLoading) {
    return <div className="text-center p-4">Loading assets...</div>;
  }

  if (!assets?.length) {
    return <div className="text-center p-4 text-red-500">No assets found</div>;
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold">
          Cryptocurrency Prices
        </h1>
        <div className="flex gap-3 md:gap-4">
          <button
            onClick={() => navigate("/gainers")}
            className="brutalist-button text-sm md:text-base"
          >
            TOP GAINERS
          </button>
          <button
            onClick={() => navigate("/losers")}
            className="brutalist-button text-sm md:text-base"
          >
            TOP LOSERS
          </button>
        </div>
      </div>

      <div className="brutalist-card overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-black bg-gray-100">
              <th className="text-left p-3 md:p-4 whitespace-nowrap font-bold">
                RANK
              </th>
              <th className="text-left p-3 md:p-4 whitespace-nowrap font-bold">
                NAME
              </th>
              <th className="text-right p-3 md:p-4 whitespace-nowrap font-bold">
                PRICE
              </th>
              <th className="text-right p-3 md:p-4 whitespace-nowrap font-bold hidden sm:table-cell">
                24H CHANGE
              </th>
              <th className="text-right p-3 md:p-4 whitespace-nowrap font-bold hidden lg:table-cell">
                MARKET CAP
              </th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr
                key={asset.id}
                onClick={() => navigate(`/asset/${asset.id}`)}
                className="border-b border-black hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="p-3 md:p-4 text-sm md:text-base">
                  {asset.rank}
                </td>
                <td className="p-3 md:p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 md:h-10 md:w-10">
                      <AvatarImage
                        src={getAssetImageUrl(asset.symbol)}
                        alt={asset.name}
                      />
                      <AvatarFallback>
                        {asset.symbol.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm md:text-base">
                        {asset.name}
                      </div>
                      <div className="text-xs md:text-sm text-gray-500">
                        {asset.symbol}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-3 md:p-4 text-right text-sm md:text-base">
                  {formatPrice(asset.priceUsd)}
                </td>
                <td className="p-3 md:p-4 text-right hidden sm:table-cell">
                  <span
                    className={`text-sm md:text-base ${
                      parseFloat(asset.changePercent24Hr) >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {formatPercentage(asset.changePercent24Hr)}
                  </span>
                </td>
                <td className="p-3 md:p-4 text-right text-sm md:text-base hidden lg:table-cell">
                  {formatPrice(asset.marketCapUsd)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
