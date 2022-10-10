import { PartialType } from '@nestjs/mapped-types';
import { Prop } from '@nestjs/mongoose';
import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';
import { Pokemon } from '../entities/pokemon.entity';
export class CreatePokemonDto {

    @IsString({message:'`name` is a character set and can`t that null'})
    @MinLength(1,{message:'`The character set minimun is one character for `name`'})
    @Prop({
        index:true,
        unique:true
    })
    // @IsString()
    // @MinLength(1)
    name:string;

    @Prop({
        unique:true,
        index:true
    })
     @IsInt({message:'`no` is an integer and can`t that null'})
     @IsPositive({message:'`no` can`t that negative number'})
     @Min(1,{message:'The number minimun aceptadet is one for `no`'})
    // @IsInt()
    // @IsPositive()
    // @Min(1)
    no:number;
}
