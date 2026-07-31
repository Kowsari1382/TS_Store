export interface IProductService {
    findAll(): any;
    findByID(id: number): any;
    findByProductname(productname: string): any;
    findByCategory(category: string): any;
    findAllAttributes(): any;
    findByProductIDAttributes(productid: number): any;
    Add(productInfo: any): any;
    Update(productInfo: any): any;
    setScore(id: number, score: number): any;
    Delete(id: number): any;
    Reset(userid: number): any;
    findImgByProductIDPageNumber(productid: number, pagenumber: number): any;
    findSomeImgByProductID(productid: number): any;
    AddImg(productid: number, page: number, path: string): any;
    UpdateImg(productid: number, page: number, path: string): any;
    DeleteImg(productid: number, page: number): any;
}