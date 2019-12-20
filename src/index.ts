import { ECS } from "perform-ecs";
import { mean } from "simple-statistics";

import { Hiring } from "./systems/hiring";
import { Firing } from "./systems/firing";
import { EmployerComponent } from "./components/employer";
import { EmployeeComponent } from "./components/employee";

const ecs = new ECS();

const COMPANIES_COUNT = 50;

const EMPLOYEE_COUNT = 3000;

const SIM_YEARS = 10;

const HiringSystem = new Hiring();
const FiringSystem = new Firing();
ecs.registerSystem(FiringSystem);
ecs.registerSystem(HiringSystem);
/**
 * Let's generate some companies
 */

for (let i = 0; i < COMPANIES_COUNT; i++) {
  ecs.createEntity([
    {
      component: EmployerComponent,
      args: [{ name: `'Employer ${i}`, maleBias: 0.02 * Math.random() + 1 }]
    }
  ]);
}
for (let i = 0; i < EMPLOYEE_COUNT; i++) {
  ecs.createEntity([
    {
      component: EmployeeComponent,
      args: [
        {
          name: `Employee ${i}`,
          rootPerformance: Math.random(),
          gender: i % 2 == 0 ? "male" : "female"
        }
      ]
    }
  ]);
}

console.log("year, company, employees, pct_male, mean_perf, mean_male_perf, mean_female_perf");
for (let i = 1; i <= SIM_YEARS; i++) {
  ecs.update(0);
  HiringSystem.companies.entities.map(company => {
    const employees = company.hired.length;
    const males = company.hired.filter(d => d.gender == "male");
    const females = company.hired.filter(d => d.gender == "female");

    let allPerf = 0, malePerf = 0, femalePerf = 0

    if(males.length > 0 ) {
        malePerf = mean(males.map(d => d.rootPerformance));
    }
    if(females.length > 0){
        femalePerf = mean(females.map(d => d.rootPerformance));
    }
    if(company.hired.length > 0) {
        allPerf = mean(company.hired.map(d => d.rootPerformance))
    }

    console.log(
      `${i}, ${company.name}, ${employees}, ${males.length /
        employees}, ${allPerf}, ${malePerf}, ${femalePerf}`
    );
  });
}
