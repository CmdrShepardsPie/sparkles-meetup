import OAuth2Strategy, {_StrategyOptionsBase, InternalOAuthError, StrategyOptions} from 'passport-oauth2';
import IMeetupUser from "@interfaces/i.meetup.user";
// const OAuth2Strategy = require('passport-oauth2')
//   , InternalOAuthError = require('passport-oauth2').InternalOAuthError
//   , util = require('util');

export interface IMeetupStrategyOptions {
  authorizationURL?: string;
  tokenURL?: string;
  clientID: string;
  clientSecret: string;
  callbackURL: string;
}

/**
 * `Strategy` constructor.
 *
 * Meetup uses the OAuth 2.0 protocol for authentication.
 *
 * Applications using this must supply a callback to verify the credentials which
 * accepts an `accessToken`, `refreshToken`, and a `profile`. After verifying the
 * credentials it should call `done` with the user object and any error that may
 * have occured as the first parameter.
 *
 * Options:
 *   - `clientID`	your Meetup application's App ID
 *   - `clientSecret`	your Meetup application's App Secret
 *   - `callbackURL`	URL to which Meetup will redirect the user after granting authorization
 *
 * Examples:
 *
 *     passport.use(new MeetupStrategy({
 *         clientID: 'MEETUP_APP_ID',
 *         clientSecret: 'SECRET_SAUCE',
 *         callbackURL: 'https://www.example.net/auth/meetup/callback'
 *       },
 *       function(accessToken, refreshToken, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
export default class MeetupStrategy extends OAuth2Strategy {
  constructor(options: IMeetupStrategyOptions, verify: OAuth2Strategy.VerifyFunction) {
    options.authorizationURL = options.authorizationURL || 'https://secure.meetup.com/oauth2/authorize';
    options.tokenURL = options.tokenURL || 'https://secure.meetup.com/oauth2/access';

    super(options as OAuth2Strategy.StrategyOptions, verify);
    // OAuth2Strategy.call(this, options, verify);
    this.name = 'meetup';
    (this as any)._oauth2._useAuthorizationHeaderForGET = true;
    this.userProfile = (accessToken, done) => {
      (this as any)._oauth2.get('https://api.meetup.com/members/self', accessToken, (err: any, body: any, res: any) => {
        // console.log('err', err);
        // console.log('body', body);
        // console.log('res', res);

        if (err) {
          return done(new InternalOAuthError('Failed to fetch user metadata', err));
        }

        try {
          const json = JSON.parse(body);

          const profile: IMeetupUser = { ...json, provider: 'meetup' };

          console.log('profile', profile);

          done(null, profile);
        } catch (e) {
          done(e);
        }
      });
    };
  }
}

// util.inherits(MeetupStrategy, OAuth2Strategy);

// export default function MeetupStrategy(options, verify) {
//   options = options || {};
//   options.authorizationURL = options.authorizationURL || 'https://secure.meetup.com/oauth2/authorize';
//   options.tokenURL = options.tokenURL || 'https://secure.meetup.com/oauth2/access';
//
//   OAuth2Strategy.call(this, options, verify);
//   this.name = 'meetup';
//   this._oauth2._useAuthorizationHeaderForGET = true;
// }
//
// util.inherits(MeetupStrategy, OAuth2Strategy);

/**
 * Retrieve user profile from Meetup.
 *
 * This function constructs a profile from the Meetup metadata call:
 *
 *   - `provider`	set to `meetup`
 *   - `id`		the user's Meetup ID
 *   - `
 *
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */
