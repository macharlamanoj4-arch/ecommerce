import express, { Request, Response } from 'express';
import passport from 'passport';
import { configureGoogleOAuth, OAuthProfile } from '../utils/oAuth';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repository/user.repository';
import { generateToken } from '../utils/auth';

const router = express.Router();
const userService = new UserService(new UserRepository());

// Configure Google OAuth using your client credentials
configureGoogleOAuth({
  clientID: process.env.EMAIL_CLIENT_ID,
  clientSecret: process.env.EMAIL_CLIENT_SECRET,
  callbackURL: process.env.EMAIL_REDIRECT_URI
});

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  async (req: Request, res: Response) => {
    try {
      const profile = req.user as OAuthProfile;
      console.log("profile >>>>>>",profile)
      // Create or get user from OAuth profile
      const userData = {
        username: `google_${profile.id}`,
        email: profile.email,
        password: '', // OAuth users don't need passwords
        profile: {
          name: profile.name,
          avatar: profile.avatar
        }
      };

      let user;
      try {
        user = await userService.createUser(userData);
      } catch (error) {
        // If user already exists, create a minimal user object for JWT
        user = {
          id: profile.id,
          username: `google_${profile.id}`,
          profile: {
            name: profile.name,
            image: profile.avatar
          }
        };
      }

      // Generate JWT token
      const token = generateToken(user.id, 60, 'access',"");

      // Set JWT token in cookie (same as your existing login)
      res.cookie("Authorization", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 3600000,
        path: '/',
      });

      // Return user data and token (same format as your existing login)
      return res.status(200).json({
        status: 'success',
        token: token,
        profile: {
          id: user.id,
          username: user.username,
          profile: user.profile
        },
        ok: true
      });

    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ error: err.message });
    }
  }
);

export default router;
