import { BugPriority, BugSeverity, BugStatus, UserRole } from "@/utils";

export type RequireOnly<T, P extends keyof T> = Pick<T, P> & Partial<Omit<T, P>>;

export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};


export type UserType = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  isEnabled: boolean
  isAccountNonExpired: boolean
  isAccountNonLocked: boolean
  isCredentialsNonExpired: boolean
  profileUrl: string
  phone: string
  userName: string
  isMale: boolean
  role: RoleType
  projectsCreated: ProjectType[]
  teamsManaged: TeamType[]
  assignedTeams: TeamType[]
  bugsIdentified: BugType[]
  bugsAssigned: BugType[]
  comments: CommentType[]
};

export type CommentType = {
  id: number
  content: string
  commenter: UserType
  referredProject: ProjectType
  referredBug: BugType
  createdAt: Date
  updateAt: Date
};

export type TeamType = {
  id: number
  name: string
  manager: UserType
  members: UserType[]
  projects: ProjectType[]
};

export type RoleType = {
  id: number
  name: UserRole
  users: UserType[]
};

export type ProjectType = {
  id: number
  projectKey: string
  name: string
  startDate: Date
  targetEndDate: Date
  actualEndDate: Date
  manager: UserType
  bugs: BugType[]
  comments: CommentType[]
  teams: TeamType[]
};

export type BugType = {
  id: number
  bugKey: number
  summary: string
  description: string
  bugStatus: BugStatus
  bugSeverity: BugSeverity
  bugPriority: BugPriority
  targetResolutionDate: Date
  actualResolutionDate: Date
  resolutionSummary: string
  identifier: UserType
  assignee: UserType
  project: ProjectType
  comments: CommentType[]
  createdAt: Date
  updateAt: Date
};

