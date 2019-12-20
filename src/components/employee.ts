import { Component, makeComponent, EntityOf } from "perform-ecs";
import { Gender } from "../types/gender";
import { EmployerComponent } from "./employer";

/**
Component for tracking some information about employees
*/
@makeComponent
export class EmployeeComponent extends Component {
  public name: string = "Employee";
  public rootPerformance: number = 0.5;
  public gender: Gender = "male";
  public isHired: boolean = false;

  reset(
    object: this,
    arg: { name: string; rootPerformance: number; gender: Gender }
  ): void {
    const { name = "Employee", rootPerformance = 0.5, gender = "male" } = arg;
    object.name = name;
    object.rootPerformance = rootPerformance;
    object.gender = gender;
  }
}
