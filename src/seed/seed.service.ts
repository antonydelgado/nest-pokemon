import { Injectable } from '@nestjs/common';
//import axios, { AxiosInstance } from 'axios'
import { PokeResponse } from '../seed/interfaces/poke-response.interface';
import { PokemonService } from '../pokemon/pokemon.service';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    private readonly pokemonService: PokemonService,
  private readonly http:AxiosAdapter) { }
  //private axios: AxiosInstance = axios;

  async excecuteSeed() {
    await this.pokemonService.deleteAll();
    const data:PokeResponse  = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    const pokemonResult: {name:string,no:number}[] = [];
    data.results.forEach(({ name, url }) => {
      const noArray = url.split('/')
      const no: number = Number(noArray[noArray.length - 2]);
      //console.log(`${no} ${name}`)
      pokemonResult.push({name,no});
      //this.pokemonService.create({ name, no });
    });
    await this.pokemonService.createMany(pokemonResult);
    return "Seed Execute!!!!!";
  }

}
