import { Component, makeComponent, EntityOf } from "perform-ecs";
import { Gender } from "../types/gender";
import { EmployeeComponent } from "./employee";

/**
Component for tracking some information about employers
*/
@makeComponent
export class EmployerComponent extends Component {
  public name?: string;
  /**
   * This is how much the Employer prefers male employees, it multiplies their performance
   */
  public maleBias: number = 1;
  /**
   * How many people leave company each year
   */
  public attrition: number = 0;

  public maxSize: number = 0;

  public hired: Array<EntityOf<EmployeeComponent>> = [];

  reset(
    object: this,
    args: { name: string; maleBias: number; attrition: number; maxSize: number }
  ): void {
    const {
      name = "Employer",
      maleBias = 1.01,
      attrition = 0.15,
      maxSize = 50
    } = args;
    object.name = name;
    object.maleBias = maleBias;
    object.attrition = attrition;
    object.maxSize = maxSize;
    object.hired = [];
  }
}
