export class ResultHelper {
  compareResult = (ourGoal: number, oppGoal: number) => {
    if (ourGoal < oppGoal) {
      return "lose";
    } else if (ourGoal > oppGoal) {
      return "win";
    } else {
      return "draw";
    }
  };
}
