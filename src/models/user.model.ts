import { RowDataPacket } from "mysql2";

export default interface User extends RowDataPacket {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
}
