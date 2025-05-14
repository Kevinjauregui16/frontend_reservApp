import { useUser, RedirectToSignIn } from "@clerk/clerk-react";

export default function PrivateRoute({ element }) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;
  return isSignedIn ? element : <RedirectToSignIn />;
}
