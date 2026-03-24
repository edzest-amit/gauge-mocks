import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'very-secret-development-key',
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.userId,
      tenantId: payload.tenantId,
      email: payload.email,
    };
  }

}