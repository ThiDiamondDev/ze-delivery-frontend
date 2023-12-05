import { useRouter } from "expo-router";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CategoryCards = ({ categories }: { categories: string[] }) => {
  const router = useRouter();
  const goToCategoryPage = (category: string) => {
    router.push({
      pathname: "/CategoryPage",
      params: {
        category,
      },
    });
  };

  const renderItem = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => goToCategoryPage(item)}
        activeOpacity={0.8}
      >
        <Text textBreakStrategy="highQuality" style={styles.cardText}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.scrollContainer}>
      <ScrollView horizontal={true}>
        <View>
          <View style={styles.row}>
            <FlatList
              scrollEnabled={false}
              data={categories.slice(0, categories.length / 2)}
              renderItem={renderItem}
              horizontal={true}
            />
          </View>
          <View style={styles.row}>
            <FlatList
              scrollEnabled={false}
              data={categories.slice(categories.length / 2)}
              renderItem={renderItem}
              horizontal={true}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
// define some styles for the components
const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    width: "100%",
    marginLeft: 10,
  },

  row: {
    flexDirection: "row",
  },
  card: {
    margin: 10,
    padding: 10,
    width: 100,
    height: 100,
    backgroundColor: "#f8f8f8",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});

export default CategoryCards;
