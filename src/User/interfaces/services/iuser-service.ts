export interface IUserService {
    findAll(): any;
    findByID(id: number): any;
    findByUsername(username: string): any;
    findAvatar(id: number): any;
    Register(userInfo: any): any;
    Login(userInfo: any): any;
    Add(userInfo: any): any;
    Update(userInfo: any): any;
    Edit(userInfo: any): any;
    Delete(id: number): any;
    DeleteAvatar(id: number): any;
    UpdateAvatar(id: number, avatar: string): any;
}