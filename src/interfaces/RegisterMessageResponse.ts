import { User } from './User';

export default interface RegisterMessageResponse {
    createUser: {
        message: string,
        data: User,
        token: string
    }
}