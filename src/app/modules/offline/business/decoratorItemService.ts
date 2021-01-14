
import { Injectable } from '@angular/core';
import { OfflineService } from '../services/offline.service';
@Injectable()
export class DecoratorService {
     private static service: OfflineService | undefined = undefined;
     public constructor(service: OfflineService) {
         DecoratorService.service = service;
     }
     public static getService(): OfflineService {
         if(!DecoratorService.service) {
             throw new Error('DecoratorService not initialized');
         }
         return DecoratorService.service;
     }
}


 const OfflineWrapper =(target:Function)=>{
console.log('ciao, ho decorato ',target)
const service = DecoratorService.getService()
console.log('service',service)
}
export   {OfflineWrapper as offlineWrapper}