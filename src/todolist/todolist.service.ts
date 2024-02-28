/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import {TodolistRepository} from './repositories/todolist.repository'
import { Transaction } from 'sequelize';
import { filter } from 'rxjs';

@Injectable()
export class TodolistService {
  constructor(private readonly todolistRepository: TodolistRepository){}
 async create(createTodolistDto: CreateTodolistDto, data, transaction: Transaction) {

     const {...rest} = createTodolistDto;
     const val = {
      userId: data["id"],
      ...rest
     }

     await this.todolistRepository.create(val, transaction);
  }

  async findAll(data){
    
    const {id} = data;
    return await this.todolistRepository.findAll({userId: id});
   
  }

  async findOne(id: string){
    return await this.todolistRepository.findById(id);
  }

  async remove(id: string, transaction: Transaction){
    
    return await this.todolistRepository.delete({id}, transaction)
  }
  
}




//createTodolistDto: CreateTodolistDto