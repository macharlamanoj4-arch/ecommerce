import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

export interface GoogleOAuthConfig {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
}

export interface OAuthProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'google';
  accessToken: string;
  refreshToken: string;
}

export const configureGoogleOAuth = (config: GoogleOAuthConfig) => {
  passport.use(new GoogleStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL,
    scope: ['profile', 'email']
  }, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
      const user: OAuthProfile = {
        id: profile.id,
        email: profile.emails?.[0]?.value || '',
        name: profile.displayName,
        avatar: profile.photos?.[0]?.value,
        provider: 'google',
        accessToken,
        refreshToken
      };
      return done(null, user);
    } catch (error) {
      return done(error as Error);
    }
  }));
};

// Serialize and deserialize user for session management
passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});
