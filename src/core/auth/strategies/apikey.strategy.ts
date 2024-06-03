import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { headerConfig } from 'config/auth.config';
import { BadRequestError, HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { timingSafeEqual } from 'node:crypto';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, 'api-key') {
  /**
   * @description Creates an instance of ApiKeyStrategy.
   * @method super The api key authentication strategy authenticates users using a apikey. The strategy requires a verify callback, which accepts these credentials and calls done providing a user.
   * @param {object} headerConfig
   ** header (string) name of the header field to be used for api keys, default: X-Api-Key.
   ** prefix (string) to be used in content of the header, eg. Bearer [apikey], default: empty. Attention: give it with blank if needed, eg. 'Bearer '
   * @param {boolean} passReqToCallback flags whether an express Request object is passed to the verify function.
   * @param {function} verify
   */
  constructor(private readonly configService: ConfigService) {
    super(headerConfig, true, (apiKey: string, verified: (err: Error | false, user?: object, info?: object) => void) =>
      this.validate(apiKey, verified),
    );
  }

  /**
   * @description
   * @param {string} apiKey parsed API key from from the request. Use it to determine, which user is using your endpoint.
   * @param {(err: unknown, user: unknown, info: unknown) => void} verified Callback to be called when you have done the API key handling. Signature: verify(err, user, info) => void
   ** err (Error) return an Error if user is not verified, otherwise yield null here
   ** user (Object, optional): only return user object if he is verified.
   ** info(Object, optional): yield additional information to success or failure of user verification.
   * @param {express.Request} request (express.Request, optional): express Request object if passReqToCallback is set to true.
   */
  private validate(apiKey: string, verified: (err: Error | false, user?: object, info?: object) => void) {
    const configKey = this.configService.get<string>('auth.apiKey');

    if (configKey) {
      const configKeyBuffer = Buffer.from(configKey);
      const requestKeyBuffer = Buffer.from(apiKey);

      try {
        timingSafeEqual(configKeyBuffer, requestKeyBuffer);
        return verified(false, {});
      } catch {
        return verified(false, undefined, new BadRequestError('Wrong API Key'));
      }
    } else {
      return verified(false, undefined, new BadRequestError('No API Key configured'));
    }
  }
}
