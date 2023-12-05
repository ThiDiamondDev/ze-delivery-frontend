import { useRouter } from "expo-router";
import { throttle } from "lodash";
import { createContext, useState } from "react";
import AddressContext, {
  DefaultAddressContext,
} from "../interfaces/AddressContext";
import Location from "../interfaces/Location";

type ContextChildrenProps = {
  children: React.ReactNode;
};

export const GlobalAddressContext = createContext<AddressContext>(
  DefaultAddressContext
);
export const AddressContextProvider = ({ children }: ContextChildrenProps) => {
  const router = useRouter();
  const [address, setAddress] = useState<string>(
    "Rua Americo Brasiliense, Sao Paulo"
  );
  const [selectedLocation, setSelectedLocation] = useState<Location>();

  const [locations, setLocations] = useState<Location[]>([]);
  const fetchLocations = throttle(async (address) => {
    const apiUrl = process.env.EXPO_PUBLIC_AUTOCOMPLETE_URL || "";
    const url = apiUrl + encodeURIComponent(address);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.log(error);
    }
  }, 33);

  const fetchSelectedLocation = async (address: string) => {
    const apiUrl = process.env.EXPO_PUBLIC_SEARCH_URL || "";
    const url = apiUrl + encodeURIComponent(address);
    try {
      const response = await fetch(url);

      const [data] = await response.json();
      if (data) setSelectedLocation({ ...data });
    } catch (error) {
      console.log(error);
    } finally {
      router.replace({
        pathname: "/product",
      });
    }
  };
  return (
    <GlobalAddressContext.Provider
      value={{
        selectedLocation,
        address,
        locations,
        setSelectedLocation,
        setLocations,
        setAddress,
        fetchSelectedLocation,
        fetchLocations,
      }}
    >
      {children}
    </GlobalAddressContext.Provider>
  );
};
