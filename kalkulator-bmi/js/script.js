// Ambil elemen HTML
let mainApp = document.querySelector('.main-app');
let bmiResult = document.querySelector('.bmi-result');
let goBack = document.querySelector('.go-back');
let bmiForm = document.getElementById('bmi-form');
let resetButton = document.querySelector('.reset');
let beratBadan = document.getElementById('berat-badan');
let usia = document.getElementById('usia');
let tinggiBadan = document.getElementById('tinggi-badan');
let jenisKelaminPria = document.getElementById('pria');
let jenisKelaminWanita = document.getElementById('wanita');

// Event listener pada saat user submit form
bmiForm.addEventListener('submit', (e) => {
  // Fungsi untuk mencegah browser merefresh sendiri ketika submit
  e.preventDefault();

  let jenisKelaminAkhir;
  let formData = [];

  // Cek apa jenis kelamin yang dipilih
  if (jenisKelaminPria.checked) {
    jenisKelaminAkhir = jenisKelaminPria.value;
  } else if (jenisKelaminWanita.checked) {
    jenisKelaminAkhir = jenisKelaminWanita.value;
  }

  // Check apakah isi form sudah sesuai (form validation)
  if (jenisKelaminAkhir === undefined) {
    let errorText = 'pilih jenis kelamin terlebih dahulu!';
    let tag = 'jenis-kelamin';
    renderError(tag, errorText);
  } else {
    formData.push(jenisKelaminAkhir);
  }

  if (beratBadan.value == '') {
    let errorText = 'input berat badan tidak boleh kosong!';
    let tag = 'berat-badan';
    renderError(tag, errorText);
  } else {
    formData.push(beratBadan.value);
  }

  if (usia.value == '') {
    let errorText = 'input usia tidak boleh kosong!';
    let tag = 'usia';
    renderError(tag, errorText);
  } else {
    formData.push(usia.value);
  }

  if (tinggiBadan.value == '') {
    let errorText = 'input tinggi badan tidak boleh kosong!';
    let tag = 'tinggi-badan';
    renderError(tag, errorText);
  } else {
    formData.push(tinggiBadan.value);
  }

  if (formData.length == 4) {
    calculateBmi(formData);
    bmiResult.classList.remove('invisible');
    mainApp.classList.add('invisible');
    formData = [];
  }
});

// Event listener untuk reset button
resetButton.addEventListener('click', (e) => {
  e.preventDefault();
  location.reload();
});

// Fungsi untuk menampilkan error saat form validation
function renderError(tag, err) {
  if (tag == 'jenis-kelamin') {
    let errorEl = document.querySelector('.error-kelamin');
    errorEl.innerHTML = err;
  }

  if (tag == 'berat-badan') {
    let errorEl = document.querySelector('.error-berat');
    errorEl.innerHTML = err;
    beratBadan.style.backgroundColor = '#fec6b9';
    beratBadan.style.border = '2px solid tomato';
  }

  if (tag == 'usia') {
    let errorEl = document.querySelector('.error-usia');
    errorEl.innerHTML = err;
    usia.style.backgroundColor = '#fec6b9';
    usia.style.border = '2px solid tomato';
  }

  if (tag == 'tinggi-badan') {
    let errorEl = document.querySelector('.error-tinggi');
    errorEl.innerHTML = err;
    tinggiBadan.style.backgroundColor = '#fec6b9';
    tinggiBadan.style.border = '2px solid tomato';
  }
}

// Fungsi untuk menghitung nilai BMI
function calculateBmi(inputArray) {
  let berat = parseInt(inputArray[1]);
  let tinggi = parseInt(inputArray[3]) / 100;
  let result = berat / (tinggi * tinggi);
  createResultPage(parseFloat(result.toFixed(1)));
}

