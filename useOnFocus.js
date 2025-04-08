import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export function useOnFocus(callback) {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", callback);
    return unsubscribe;
  }, [navigation, callback]);
}
