import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { User } from "../models/User.js";
import { ENV } from "./env.js";

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// Google Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: ENV.GOOGLE_CLIENT_ID,
            clientSecret: ENV.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ email: profile.emails[0].value });

                if (!user) {
                    user = await User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        passwordHash: null,
                    });
                }
                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

// GitHub Strategy
passport.use(
    new GitHubStrategy(
        {
            clientID: ENV.GITHUB_CLIENT_ID,
            clientSecret: ENV.GITHUB_CLIENT_SECRET,
            callbackURL: "/api/auth/github/callback",
            scope: ["user:email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // GitHub email might be private, need to handle that if strictly needed, 
                // but for now assuming public or provided in profile.
                const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;

                if (!email) {
                    return done(new Error("No email found from GitHub"), null);
                }

                let user = await User.findOne({ email: email });

                if (!user) {
                    user = await User.create({
                        name: profile.displayName || profile.username,
                        email: email,
                        passwordHash: null,
                    });
                }
                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

export default passport;
