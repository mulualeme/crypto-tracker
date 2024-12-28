import { useQuery } from "@tanstack/react-query";

const COINCAP_API_BASE = "https://api.coincap.io/v2";

export interface Asset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  priceUsd: string;
  changePercent24Hr: string;
  marketCapUsd: string;
  imageUrl?: string;
}

export interface AssetHistory {
  priceUsd: string;
  time: number;
}

export const getAssetImageUrl = (symbol: string) => {
  return `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;
};

export const useAssets = () => {
  return useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const response = await fetch(`${COINCAP_API_BASE}/assets?limit=50`);
      const data = await response.json();
      return data.data.map((asset: Asset) => ({
        ...asset,
        imageUrl: getAssetImageUrl(asset.symbol),
      })) as Asset[];
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useAssetHistory = (id: string) => {
  return useQuery({
    queryKey: ["asset-history", id],
    queryFn: async () => {
      const response = await fetch(
        `${COINCAP_API_BASE}/assets/${id}/history?interval=h1`
      );
      const data = await response.json();
      return data.data as AssetHistory[];
    },
  });
};

export const useAssetDetails = (id: string) => {
  return useQuery({
    queryKey: ["asset", id],
    queryFn: async () => {
      const response = await fetch(`${COINCAP_API_BASE}/assets/${id}`);
      const data = await response.json();
      return data.data as Asset;
    },
  });
};

export const formatPrice = (price: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(price));
};

export const formatMarketCap = (marketCap: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(parseFloat(marketCap));
};

export const formatPercentage = (percent: string) => {
  const value = parseFloat(percent);
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
};