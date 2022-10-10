import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios'
import { PokeResponse } from '../seed/interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  private axios: AxiosInstance = axios;

  async excecuteSeed() {
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');
    data.results.forEach(({name,url}) => {
      const noArray = url.split('/')
      const no:number = Number(noArray[noArray.length-2]);
      console.log(`${no} ${name}`)

    });
    return data;
  }

}
