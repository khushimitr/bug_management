import { ProjectType } from "@/global";

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function giveProjectIdByName(projects: ProjectType[], name: string) {
  const project = projects.find((p) => p.name === name);
  return project!.id;
}


export function giveBugByBugKey() {

}