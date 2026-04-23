export class ErrorClass extends Error{
    public status;
    constructor(status: number, message: string){
        super(message)
        this.status = status
    }
}