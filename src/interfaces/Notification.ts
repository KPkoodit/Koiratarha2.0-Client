import { User } from "./User";

interface Notification extends Document {
    loc_name: string;
    time: Date;
    user_id: User | string;
}

export type {Notification};
