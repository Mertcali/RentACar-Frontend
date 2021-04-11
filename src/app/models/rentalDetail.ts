export interface RentalDetail{
    id?:number,
    carId:number,
    userId?:number,
    brandName?:string,
    colorName:string,
    carName?:string, 
    userName?:string,
    customerName?:string,
    carDailyPrice:number,
    carModelYear:string,
    carDescription:string
    rentDate:Date,
    returnDate?:Date,
}