import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGEKEYS } from "../constants/AsyncKeys";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem(STORAGEKEYS.PROFILE);
      if (savedProfile) {
        const isChanged = await AsyncStorage.getItem(
          STORAGEKEYS.PROFILECHANGED
        );
        if (!isChanged) {
          const parsed = JSON.parse(savedProfile);
          const { name, points } = parsed;
          const newProfile = {
            name,
            points,
            favCoffee: "Edit me in settings",
            favTreat: "Edit me in settings",
          };
          await AsyncStorage.setItem(
            STORAGEKEYS.PROFILE,
            JSON.stringify(newProfile)
          );
          await AsyncStorage.setItem(STORAGEKEYS.PROFILECHANGED, "1");
          setProfile(newProfile);
        } else {
          setProfile(JSON.parse(savedProfile));
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <ProfileContext.Provider
      value={{ profile, setProfile, loading, reloadProfile: loadProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
