type envVars = {
  dataset: string;
  projectId: string;
  googleId: string;
  googleSecret: string;
  facebookId: string;
  facebookSecret: string;
  stripePublicKey: string;
  stripeSecretKey: string;
};

const projectConfigVariables: envVars = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  googleId: process.env.GOOGLE_ID || "",
  googleSecret: process.env.GOOGLE_SECRET || "",
  facebookId: process.env.FACEBOOK_ID || "",
  facebookSecret: process.env.FACEBOOK_SECRET || "",
  stripePublicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || "",
  // instaId: process.env.INSTA_ID,
  // instaSecret: process.env.INSTA_SECRET,
  // appleId: process.env.APPLE_ID,
  // appleSecret: process.env.APPLE_SECRET,
};

export default projectConfigVariables;
