async function main() {
  let numbers = [];
  for (let i = 0; i <= 200; i += 1) {
    const res = await fetch(
      `https://api.singtel.com/api/sg/v1/gomo-service-number/numbers/${i}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer GwaXEFjVUOAgEf4mUQ4cSGkP2tGA`,
        },
      }
    );
    const data = await res.json();
    const numbers_sub = data.content.map((x) => [x.number, `API: ${i}`]);
    numbers = numbers.concat(numbers_sub);
  }
  numbers.sort((a, b) => {
    const as = new Set(a[0]).size;
    const bs = new Set(b[0]).size;
    return as - bs;
  });
  for (let i = 0; i < numbers.length; i += 1) {
    if (new Set(numbers[i][0]).size <= 4 || numbers[i][0].endsWith("3822")) {
      console.log(numbers[i], new Set(numbers[i][0]).size);
    }
  }
}

main();
