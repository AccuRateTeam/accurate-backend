export type Scoreboard = {
  targets: string[];
  users: {
    [username: string]: {
      username: string;
      scores: number[];
    }
  }
}