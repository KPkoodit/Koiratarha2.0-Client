import { User } from "./User";

interface FavouriteLocation extends Document {
    loc_name: string;
    address: string;
    city: string;
    user_id: User | string;
}

export type {FavouriteLocation};
