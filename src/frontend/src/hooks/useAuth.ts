import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const {
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
  } = useInternetIdentity();
  const queryClient = useQueryClient();

  const logout = () => {
    clear();
    queryClient.clear();
  };

  const principalId = identity?.getPrincipal().toString();

  // Derive short display name from principal
  const shortPrincipal = principalId
    ? `${principalId.slice(0, 5)}...${principalId.slice(-3)}`
    : null;

  return {
    login,
    logout,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
    principalId,
    shortPrincipal,
  };
}
