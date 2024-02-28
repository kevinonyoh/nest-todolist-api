/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { Transaction } from 'sequelize';
import { TransactionParam } from 'src/common/decorators/transaction-param.decorator';

@Controller('todolist')
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) {}
  
  
  @Post("")
  @ResponseMessage("Task added successfully")
  create(@Body() createTodolistDto: CreateTodolistDto, @Request() req, @TransactionParam() transaction: Transaction) {
    return this.todolistService.create(createTodolistDto, req.user, transaction);
  }

  @Get("")
  @ResponseMessage("data retrieve successfully")
  findAll(@Request() req){
     return this.todolistService.findAll(req.user);
  }

  @Get("/:id")
  @ResponseMessage("data retrieve successfully")
  findOne(@Param('id') todoId: string){
      return this.todolistService.findOne(todoId);
  }

  @Delete("/:id")
  @ResponseMessage("todo deleted successfully")
  remove(@Param("id") todoId: string, @TransactionParam() transaction: Transaction){
    return this.todolistService.remove(todoId, transaction);
  }


 }
