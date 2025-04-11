import AppNavigation from "./AppNavigation";
import { ProfileProvider } from "./context/ProfileContext";

export default function App() {
  return (
    <ProfileProvider>
      <AppNavigation />
    </ProfileProvider>
  );
}
