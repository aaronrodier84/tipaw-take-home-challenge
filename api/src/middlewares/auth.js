import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import bcrypt from 'bcrypt';

import { User } from '../models';

passport.use('login', new LocalStrategy(
    {
        usernameField: 'email',
    },
    async (email, password, done) => {
        try {
            const user = await User.findOne({
                where: {
                    email: email
                }
            });

            if (!user) {
                return done({ message: 'Invalid credentials' });
            }

            const matchPassword = await bcrypt.compare(password, user.password);

            if (!matchPassword) {
                return done({ message: 'Invalid credentials' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    },
));

passport.use('register', new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        const { firstname, lastname, phone, acceptTerms, confirmPassword } = req.body;

        try {
            const user = await User.findOne({
                where: {
                    email: email
                }
            });
            if (user) {
                return done({ message: 'Email already exist' });
            }
            
            const salt = await bcrypt.genSalt(15);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            const newUser = await User.create({
                first_name: firstname,
                last_name: lastname,
                phone_number: phone,
                email: email,
                password: hashedPassword,
                accept_terms: acceptTerms=="true"?true:false,
            });

            return done(null, newUser);
        } catch (err) {
            return done(err, false);
        }
    },
));

/*
This JWT strategy is not using cookie. Instead, it will send the token
in the JSON response. If you want to extract the JWT in a cookie,
create a custom extractor function with cookie-parser. Learn
more here http://www.passportjs.org/packages/passport-jwt
*/
passport.use(new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.ACCESS_TOKEN_SECRET,
        passReqToCallback: true,
    },
    async (req, payload, done) => {
        try {
            const user = await User.findByPk(payload.sub, {
                include: [{
                    model: Role,
                    as: 'roles',
                    attributes: ['role_name'],
                    through: { attributes: [] }
                }]
            });

            if (!user) {
                return done(null, false);
            }

            req.user = user;
            return done(null, user);
        } catch (err) {
            return done(err, false);
        }
    },
));

// eslint-disable-next-line import/prefer-default-export
export const authenticate = (type) => {
    const types = ['register', 'login'];
    if (type) {
        if (!types.includes(type)) {
            process.exit(1);
        }

        return passport.authenticate(type, { session: false });
    }

    return passport.authenticate('jwt', { session: false });
};
