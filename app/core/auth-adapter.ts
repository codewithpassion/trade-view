export type SignInMethod = 'google.com' | 'anonymous';

export type User = {
  name: string;
};

export function useSignIn(signInMethod: SignInMethod): [signIn: () => void, inFlight: boolean] {
  return [() => {}, false];
}

export function useCurrentUser() {
  return null;
}

export function getAuth() {
  return {};
}

export function signOut(auth: any) {}

export function logEvent(domain: any, event: string, data: object) {
  // TODO: Implement this function
}

export function getAnalytics() {
  return {};
}
