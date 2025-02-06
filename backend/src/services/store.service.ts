import { Store } from "../entities/Store.entity";
import { AppDataSource } from "../utils/database";

export class StoreService {

  private static storeRepository = AppDataSource.getRepository(Store);

  static async getStoresByCity(city: string) {
    return this.storeRepository.find({
      where: { city },
      order: { name: 'ASC' },
    })
  }

  static async getNearbyStores(lat: number, lng: number, radiusKm: number = 5) {
    return this.storeRepository.query(`
          SELECT *, ST_Distance(
            location::geography, 
            ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography
          ) / 1000 AS distance_km
          FROM store
          WHERE ST_DWithin(
            location::geography,
            ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
            $3 * 1000
          )
          ORDER BY distance_km ASC
          LIMIT 50
        `, [lng, lat, radiusKm]);
  }

  static async getStoreDetails(storeId: number) {
    return AppDataSource.getRepository(Store).findOneBy({ id: storeId });
  }

}