/* eslint-disable prettier/prettier */
import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Category, Status } from "../interfaces/todolist.interface";

export class CreateTodolistDto {
    
    @IsString()
    @IsNotEmpty()
    taskName: string;

    @IsString()
    @IsNotEmpty()
    taskDescription: string;

    @IsDate()
    @IsNotEmpty()
    dueDate: Date;

    @IsEnum(Category)
    @IsNotEmpty()
    category: string;
    
    @IsEnum(Status)
    @IsNotEmpty()
    status: string;
}

