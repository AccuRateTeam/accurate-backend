export type Scoreboard = {
  targets: {
    name: string;
    id: string;
  }[];
  users: {
    [username: string]: {
      username: string;
      scores: number[];
    }
  },
  finished: boolean;
}