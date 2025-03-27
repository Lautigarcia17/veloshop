import { Recurrence } from "../enums/recurrence";

export interface Expense{
    expense_name : string,
    date : Date,
    note? : string,
    recurrence: Recurrence,
    amount : number
}