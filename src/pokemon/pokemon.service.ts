import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>) { }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExecption(error);
    }
  }

  findAll() {
    //return this.pokemonModel.findAll;
  }

  async findOne(term: string) {

    let pokemon: Pokemon;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
      if (!pokemon) {
        throw new NotFoundException(`The find by 'no' with value ${term} has not result`);
      }
    } else if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
      if (!pokemon) {
        throw new NotFoundException(`The find by 'id' with value ${term} has not tresult`);
      }
    }
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term });
    }
    if (!pokemon) {
      throw new NotFoundException(`The find by 'name' with value ${term} has not tresult`);

    }
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
    }
    try {
      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExecption(error);
    }
  }

  async remove(id: string) {
    //const pokemon = await this.findOne(id);
    //const pokemon = await this.pokemonModel.findByIdAndDelete(id);
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if(deletedCount === 0){
      throw new BadRequestException(`the 'id' ${id} has not found in our DB`);
    }
    return `The pokemon with 'id' ${id} has ben removed`;
  }

  handleExecption(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exist in DB ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check Server logs`);
  }
}
