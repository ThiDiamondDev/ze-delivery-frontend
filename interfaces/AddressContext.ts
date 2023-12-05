import { DebouncedFunc, throttle } from "lodash";
import { SetStateAction } from "react";
import Location from "./Location";
export default interface AddressContext {
  address: string;
  selectedLocation: Location | undefined;
  locations: Location[];
  fetchLocations: DebouncedFunc<(address: any) => Promise<any>>;
  setSelectedLocation: React.Dispatch<
    React.SetStateAction<Location | undefined>
  >;
  setLocations: React.Dispatch<SetStateAction<Location[]>>;
  setAddress: React.Dispatch<SetStateAction<string>>;
  fetchSelectedLocation: (address: string) => Promise<void>;
}

export const DefaultAddressContext: AddressContext = {
  address: "",
  selectedLocation: undefined,
  locations: [],
  fetchLocations: throttle((address) => {}),
  setSelectedLocation: function (
    value: SetStateAction<Location | undefined>
  ): void {
    throw new Error("Function not implemented.");
  },
  setLocations: function (value: SetStateAction<Location[]>): void {
    throw new Error("Function not implemented.");
  },
  setAddress: function (value: SetStateAction<string>): void {
    throw new Error("Function not implemented.");
  },
  fetchSelectedLocation: function (address: string): Promise<void> {
    throw new Error("Function not implemented.");
  },
};
