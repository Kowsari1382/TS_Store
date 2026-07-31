export interface IUserRepository {
    findAll(): any;
    findByID(id: number): any;
    findByUsername(username: string): any;
    Register(username: string, password: string, number: string, email: string, bio: string, address: string): any;
    Add(username: string, password: string, number: string, email: string, bio: string, address: string, role: string): any;
    Update(id: number, username: any, password: any, number: any, email: any, bio: any, address: any, role: any): any;
    Edit(id: number, username: any, password: any, number: any, email: any, bio: any, address: any): any;
    Delete(id: number): any;
    UpdateAvatar(id: number, avatar: string): any;
    DeleteAvatar(id: number): any;
}