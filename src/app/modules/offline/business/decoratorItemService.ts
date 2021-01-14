import { Inject } from "@angular/core"
import { OfflineItemModelInterface } from "../models/OffilineModelInterface"
import { OfflineService } from "../services/offline.service"

class Business {

    constructor(@Inject(OfflineService) private service) {

    }

    registerEntity(entity: OfflineItemModelInterface) {
        this.service.registerEntity(entity)
        console.log('registered ', entity)
    }
}

const OfflineWrapper = (target: Function) => {
    console.log('ciao, ho decorato ', target)
}
export { OfflineWrapper as offlineWrapper }