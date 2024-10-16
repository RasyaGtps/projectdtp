class Buku {
  constructor(id, judul, penulis, tahunTerbit, genre) {
    this.id = id;
    this.judul = judul;
    this.penulis = penulis;
    this.tahunTerbit = tahunTerbit;
    this.genre = genre;
  }
}

class PerpustakaanManager {
  constructor() {
    this.bukuList = [];
    this.nextId = 1;
  }

  tambahBuku(judul, penulis, tahunTerbit, genre) {
    const bukuBaru = new Buku(this.nextId++, judul, penulis, tahunTerbit, genre);
    this.bukuList.push(bukuBaru);
    return bukuBaru;
  }

  editBuku(id, judul, penulis, tahunTerbit, genre) {
    const buku = this.bukuList.find((b) => b.id === id);
    if (buku) {
      buku.judul = judul;
      buku.penulis = penulis;
      buku.tahunTerbit = tahunTerbit;
      buku.genre = genre;
      return buku;
    }
    return null;
  }

  hapusBuku(id) {
    const index = this.bukuList.findIndex((b) => b.id === id);
    if (index !== -1) {
      this.bukuList.splice(index, 1);
      return true;
    }
    return false;
  }

  tampilkanSemuaBuku() {
    return this.bukuList;
  }

  simpanKeJSON() {
    return JSON.stringify(this.bukuList);
  }

  muatDariJSON(jsonString) {
    this.bukuList = JSON.parse(jsonString).map((buku) => {
      return new Buku(buku.id, buku.judul, buku.penulis, buku.tahunTerbit, buku.genre);
    });
    this.nextId = Math.max(...this.bukuList.map((b) => b.id), 0) + 1;
  }
}

const perpustakaan = new PerpustakaanManager();

perpustakaan.tambahBuku("Peristiwa penghitaman 1820", "Raidhant Avanichi Melswin", 2029, "Horror Rape BDSM ");

console.log(perpustakaan.tampilkanSemuaBuku());

perpustakaan.editBuku(1, "orang hitam", "Mirza", 1997, "Young Adult Fantasy");

perpustakaan.hapusBuku(2);

console.log(perpustakaan.tampilkanSemuaBuku());

const jsonData = perpustakaan.simpanKeJSON();
console.log("Proses data terbaru:", jsonData);

const perpustakaanBaru = new PerpustakaanManager();
perpustakaanBaru.muatDariJSON(jsonData);
console.log("Hasil proses:", perpustakaanBaru.tampilkanSemuaBuku());
