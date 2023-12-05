import { router } from "expo-router";
import React, { useContext, useEffect } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AppHeader } from "../components/AppHeader";
import Location from "../interfaces/Location";
import { GlobalAddressContext } from "../providers/AddressProvider";

const AddressItem = ({
  item,
  onPress,
}: {
  item: Location;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <View style={styles.addressItem}>
        <Text>{item.display_name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SearchBar = ({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (text: string) => void;
}) => {
  return (
    <View style={styles.searchBar}>
      <View style={styles.locationIcon}>
        <Text>📍</Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for an address"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default function SearchLocationPage() {
  const {
    address,
    fetchLocations,
    locations,
    setAddress,
    fetchSelectedLocation,
    setSelectedLocation,
  } = useContext(GlobalAddressContext);
  const onSearch = async () => {
    try {
      if (address) {
        await fetchSelectedLocation(address);
        router.replace("/ProductsPage");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLocations(address);
  }, [address]);

  return (
    <View style={styles.container}>
      <AppHeader title={"Search"} />
      <View style={styles.body}>
        <Text style={styles.title}>Zé Frontend/Mobile</Text>
        <SearchBar value={address} onChangeText={(text) => setAddress(text)} />
        <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
        <FlatList
          data={locations}
          renderItem={({ item }) => (
            <AddressItem
              item={item}
              onPress={() => {
                setAddress(item.display_name);
                setSelectedLocation(item);
              }}
            />
          )}
          keyExtractor={(item) => item.place_id}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Footer</Text>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  searchButton: {
    width: "50%",
    height: 50,
    justifyContent: "center",
    backgroundColor: "#FFC500",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  body: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  addressItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    borderTopWidth: 1,
    borderTopColor: "lightgray",
    width: "100%",
    marginVertical: 10,
  },
  footer: {
    height: 50,
    backgroundColor: "#FFC500",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
