import { System, EntityViewFactory, EntityOf } from "perform-ecs";
import {shuffleInPlace} from 'simple-statistics'

import { EmployeeComponent } from "../components/employee";
import { EmployerComponent } from "../components/employer";

export class Firing extends System {
    // public employees = EntityViewFactory.createView({
    //     components: [EmployeeComponent]
    // })
    public companies = EntityViewFactory.createView({
        components: [EmployerComponent]
    })

    public update(_dt:number){
        for(const company of this.companies.entities) {
            const cutoffPoint = Math.floor(company.attrition * company.hired.length)
            const employees = shuffleInPlace(company.hired)
            const employeesLeaving = employees.slice(0,cutoffPoint)
            company.hired = employees.slice(cutoffPoint)
            // console.debug(`${company.name} is losing ${employeesLeaving.length} employees`)
            employeesLeaving.map(d => {
                d.isHired = false
            })
        }
    }
}
