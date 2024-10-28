export interface UserInterface {
  id: string;
  aud: "authenticated";
  role: "authenticated";
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmed_at: string;
  last_sign_in_at: string;
  app_metadata: { provider: "email"; providers: ["email"] };
  user_metadata: Record<string, any>;
  identities: IdentityInterface[];
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
}

interface IdentityInterface {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: {
    email: string;
    email_verified: false;
    phone_verified: false;
    sub: string;
  };
  provider: "email";
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  email: string;
}
