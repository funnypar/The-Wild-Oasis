export default interface IGuest {
    id?: number;
    created_at?: Date;
    fullName: string;
    email: string;
    nationality: string;
    nationalId: string;
    countryFlag: string;
}