function createResultPage(value) {
  let underweight = [
    'Kurang',
    value,
    'yang kurang',
    'kurang dari 18.5',
    'underweight atau berat badan yang kurang.',
    'untuk menaikkan berat badan adalah dengan memilih makanan padat kalori dan sering mengkonsumsi camilan yang sehat.',
    'menaikkan berat badan hingga batas normal.',
    'Beberapa penyakit yang berasal dari kekurusan.',
    ['Infertilitas', 'Anemia', 'Osteoporosis', 'Sistem Imun Lemah'],
  ];

  let normal = [
    'Normal',
    value,
    'yang normal',
    'di antara 18.5 dan 25.0',
    'berat badan normal.',
    'untuk mempertahankan berat badan adalah melacak pemasukan kalori dan melakukan olahraga serta istirahat yang cukup.',
    'mempertahankan berat badan anda.',
    'Tidak ada resiko penyakit tetapi harus tetap waspada',
  ];

  let overweight = [
    'Lebih',
    value,
    'berlebih',
    'di antara 25.0 dan 27.0',
    'overweight atau berat badan berlebih.',
    'menurunkan berat badan adalah dengan mengatur kalori makanan yang dikonsumsi dan berolahraga.',
    'menurunkan berat badan hingga batas normal.',
    'Beberapa penyakit yang berasal dari kegemukan',
    ['Diabetes', 'Hipertensi', 'Sakit Jantung', 'Ostheoarthritis'],
  ];

  let obese = [
    'Sangat Berlebih',
    value,
    'sangat berlebih',
    'lebih dari 27',
    'obesitas atau berat badan berlebih tidak normal.',
    'menurunkan berat badan adalah dengan mengatur kalori makanan yang dikonsumsi dan berolahraga.',
    'menurunkan berat badan hingga batas normal.',
    'Beberapa penyakit yang berasal dari obesitas',
    [
      'Serangan jantung koroner',
      'Stroke',
      'Diabetes melitus (kencing manis)',
      'Hipertensi (tekanan darah tinggi)',
    ],
  ];

  if (value < 18.5) {
    renderResultPage(underweight);
  } else if (value >= 18.5 && value <= 25.0) {
    renderResultPage(normal);
  } else if (value >= 25.0 && value <= 27.0) {
    renderResultPage(overweight);
  } else if (value > 27.0) {
    renderResultPage(obese);
  }
}

function renderResultPage(desc) {
  const desc1 = document.querySelector('.desc-1');
  const displayValue = document.querySelector('.display');
  const desc2 = document.querySelector('.desc-2');
  const desc3 = document.querySelector('.desc-3');
  const desc4 = document.querySelector('.desc-4');
  const desc5 = document.querySelector('.desc-5');
  const desc6 = document.querySelector('.desc-6');
  const desc7 = document.querySelector('.desc-7');
  const diseaseList = document.querySelector('.disease-list');

  diseaseList.innerHTML = '';

  desc1.innerHTML = desc[0];
  displayValue.innerHTML = desc[1];
  desc2.innerHTML = desc[2];
  desc3.innerHTML = desc[3];
  desc4.innerHTML = desc[4];
  desc5.innerHTML = desc[5];
  desc6.innerHTML = desc[6];

  if (desc[0] == 'Normal') {
    // console.log(desc7.parentElement);
    desc7.innerHTML = desc[7];
    diseaseList.style.display = 'none';
  } else {
    diseaseList.style.display = 'inline-block';
    desc7.innerHTML = desc[7];
    for (let i = 0; i < desc[desc.length - 1].length; i++) {
      const liContainer = document.createElement('li');
      const liText = desc[desc.length - 1][i];
      liContainer.innerHTML = liText;
      diseaseList.append(liContainer);
    }
  }
}

// Even listener pada input berat badan untuk mengembalikan tampilan
beratBadan.addEventListener('focus', (e) => {
  e.target.style.backgroundColor = '#fff';
  e.target.parentElement.previousElementSibling.children[1].innerHTML = '';
  e.target.style.border = '1px solid lightgray';
});

// Even listener pada input usia untuk mengembalikan tampilan
usia.addEventListener('focus', (e) => {
  e.target.style.backgroundColor = '#fff';
  e.target.parentElement.previousElementSibling.children[1].innerHTML = '';
  e.target.style.border = '1px solid lightgray';
});

// Even listener pada input tinggi badan untuk mengembalikan tampilan
tinggiBadan.addEventListener('focus', (e) => {
  e.target.style.backgroundColor = '#fff';
  e.target.parentElement.previousElementSibling.children[1].innerHTML = '';
  e.target.style.border = '1px solid lightgray';
});

// Even listener pada radio button pria untuk mengembalikan tampilan
jenisKelaminPria.addEventListener('change', (e) => {
  document.querySelector('.error-kelamin').innerHTML = '';
});

// Even listener pada radio button wanita untuk mengembalikan tampilan
jenisKelaminWanita.addEventListener('change', (e) => {
  document.querySelector('.error-kelamin').innerHTML = '';
});

// Event listener untuk kembali ke halaman awal
goBack.addEventListener('click', () => {
  bmiResult.classList.add('invisible');
  mainApp.classList.remove('invisible');
  bmiForm.reset();
});
