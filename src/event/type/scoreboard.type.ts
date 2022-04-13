export type Scoreboard = {
  targets: string[];
  users: {
    [username: string]: number[]
  }
}