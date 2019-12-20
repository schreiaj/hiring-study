import { System, EntityViewFactory, EntityOf } from "perform-ecs";
import {shuffleInPlace} from 'simple-statistics'

import { EmployeeComponent } from "../components/employee";
import { EmployerComponent } from "../components/employer";

export class Hiring extends System {
    public employees = EntityViewFactory.createView({
        components: [EmployeeComponent]
    })
    public companies = EntityViewFactory.createView({
        components: [EmployerComponent]
    })

    public update(_dt: number) {
        const hireable = this.employees.entities.filter(d => !d.isHired)
        let hiring =  shuffleInPlace(this.companies.entities)
        while(hireable.length > 0 && hiring.filter(d=> d.hired.length < d.maxSize).length > 0) {
            shuffleInPlace(hiring)
            for(const company of hiring) {
                const evaluatedPerformance = (a: EntityOf<EmployeeComponent>) => {
                    return a.gender=='male'?(company.maleBias * a.rootPerformance): a.rootPerformance
                }
                hireable.sort((a,b) => evaluatedPerformance(b) - evaluatedPerformance(a))
                const hired = hireable.shift()
                if(!hired) {
                    return
                }
                company.hired.push(hired)
                hired.isHired = true
                // console.debug(`${company.name} is hiring... ${hired.name}`)
                
            }
        }
        // console.debug(`${hireable.length} employees left in pool.`)

    }

    
}