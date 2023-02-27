import { Injectable } from "@nestjs/common/decorators";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET_KEY
        }); 
    }

    async validate(payload: any) {
        return { ...payload.user /*...payload.email, ...payload.id*/ }
        //const payload = {email: user.email, id: user.id /*, roles: user.roles*/}

    }
}