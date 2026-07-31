export interface IProductRepository{
    findAll(): any;
    findByID(id: number): any;
    findByProductname(productname: string): any;
    findByCategory(category: string): any;
    findAllAttributes(): any;
    findByProductIDAttributes(productid: number): any;
    Add(productname: string, description: string, price: number, stock: number, category: string): any;
    Update(id: number, productname: string, description: string, price: number, stock: number, category: string): any;
    setScore(id: number, score: number): any;
    Delete(id: number): any;
    Reset(userid: number): any;
    AddAttributes(productid: number, attribute: string, value: string): any;
    DeleteAttributes(productid: number): any;
    findImgByProductID(productid: number): any;
    findSomeImgByProductID(productid: number): any;
    findImgByProductIDPageNumber(productid: number, pagenumber: number): any;
    AddImg(productid: number, pagenumber: number, path: string): any;
    UpdateImg(productid: number, pagenumber: number, path: string): any;
    DeleteImg(productid: number, pagenumber: number): any;
    DeleteImgs(productid: number): any;
}