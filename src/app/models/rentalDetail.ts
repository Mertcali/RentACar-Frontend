export interface RentalDetail{
    id?:number,
    carId:number,
    customerId?:number,
    brandName?:string,
    colorName:string,
    carName?:string, 
    userName?:string,
    companyName?:string,
    customerName?:string,
    carDailyPrice:number,
    carModelYear:string,
    carDescription:string
    rentDate:Date,
    returnDate?:Date
}