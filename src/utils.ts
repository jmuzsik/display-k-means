export default class Utils {
  public static createDataPoints(): number[][] {
    const points: number[][] = [];
    for (let i = 0; i < 1000; i++) {
      let randNumOne: number = Math.random() * 2000;
      let randNumTwo: number = Math.random() * 2000;
      // 4 options, [-#, +#], [+#, -#], [+#, +#], or [-#, -#]
      if (i % 4 === 0) {
        randNumOne = randNumOne * -1;
        randNumTwo = randNumTwo * -1;
      } else if (i % 3 === 0) {
        randNumOne = randNumOne * -1;
      } else if (i % 2 === 0) {
        randNumTwo = randNumTwo * -1;
      } else {
        // don't do anything
      }
      const point: number[] = [randNumOne, randNumTwo];
      points.push(point);
    }
    return points;
  }
}
