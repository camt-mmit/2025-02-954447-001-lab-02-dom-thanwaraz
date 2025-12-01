document.addEventListener('DOMContentLoaded', () => {
  const numberInputs = [...document.querySelectorAll('.app-inp-number')];

  numberInputs.forEach((elem) =>
    elem.addEventListener('change', () => {
      const result = numberInputs.reduce(
        (result, elem) =>
          result + (Number.isNaN(elem.valueAsNumber) ? 0 : elem.valueAsNumber),
        0,
      );

      const numberOutputs = [...document.querySelectorAll('.app-out-number')];
      numberOutputs.forEach((elem) => (elem.textContent = result));
    }),
  );
});

/*เมื่อหน้าเว็บโหลด (DOMContentLoaded) จะเลือกทุก element ที่มี class .app-inp-number
สำหรับแต่ละ input จะใส่ event listener ชนิด change
เมื่อ input ใดเปลี่ยนค่า จะทำการ reduce รวมค่าของทุก input
จากนั้นจะเลือก element .app-out-number ทุกตัว และอัพเดต textContent เป็นผลรวม */