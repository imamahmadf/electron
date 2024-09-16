const { db } = require("../database");
const path = require("path");
const ExcelJS = require("exceljs");
const { app } = require("electron");
const { format, parseISO } = require("date-fns");

module.exports = {
  handlePost: async (req, res) => {
    try {
      const {
        pegawai1,
        pegawai2,
        pegawai3,
        pegawai4,
        keberangkatan,
        pulang,
        puskesmas,
        tipe,
      } = req.body; // Mengambil data pegawai

      console.log("Data yang diterima:", req.body); // Log data yang diterima

      // Validasi data
      if (!pegawai1 || !pegawai2 || !pegawai3) {
        return res.status(400).send("Data pegawai tidak lengkap.");
      }

      const sourceFilePath = path.join(
        __dirname,
        "..",
        "assets",
        tipe == 1 ? "DISTRIBUSI.xlsx" : "MONITORING.xlsx"
      );

      console.log("File path:", sourceFilePath); // Log file path
      const downloadPath = app.getPath("downloads");
      const newFileName = `SPPD_${tipe == 1 ? "DISTRIBUSI" : "MONITORING"}_${
        puskesmas.label
      }${Date.now()}.xlsx`;
      const newFilePath = path.join(downloadPath, newFileName);
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(sourceFilePath);

      const worksheetSURTUG = workbook.getWorksheet("SURTUG");
      const worksheetNOTADINAS = workbook.getWorksheet("NOTA DINAS");
      const worksheetVISUM = workbook.getWorksheet("visum");
      const worksheetSPD1 = workbook.getWorksheet("SPD");
      const worksheetSPD2 = workbook.getWorksheet("SPD (2)");
      const worksheetSPD3 = workbook.getWorksheet("SPD (3)");
      const worksheetSPD4 = workbook.getWorksheet("SPD (4)");
      const worksheetLAP = workbook.getWorksheet("Lap");
      if (!worksheetSURTUG) {
        throw new Error("Worksheet 'SURTUG' tidak ditemukan.");
      }

      const formattedKeberangkatan = format(
        parseISO(keberangkatan),
        "d MMMM yyyy"
      );
      const formattedPulang = format(parseISO(pulang), "d MMMM yyyy");

      function generateNomorSurat(Keberangkatan, jenisSurat) {
        const date = new Date(Keberangkatan);

        const year = date.getFullYear().toString();
        const romawiMap = {
          0: "I",
          1: "II",
          2: "III",
          3: "IV",
          4: "V",
          5: "VI",
          6: "VII",
          7: "VIII",
          8: "IX",
          9: "X",
          10: "XI",
          11: "XII",
        };
        let nomorSurat = "";
        switch (jenisSurat) {
          case "tugas":
            nomorSurat = `090.1/          /ST-POA/${
              romawiMap[date.getMonth()]
            }/${year}`; // Mengubah bulan ke angka romawi
            break;
          case "nota dinas":
            nomorSurat = `440/           /ND-POA/${
              romawiMap[date.getMonth()]
            }/${year}`; // Mengubah bulan ke angka romawi
            break;
          case "SPD":
            nomorSurat = `094/              /SPD-POA/${
              romawiMap[date.getMonth()]
            }/${year}`; // Mengubah bulan ke angka romawi
            break;
          default:
            nomorSurat = "Nomor surat tidak valid";
        }

        return nomorSurat;
      }
      if (tipe == 2) {
        worksheetSURTUG.getCell("G15").value = pegawai1.label; // pegawai1 label
        worksheetSURTUG.getCell("G16").value = pegawai1.golongan; // pegawai1 golongan
        worksheetSURTUG.getCell("G17").value = pegawai1.NIP; // pegawai1 NIP
        worksheetSURTUG.getCell("G18").value = pegawai1.jabatan; // pegawai1 jabatan

        worksheetSURTUG.getCell("G20").value = pegawai2.label; // pegawai2 label
        worksheetSURTUG.getCell("G21").value = pegawai2.golongan; // pegawai2 golongan
        worksheetSURTUG.getCell("G22").value = pegawai2.NIP; // pegawai2 NIP
        worksheetSURTUG.getCell("G23").value = pegawai2.jabatan; // pegawai2 jabatan

        worksheetSURTUG.getCell("G25").value = pegawai3.label; // pegawai3 label
        worksheetSURTUG.getCell("G26").value = pegawai3.golongan; // pegawai3 golongan
        worksheetSURTUG.getCell("G27").value = pegawai3.NIP; // pegawai3 NIP
        worksheetSURTUG.getCell("G28").value = pegawai3.jabatan; // pegawai3 jabatan

        worksheetSURTUG.getCell("G30").value = pegawai4.label; // pegawai3 label
        worksheetSURTUG.getCell("G31").value = pegawai4.golongan; // pegawai3 golongan
        worksheetSURTUG.getCell("G32").value = pegawai4.NIP; // pegawai3 NIP
        worksheetSURTUG.getCell("G33").value = pegawai4.jabatan; // pegawai3 jabatan

        worksheetSURTUG.getCell("G43").value = puskesmas.label; // pegawai3 jabatan

        worksheetSURTUG.getCell("G36").value = formattedKeberangkatan; // tanggalKeberangkatan
        worksheetSURTUG.getCell("G37").value = formattedPulang; // tanggalPulang
        // worksheetSURTUG.getCell("G36").value = formattedPulang; // tanggalPulang

        worksheetSURTUG.getCell("G9").value = generateNomorSurat(
          keberangkatan,
          "tugas"
        );

        worksheetSURTUG.getCell("G11").value = generateNomorSurat(
          keberangkatan,
          "nota dinas"
        );

        worksheetSURTUG.getCell("G12").value = formattedKeberangkatan;
        worksheetSURTUG.getCell("J46").value = formattedKeberangkatan;

        worksheetSURTUG.getCell("R15").value = pegawai1.label; // pegawai1 label
        worksheetSURTUG.getCell("R16").value = pegawai1.golongan; // pegawai1 golongan
        worksheetSURTUG.getCell("R17").value = pegawai1.NIP; // pegawai1 NIP
        worksheetSURTUG.getCell("R18").value = pegawai1.jabatan; // pegawai1 jabatan

        worksheetSURTUG.getCell("R20").value = pegawai2.label; // pegawai2 label
        worksheetSURTUG.getCell("R21").value = pegawai2.golongan; // pegawai2 golongan
        worksheetSURTUG.getCell("R22").value = pegawai2.NIP; // pegawai2 NIP
        worksheetSURTUG.getCell("R23").value = pegawai2.jabatan; // pegawai2 jabatan

        worksheetSURTUG.getCell("R25").value = pegawai3.label; // pegawai3 label
        worksheetSURTUG.getCell("R26").value = pegawai3.golongan; // pegawai3 golongan
        worksheetSURTUG.getCell("R27").value = pegawai3.NIP; // pegawai3 NIP
        worksheetSURTUG.getCell("R28").value = pegawai3.jabatan; // pegawai3 jabatan

        worksheetSURTUG.getCell("R30").value = pegawai4.label; // pegawai3 label
        worksheetSURTUG.getCell("R31").value = pegawai4.golongan; // pegawai3 golongan
        worksheetSURTUG.getCell("R32").value = pegawai4.NIP; // pegawai3 NIP
        worksheetSURTUG.getCell("R33").value = pegawai4.jabatan; // pegawai3 jabatan

        worksheetSURTUG.getCell("R43").value = puskesmas.label; // pegawai3 jabatan

        worksheetSURTUG.getCell("R36").value = formattedKeberangkatan; // tanggalKeberangkatan
        worksheetSURTUG.getCell("R37").value = formattedPulang; // tanggalPulang
        // worksheetSURTUG.getCell("R36").value = formattedPulang; // tanggalPulang

        worksheetSURTUG.getCell("R9").value = generateNomorSurat(
          keberangkatan,
          "tugas"
        );

        worksheetSURTUG.getCell("R11").value = generateNomorSurat(
          keberangkatan,
          "nota dinas"
        );

        worksheetSURTUG.getCell("R12").value = formattedKeberangkatan;
        worksheetSURTUG.getCell("U46").value = formattedKeberangkatan;

        worksheetNOTADINAS.getCell("F14").value = formattedKeberangkatan;
        worksheetNOTADINAS.getCell("F16").value = generateNomorSurat(
          keberangkatan,
          "nota dinas"
        );
        worksheetNOTADINAS.getCell("F44").value = puskesmas.label;
        worksheetNOTADINAS.getCell("F30").value = pegawai1.label;
        worksheetNOTADINAS.getCell("F31").value = pegawai1.jabatan;
        worksheetNOTADINAS.getCell("F32").value = pegawai2.label;
        worksheetNOTADINAS.getCell("F33").value = pegawai2.jabatan;
        worksheetNOTADINAS.getCell("F34").value = pegawai3.label;
        worksheetNOTADINAS.getCell("F35").value = pegawai3.jabatan;
        worksheetNOTADINAS.getCell("F36").value = pegawai4.label;
        worksheetNOTADINAS.getCell("F37").value = pegawai4.jabatan;

        worksheetNOTADINAS.getCell("R14").value = formattedKeberangkatan;
        worksheetNOTADINAS.getCell("R16").value = generateNomorSurat(
          keberangkatan,
          "nota dinas"
        );
        worksheetNOTADINAS.getCell("R44").value = puskesmas.label;
        worksheetNOTADINAS.getCell("R30").value = pegawai1.label;
        worksheetNOTADINAS.getCell("R31").value = pegawai1.jabatan;
        worksheetNOTADINAS.getCell("R32").value = pegawai2.label;
        worksheetNOTADINAS.getCell("R33").value = pegawai2.jabatan;
        worksheetNOTADINAS.getCell("R34").value = pegawai3.label;
        worksheetNOTADINAS.getCell("R35").value = pegawai3.jabatan;
        worksheetNOTADINAS.getCell("R36").value = pegawai4.label;
        worksheetNOTADINAS.getCell("R37").value = pegawai4.jabatan;

        worksheetSPD4.getCell("H9").value = generateNomorSurat(
          keberangkatan,
          "SPD"
        );
        worksheetSPD4.getCell("E15").value = pegawai4.label;
        worksheetSPD4.getCell("F16").value = pegawai4.golongan;
        worksheetSPD4.getCell("F17").value = pegawai4.jabatan;
        worksheetSPD4.getCell("E23").value = puskesmas.label;
        worksheetSPD4.getCell("E25").value = formattedKeberangkatan;
        worksheetSPD4.getCell("E26").value = formattedPulang;
        worksheetSPD4.getCell("H34").value = formattedKeberangkatan;

        worksheetSPD4.getCell("S9").value = generateNomorSurat(
          keberangkatan,
          "SPD"
        );
        worksheetSPD4.getCell("P15").value = pegawai4.label;
        worksheetSPD4.getCell("Q16").value = pegawai4.golongan;
        worksheetSPD4.getCell("Q17").value = pegawai4.jabatan;
        worksheetSPD4.getCell("P23").value = puskesmas.label;
        worksheetSPD4.getCell("P25").value = formattedKeberangkatan;
        worksheetSPD4.getCell("P26").value = formattedPulang;
        worksheetSPD4.getCell("S34").value = formattedKeberangkatan;

        worksheetLAP.getCell("H19").value = pegawai4.label;
        worksheetLAP.getCell("H20").value = pegawai4.NIP;
        worksheetLAP.getCell("T19").value = pegawai4.label;
        worksheetLAP.getCell("T20").value = pegawai4.NIP;

        worksheetLAP.getCell("F23").value = puskesmas.label;
        worksheetLAP.getCell("F24").value = formattedKeberangkatan;
        worksheetLAP.getCell("R23").value = puskesmas.label;
        worksheetLAP.getCell("R24").value = formattedKeberangkatan;

        worksheetLAP.getCell("H43").value = pegawai1.label;
        worksheetLAP.getCell("H45").value = pegawai2.label;
        worksheetLAP.getCell("H47").value = pegawai3.label;
        worksheetLAP.getCell("H49").value = pegawai4.label;
        worksheetLAP.getCell("T43").value = pegawai1.label;
        worksheetLAP.getCell("T45").value = pegawai2.label;
        worksheetLAP.getCell("T47").value = pegawai3.label;
        worksheetLAP.getCell("T49").value = pegawai4.label;
      } else {
        worksheetSURTUG.getCell("G16").value = pegawai1.label; // pegawai1 label
        worksheetSURTUG.getCell("G17").value = pegawai1.golongan; // pegawai1 golongan
        worksheetSURTUG.getCell("G18").value = pegawai1.NIP; // pegawai1 NIP
        worksheetSURTUG.getCell("G19").value = pegawai1.jabatan; // pegawai1 jabatan

        worksheetSURTUG.getCell("G21").value = pegawai2.label; // pegawai2 label
        worksheetSURTUG.getCell("G22").value = pegawai2.golongan; // pegawai2 golongan
        worksheetSURTUG.getCell("G23").value = pegawai2.NIP; // pegawai2 NIP
        worksheetSURTUG.getCell("G24").value = pegawai2.jabatan; // pegawai2 jabatan

        worksheetSURTUG.getCell("G26").value = pegawai3.label; // pegawai3 label
        worksheetSURTUG.getCell("G27").value = pegawai3.golongan; // pegawai3 golongan
        worksheetSURTUG.getCell("G28").value = pegawai3.NIP; // pegawai3 NIP
        worksheetSURTUG.getCell("G29").value = pegawai3.jabatan; // pegawai3 jabatan
        worksheetSURTUG.getCell("G38").value = puskesmas.label; // pegawai3 jabatan
        // Format tanggal ke format "DD MMMM YYYY"

        worksheetSURTUG.getCell("G32").value = formattedKeberangkatan; // tanggalKeberangkatan
        worksheetSURTUG.getCell("G12").value = formattedKeberangkatan; // tanggalKeberangkatan
        worksheetSURTUG.getCell("J42").value = formattedKeberangkatan; // tanggalKeberangkatan
        worksheetSURTUG.getCell("G33").value = formattedPulang; // tanggalPulang

        worksheetSURTUG.getCell("G9").value = generateNomorSurat(
          keberangkatan,
          "tugas"
        );

        worksheetSURTUG.getCell("G11").value = generateNomorSurat(
          keberangkatan,
          "nota dinas"
        );

        worksheetNOTADINAS.getCell("F14").value = formattedKeberangkatan;
        worksheetNOTADINAS.getCell("F16").value = generateNomorSurat(
          keberangkatan,
          "nota dinas"
        );

        worksheetNOTADINAS.getCell("F32").value = pegawai1.label;
        worksheetNOTADINAS.getCell("F33").value = pegawai1.NIP;
        worksheetNOTADINAS.getCell("F34").value = pegawai2.label;
        worksheetNOTADINAS.getCell("F35").value = pegawai2.NIP;
        worksheetNOTADINAS.getCell("F36").value = pegawai3.label;
        worksheetNOTADINAS.getCell("F37").value = pegawai3.NIP;
        worksheetNOTADINAS.getCell("F44").value = puskesmas.label;

        worksheetSURTUG.getCell("R16").value = pegawai1.label; // pegawai1 label
        worksheetSURTUG.getCell("R17").value = pegawai1.golongan; // pegawai1 golongan
        worksheetSURTUG.getCell("R18").value = pegawai1.NIP; // pegawai1 NIP
        worksheetSURTUG.getCell("R19").value = pegawai1.jabatan; // pegawai1 jabatan

        worksheetSURTUG.getCell("R21").value = pegawai2.label; // pegawai2 label
        worksheetSURTUG.getCell("R22").value = pegawai2.golongan; // pegawai2 golongan
        worksheetSURTUG.getCell("R23").value = pegawai2.NIP; // pegawai2 NIP
        worksheetSURTUG.getCell("R24").value = pegawai2.jabatan; // pegawai2 jabatan

        worksheetSURTUG.getCell("R26").value = pegawai3.label; // pegawai3 label
        worksheetSURTUG.getCell("R27").value = pegawai3.golongan; // pegawai3 golongan
        worksheetSURTUG.getCell("R28").value = pegawai3.NIP; // pegawai3 NIP
        worksheetSURTUG.getCell("R29").value = pegawai3.jabatan; // pegawai3 jabatan
        worksheetSURTUG.getCell("R38").value = puskesmas.label; // pegawai3 jabatan
        // Format tanggal ke format "DD MMMM YYYY"

        worksheetSURTUG.getCell("R32").value = formattedKeberangkatan; // tanggalKeberangkatan
        worksheetSURTUG.getCell("R12").value = formattedKeberangkatan; // tanggalKeberangkatan
        worksheetSURTUG.getCell("U42").value = formattedKeberangkatan; // tanggalKeberangkatan
        worksheetSURTUG.getCell("R33").value = formattedPulang; // tanggalPulang

        worksheetSURTUG.getCell("R9").value = generateNomorSurat(
          keberangkatan,
          "tugas"
        );

        worksheetSURTUG.getCell("R11").value = generateNomorSurat(
          keberangkatan,
          "nota dinas"
        );

        worksheetNOTADINAS.getCell("R14").value = formattedKeberangkatan;
        worksheetNOTADINAS.getCell("R16").value = generateNomorSurat(
          keberangkatan,
          "nota dinas"
        );

        worksheetNOTADINAS.getCell("R32").value = pegawai1.label;
        worksheetNOTADINAS.getCell("R33").value = pegawai1.NIP;
        worksheetNOTADINAS.getCell("R34").value = pegawai2.label;
        worksheetNOTADINAS.getCell("R35").value = pegawai2.NIP;
        worksheetNOTADINAS.getCell("R36").value = pegawai3.label;
        worksheetNOTADINAS.getCell("R37").value = pegawai3.NIP;
        worksheetNOTADINAS.getCell("R44").value = puskesmas.label;
        worksheetLAP.getCell("F20").value = puskesmas.label;
        worksheetLAP.getCell("F21").value = formattedKeberangkatan;
        worksheetLAP.getCell("R20").value = puskesmas.label;
        worksheetLAP.getCell("R21").value = formattedKeberangkatan;
        worksheetLAP.getCell("H41").value = pegawai1.label;
        worksheetLAP.getCell("H43").value = pegawai2.label;
        worksheetLAP.getCell("H45").value = pegawai3.label;
        worksheetLAP.getCell("T41").value = pegawai1.label;
        worksheetLAP.getCell("T43").value = pegawai2.label;
        worksheetLAP.getCell("T45").value = pegawai3.label;
      }

      worksheetVISUM.getCell("M1").value = generateNomorSurat(
        keberangkatan,
        "SPD"
      );
      worksheetVISUM.getCell("M4").value = formattedKeberangkatan;
      worksheetVISUM.getCell("M5").value = puskesmas.label;
      worksheetVISUM.getCell("D9").value = formattedKeberangkatan;
      worksheetVISUM.getCell("D10").value = puskesmas.label;
      worksheetVISUM.getCell("M11").value = formattedPulang;
      worksheetVISUM.getCell("M9").value = puskesmas.label;
      worksheetVISUM.getCell("G26").value = formattedPulang;

      worksheetVISUM.getCell("Z1").value = generateNomorSurat(
        keberangkatan,
        "SPD"
      );
      worksheetVISUM.getCell("Z4").value = formattedKeberangkatan;
      worksheetVISUM.getCell("Z5").value = puskesmas.label;
      worksheetVISUM.getCell("Q9").value = formattedKeberangkatan;
      worksheetVISUM.getCell("Q10").value = puskesmas.label;
      worksheetVISUM.getCell("Z11").value = formattedPulang;
      worksheetVISUM.getCell("Z9").value = puskesmas.label;
      worksheetVISUM.getCell("T26").value = formattedPulang;

      worksheetVISUM.getCell("AM1").value = generateNomorSurat(
        keberangkatan,
        "SPD"
      );
      worksheetVISUM.getCell("AM4").value = formattedKeberangkatan;
      worksheetVISUM.getCell("AM5").value = puskesmas.label;
      worksheetVISUM.getCell("AD9").value = formattedKeberangkatan;
      worksheetVISUM.getCell("AD10").value = puskesmas.label;
      worksheetVISUM.getCell("AM11").value = formattedPulang;
      worksheetVISUM.getCell("AM9").value = puskesmas.label;
      worksheetVISUM.getCell("AG26").value = formattedPulang;

      worksheetVISUM.getCell("M45").value = generateNomorSurat(
        keberangkatan,
        "SPD"
      );
      worksheetVISUM.getCell("M48").value = formattedKeberangkatan;
      worksheetVISUM.getCell("M49").value = puskesmas.label;
      worksheetVISUM.getCell("D53").value = formattedKeberangkatan;
      worksheetVISUM.getCell("D54").value = puskesmas.label;
      worksheetVISUM.getCell("M53").value = formattedPulang;
      worksheetVISUM.getCell("M55").value = puskesmas.label;
      worksheetVISUM.getCell("G70").value = formattedPulang;

      worksheetVISUM.getCell("Z45").value = generateNomorSurat(
        keberangkatan,
        "SPD"
      );
      worksheetVISUM.getCell("Z48").value = formattedKeberangkatan;
      worksheetVISUM.getCell("Z49").value = puskesmas.label;
      worksheetVISUM.getCell("Q53").value = formattedKeberangkatan;
      worksheetVISUM.getCell("Q54").value = puskesmas.label;
      worksheetVISUM.getCell("Z53").value = formattedPulang;
      worksheetVISUM.getCell("Z55").value = puskesmas.label;
      worksheetVISUM.getCell("T70").value = formattedPulang;

      worksheetVISUM.getCell("AM45").value = generateNomorSurat(
        keberangkatan,
        "SPD"
      );
      worksheetVISUM.getCell("AM48").value = formattedKeberangkatan;
      worksheetVISUM.getCell("AM49").value = puskesmas.label;
      worksheetVISUM.getCell("AD53").value = formattedKeberangkatan;
      worksheetVISUM.getCell("AD54").value = puskesmas.label;
      worksheetVISUM.getCell("AM53").value = formattedPulang;
      worksheetVISUM.getCell("AM55").value = puskesmas.label;
      worksheetVISUM.getCell("AG70").value = formattedPulang;

      // /////////////////////
      worksheetSPD1.getCell("H9").value = generateNomorSurat(
        keberangkatan,
        "SPD"
      );
      worksheetSPD1.getCell("E15").value = pegawai1.label;
      worksheetSPD1.getCell("F16").value = pegawai1.golongan;
      worksheetSPD1.getCell("F17").value = pegawai1.jabatan;
      worksheetSPD1.getCell("E23").value = puskesmas.label;
      worksheetSPD1.getCell("E25").value = formattedKeberangkatan;
      worksheetSPD1.getCell("E26").value = formattedPulang;
      worksheetSPD1.getCell("H34").value = formattedKeberangkatan;

      worksheetSPD1.getCell("S9").value = generateNomorSurat(
        keberangkatan,
        "SPD"
      );
      worksheetSPD1.getCell("P15").value = pegawai1.label;
      worksheetSPD1.getCell("Q16").value = pegawai1.golongan;
      worksheetSPD1.getCell("Q17").value = pegawai1.jabatan;
      worksheetSPD1.getCell("P23").value = puskesmas.label;
      worksheetSPD1.getCell("P25").value = formattedKeberangkatan;
      worksheetSPD1.getCell("P26").value = formattedPulang;
      worksheetSPD1.getCell("S34").value = formattedKeberangkatan;
      // /////////////
      worksheetSPD2.getCell("H9").value = generateNomorSurat(
        keberangkatan,
        "SPD"
      );
      worksheetSPD2.getCell("E15").value = pegawai2.label;
      worksheetSPD2.getCell("F16").value = pegawai2.golongan;
      worksheetSPD2.getCell("F17").value = pegawai2.jabatan;
      worksheetSPD2.getCell("E23").value = puskesmas.label;
      worksheetSPD2.getCell("E25").value = formattedKeberangkatan;
      worksheetSPD2.getCell("E26").value = formattedPulang;
      worksheetSPD2.getCell("H34").value = formattedKeberangkatan;

      worksheetSPD2.getCell("S9").value = generateNomorSurat(
        keberangkatan,
        "SPD"
      );
      worksheetSPD2.getCell("P15").value = pegawai2.label;
      worksheetSPD2.getCell("Q16").value = pegawai2.golongan;
      worksheetSPD2.getCell("Q17").value = pegawai2.jabatan;
      worksheetSPD2.getCell("P23").value = puskesmas.label;
      worksheetSPD2.getCell("P25").value = formattedKeberangkatan;
      worksheetSPD2.getCell("P26").value = formattedPulang;
      worksheetSPD2.getCell("S34").value = formattedKeberangkatan;
      // //////////////////////////
      worksheetSPD3.getCell("H9").value = generateNomorSurat(
        keberangkatan,
        "SPD"
      );
      worksheetSPD3.getCell("E15").value = pegawai3.label;
      worksheetSPD3.getCell("F16").value = pegawai3.golongan;
      worksheetSPD3.getCell("F17").value = pegawai3.jabatan;
      worksheetSPD3.getCell("E23").value = puskesmas.label;
      worksheetSPD3.getCell("E25").value = formattedKeberangkatan;
      worksheetSPD3.getCell("E26").value = formattedPulang;
      worksheetSPD3.getCell("H34").value = formattedKeberangkatan;

      worksheetSPD3.getCell("S9").value = generateNomorSurat(
        keberangkatan,
        "SPD"
      );
      worksheetSPD3.getCell("P15").value = pegawai3.label;
      worksheetSPD3.getCell("Q16").value = pegawai3.golongan;
      worksheetSPD3.getCell("Q17").value = pegawai3.jabatan;
      worksheetSPD3.getCell("P23").value = puskesmas.label;
      worksheetSPD3.getCell("P25").value = formattedKeberangkatan;
      worksheetSPD3.getCell("P26").value = formattedPulang;
      worksheetSPD3.getCell("S34").value = formattedKeberangkatan;

      worksheetLAP.getCell("F6").value = generateNomorSurat(
        keberangkatan,
        "tugas"
      );
      worksheetLAP.getCell("F7").value = formattedKeberangkatan;
      worksheetLAP.getCell("H10").value = pegawai1.label;
      worksheetLAP.getCell("H11").value = pegawai1.NIP;
      worksheetLAP.getCell("H13").value = pegawai2.label;
      worksheetLAP.getCell("H14").value = pegawai2.NIP;
      worksheetLAP.getCell("H16").value = pegawai3.label;
      worksheetLAP.getCell("H17").value = pegawai3.NIP;

      worksheetLAP.getCell("R6").value = generateNomorSurat(
        keberangkatan,
        "tugas"
      );
      worksheetLAP.getCell("R7").value = formattedKeberangkatan;
      worksheetLAP.getCell("T10").value = pegawai1.label;
      worksheetLAP.getCell("T11").value = pegawai1.NIP;
      worksheetLAP.getCell("T13").value = pegawai2.label;
      worksheetLAP.getCell("T14").value = pegawai2.NIP;
      worksheetLAP.getCell("T16").value = pegawai3.label;
      worksheetLAP.getCell("T17").value = pegawai3.NIP;

      // Memasukkan data ke sel tertentu

      // Simpan perubahan ke file baru
      await workbook.xlsx.writeFile(newFilePath);

      // Simpan data ke database
      const nomorSuratTugas = generateNomorSurat(keberangkatan, "tugas");
      const nomorSuratNotaDinas = generateNomorSurat(
        keberangkatan,
        "nota dinas"
      );
      const nomorSuratSPD = generateNomorSurat(keberangkatan, "SPD");

      const sql = `INSERT INTO keberangkatans (nomorSuratTugas, nomorSuratNotaDinas, nomorSuratSPD, keberangkatan, pulang, pegawai1Id, pegawai2Id, pegawai3Id, pegawai4Id, puskesmasId, tipe) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      db.query(
        sql,
        [
          nomorSuratTugas,
          nomorSuratNotaDinas,
          nomorSuratSPD,
          keberangkatan,
          pulang,
          pegawai1.value,
          pegawai2.value,
          pegawai3.value,
          pegawai4.value,
          puskesmas.value,
          tipe,
        ],
        (err, result) => {
          if (err) {
            console.error("Error inserting data to database:", err);
            return res
              .status(500)
              .send("Terjadi kesalahan saat menyimpan data ke database.");
          }
          res
            .status(200)
            .send(
              "Data berhasil ditambahkan ke file Excel dan disimpan ke database."
            );
        }
      );
    } catch (error) {
      console.error("Error handling post request:", error);
      res.status(500).send("Terjadi kesalahan saat menangani permintaan.");
    }
  },
  getAllSurat: (req, res) => {
    const { pegawai, keberangkatan, pulang } = req.query;
    const tipe = req.query.tipe;

    console.log(req.query, "TIPEEEEEEEEEEEE");
    let whereClause = "";

    if (pegawai == "undefined" && tipe == "undefined") {
      if (keberangkatan !== "" && pulang !== "") {
        whereClause = `WHERE keberangkatans.keberangkatan >= '${keberangkatan}' AND keberangkatans.pulang <= '${pulang}'`;
      } else {
        whereClause = "";
      }
    } else if (pegawai !== "undefined" && tipe == "undefined") {
      if (keberangkatan && pulang) {
        whereClause = `WHERE (pegawai1.id = ? OR pegawai2.id = ? OR pegawai3.id = ? OR pegawai4.id = ?) AND keberangkatans.keberangkatan >= '${keberangkatan}' AND keberangkatans.pulang <= '${pulang}'`;
      } else {
        whereClause =
          "WHERE (pegawai1.id = ? OR pegawai2.id = ? OR pegawai3.id = ? OR pegawai4.id = ?)";
      }
    } else if (pegawai !== "undefined" && tipe !== "undefined") {
      if (keberangkatan && pulang) {
        whereClause = `WHERE ((pegawai1.id = ? OR pegawai2.id = ? OR pegawai3.id = ? OR pegawai4.id = ?) AND keberangkatans.tipe = ${tipe}) AND keberangkatans.keberangkatan >= '${keberangkatan}' AND keberangkatans.pulang <= '${pulang}'`;
      } else {
        whereClause = `WHERE ((pegawai1.id = ? OR pegawai2.id = ? OR pegawai3.id = ? OR pegawai4.id = ?) AND keberangkatans.tipe = ${tipe})`;
      }
    } else if (pegawai == "undefined" && tipe !== "undefined") {
      if (keberangkatan && pulang) {
        whereClause = `WHERE (keberangkatans.tipe = '${tipe}') AND keberangkatans.keberangkatan >= '${keberangkatan}' AND keberangkatans.pulang <= '${pulang}'`;
      } else {
        whereClause = `WHERE (keberangkatans.tipe = '${tipe}')`;
      }
    }

    const sql = `SELECT keberangkatans.id, keberangkatans.nomorSuratTugas, keberangkatans.keberangkatan, keberangkatans.pulang, keberangkatans.nomorSuratNotaDinas, keberangkatans.nomorSuratSPD, keberangkatans.tipe, 
    JSON_OBJECT('id', pegawai1.id, 'nama', pegawai1.nama, 'NIP', pegawai1.NIP, 'jabatan', pegawai1.jabatan, 'golongan', pegawai1.golongan) AS pegawai1,
    JSON_OBJECT('id', pegawai2.id, 'nama', pegawai2.nama, 'NIP', pegawai2.NIP, 'jabatan', pegawai2.jabatan, 'golongan', pegawai2.golongan) AS pegawai2,
    JSON_OBJECT('id', pegawai3.id, 'nama', pegawai3.nama, 'NIP', pegawai3.NIP, 'jabatan', pegawai3.jabatan, 'golongan', pegawai3.golongan) AS pegawai3,
    JSON_OBJECT('id', pegawai4.id, 'nama', pegawai4.nama, 'NIP', pegawai4.NIP, 'jabatan', pegawai4.jabatan, 'golongan', pegawai4.golongan) AS pegawai4,
    JSON_OBJECT('id', puskesmas.id, 'nama', puskesmas.nama, 'honorDis', puskesmas.honorDis, 'honorMon', puskesmas.honorMon) AS puskesmasId
    FROM keberangkatans
    LEFT JOIN pegawais AS pegawai1 ON keberangkatans.pegawai1Id = pegawai1.id
    LEFT JOIN pegawais AS pegawai2 ON keberangkatans.pegawai2Id = pegawai2.id
    LEFT JOIN pegawais AS pegawai3 ON keberangkatans.pegawai3Id = pegawai3.id
    LEFT JOIN pegawais AS pegawai4 ON keberangkatans.pegawai4Id = pegawai4.id
    LEFT JOIN puskesmas ON keberangkatans.puskesmasId = puskesmas.id
    ${whereClause}
    ORDER BY keberangkatans.keberangkatan DESC`;

    db.query(sql, [pegawai, pegawai, pegawai, pegawai], (err, result) => {
      if (err) {
        console.error("Error fetching data from database:", err);
        return res
          .status(500)
          .send("Terjadi kesalahan saat mengambil data dari database.");
      }
      res.status(200).json(result);
    });
  },
  deleteSurat: (req, res) => {
    const { id } = req.params; // Mengambil id dari URL

    const sql = `DELETE FROM keberangkatans WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Error deleting data from database:", err);
        return res
          .status(500)
          .send("Terjadi kesalahan saat menghapus data dari database.");
      }
      res.status(200).send("Data berhasil dihapus dari database.");
    });
  },
  printKwitansi: async (req, res) => {
    const calculateDaysDifference = (startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const millisecondsPerDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
      const difference = Math.abs(end - start);
      return Math.round(difference / millisecondsPerDay) + 1; // Adding 1 to include both start and end dates
    };

    function terbilang(angka) {
      const satuan = [
        "",
        "satu",
        "dua",
        "tiga",
        "empat",
        "lima",
        "enam",
        "tujuh",
        "delapan",
        "sembilan",
        "sepuluh",
        "sebelas",
      ];

      if (angka < 12) {
        return satuan[angka];
      } else if (angka < 20) {
        return terbilang(angka - 10) + " belas";
      } else if (angka < 100) {
        return (
          terbilang(Math.floor(angka / 10)) + " puluh " + terbilang(angka % 10)
        );
      } else if (angka < 200) {
        return "seratus " + terbilang(angka - 100);
      } else if (angka < 1000) {
        return (
          terbilang(Math.floor(angka / 100)) +
          " ratus " +
          terbilang(angka % 100)
        );
      } else if (angka < 2000) {
        return "seribu " + terbilang(angka - 1000);
      } else if (angka < 1000000) {
        return (
          terbilang(Math.floor(angka / 1000)) +
          " ribu " +
          terbilang(angka % 1000)
        );
      } else if (angka < 1000000000) {
        return (
          terbilang(Math.floor(angka / 1000000)) +
          " juta " +
          terbilang(angka % 1000000)
        );
      } else if (angka < 1000000000000) {
        return (
          terbilang(Math.floor(angka / 1000000000)) +
          " milyar " +
          terbilang(angka % 1000000000)
        );
      }
    }

    const generateTahun = (tahun) => {
      const date = new Date(tahun);
      const year = date.getFullYear().toString();
      return year;
    };
    const {
      nomorSuratSPD,
      pegawai1Nama,
      pegawai1NIP,
      pegawai2Nama,
      pegawai2NIP,
      pegawai3Nama,
      pegawai4NIP,
      pegawai4Nama,
      pegawai3NIP,
      puskesmas,
      tipe,
      keberangkatan,
      pulang,
    } = req.body;

    console.log(req.body);
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", options);
    };
    try {
      const sourceFilePath = path.join(
        __dirname,
        "..",
        "assets",
        tipe == 1 ? "KWITANSI DIS.xlsx" : "KWITANSI MON.xlsx"
      );
      const daysDifference = calculateDaysDifference(keberangkatan, pulang);
      const downloadPath = app.getPath("downloads");
      const newFileName = `${
        tipe == 1 ? "KWITANSI_DISTRIBUSI" : "KWITANSI_MONITORING"
      }${Date.now()}.xlsx`;
      const newFilePath = path.join(downloadPath, newFileName);
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(sourceFilePath);

      const worksheetRINCIANBPD = workbook.getWorksheet("RINCIAN BPD");
      const worksheetRINCIANBPD2 = workbook.getWorksheet("RINCIAN BPD (2)");
      const worksheetRINCIANBPD3 = workbook.getWorksheet("RINCIAN BPD (3)");
      const worksheetKWIT = workbook.getWorksheet("KWIT GLOBAL");
      const worksheetKWIT2 = workbook.getWorksheet("KWIT GLOBAL (2)");
      const worksheetKWIT3 = workbook.getWorksheet("KWIT GLOBAL (3)");

      const honor = tipe == 1 ? puskesmas.honorDis : puskesmas.honorMon;
      const totalHonor = honor * daysDifference;
      if (tipe == 2) {
        const worksheetRINCIANBPD4 = workbook.getWorksheet("RINCIAN BPD (4)");
        const worksheetKWIT4 = workbook.getWorksheet("KWIT GLOBAL (4)");
        worksheetRINCIANBPD4.getCell("G11").value = honor;
        worksheetRINCIANBPD4.getCell("D11").value = daysDifference;
        worksheetRINCIANBPD4.getCell("I11").value = totalHonor;
        worksheetRINCIANBPD4.getCell("I16").value = totalHonor;
        worksheetRINCIANBPD4.getCell("B21").value = totalHonor;
        worksheetRINCIANBPD4.getCell("I21").value = totalHonor;
        worksheetRINCIANBPD4.getCell("F6").value = formatDate(keberangkatan);
        worksheetRINCIANBPD4.getCell("F5").value = nomorSuratSPD;
        worksheetRINCIANBPD4.getCell("I27").value = pegawai4Nama;
        worksheetRINCIANBPD4.getCell("I28").value = pegawai4NIP;
        worksheetRINCIANBPD4.getCell("H31").value = totalHonor;
        worksheetRINCIANBPD4.getCell("H33").value = totalHonor;
        worksheetRINCIANBPD4.getCell("D17").value = `${terbilang(
          totalHonor
        )} Rupiah`;

        worksheetRINCIANBPD4.getCell("S11").value = honor;
        worksheetRINCIANBPD4.getCell("P11").value = daysDifference;
        worksheetRINCIANBPD4.getCell("U11").value = totalHonor;
        worksheetRINCIANBPD4.getCell("U16").value = totalHonor;
        worksheetRINCIANBPD4.getCell("N21").value = totalHonor;
        worksheetRINCIANBPD4.getCell("I21").value = totalHonor;
        worksheetRINCIANBPD4.getCell("R6").value = formatDate(keberangkatan);
        worksheetRINCIANBPD4.getCell("R5").value = nomorSuratSPD;
        worksheetRINCIANBPD4.getCell("U27").value = pegawai4Nama;
        worksheetRINCIANBPD4.getCell("U28").value = pegawai4NIP;
        worksheetRINCIANBPD4.getCell("T31").value = totalHonor;
        worksheetRINCIANBPD4.getCell("T33").value = totalHonor;
        worksheetRINCIANBPD4.getCell("P17").value = `${terbilang(
          totalHonor
        )} Rupiah`;

        worksheetKWIT4.getCell("D13").value = `${terbilang(totalHonor)} Rupiah`;
        worksheetKWIT4.getCell("D11").value = honor;
        worksheetKWIT4.getCell("G28").value = pegawai4Nama;
        worksheetKWIT4.getCell("G29").value = pegawai4NIP;
        worksheetKWIT4.getCell("I2").value = generateTahun(keberangkatan);

        worksheetKWIT4.getCell(
          "D17"
        ).value = `Pembayaran Perjalanan dinas Dalam Kota, Dalam Rangka Distribusi Obat Ke ${puskesmas.nama}. Sub Kegiatan Distribusi Alat Kesehatan, Obat, Bahan Habis Pakai, Bahan Medis Habis Pakai, Vaksin, Makanan, Minuman ke fasilitas Kesehatan, pada UPTD Perbekalan Obat dan Alkes Kab.Paser. Sesuai Surat Tugas dan SPPD Terlampir.`;

        worksheetKWIT4.getCell("Q13").value = `${terbilang(totalHonor)} Rupiah`;
        worksheetKWIT4.getCell("Q11").value = honor;
        worksheetKWIT4.getCell("T28").value = pegawai4Nama;
        worksheetKWIT4.getCell("T29").value = pegawai4NIP;
        worksheetKWIT4.getCell("V2").value = generateTahun(keberangkatan);

        worksheetKWIT4.getCell(
          "Q17"
        ).value = `Pembayaran Perjalanan dinas Dalam Kota, Dalam Rangka Distribusi Obat Ke ${puskesmas.nama}. Sub Kegiatan Distribusi Alat Kesehatan, Obat, Bahan Habis Pakai, Bahan Medis Habis Pakai, Vaksin, Makanan, Minuman ke fasilitas Kesehatan, pada UPTD Perbekalan Obat dan Alkes Kab.Paser. Sesuai Surat Tugas dan SPPD Terlampir.`;
      }

      worksheetRINCIANBPD.getCell("G11").value = honor;
      worksheetRINCIANBPD.getCell("D11").value = daysDifference;
      worksheetRINCIANBPD.getCell("I11").value = totalHonor;
      worksheetRINCIANBPD.getCell("I16").value = totalHonor;
      worksheetRINCIANBPD.getCell("B21").value = totalHonor;
      worksheetRINCIANBPD.getCell("I21").value = totalHonor;
      worksheetRINCIANBPD.getCell("F6").value = formatDate(keberangkatan);
      worksheetRINCIANBPD.getCell("F5").value = nomorSuratSPD;
      worksheetRINCIANBPD.getCell("I27").value = pegawai1Nama;
      worksheetRINCIANBPD.getCell("I28").value = pegawai1NIP;
      worksheetRINCIANBPD.getCell("H31").value = totalHonor;
      worksheetRINCIANBPD.getCell("H33").value = totalHonor;
      worksheetRINCIANBPD.getCell("D17").value = `${terbilang(
        totalHonor
      )} Rupiah`;

      worksheetRINCIANBPD.getCell("S11").value = honor;
      worksheetRINCIANBPD.getCell("P11").value = daysDifference;
      worksheetRINCIANBPD.getCell("U11").value = totalHonor;
      worksheetRINCIANBPD.getCell("U16").value = totalHonor;
      worksheetRINCIANBPD.getCell("N21").value = totalHonor;
      worksheetRINCIANBPD.getCell("I21").value = totalHonor;
      worksheetRINCIANBPD.getCell("R6").value = formatDate(keberangkatan);
      worksheetRINCIANBPD.getCell("R5").value = nomorSuratSPD;
      worksheetRINCIANBPD.getCell("U27").value = pegawai1Nama;
      worksheetRINCIANBPD.getCell("U28").value = pegawai1NIP;
      worksheetRINCIANBPD.getCell("T31").value = totalHonor;
      worksheetRINCIANBPD.getCell("T33").value = totalHonor;
      worksheetRINCIANBPD.getCell("P17").value = `${terbilang(
        totalHonor
      )} Rupiah`;
      // /////////////////////////////////////////////

      worksheetRINCIANBPD2.getCell("G11").value = honor;
      worksheetRINCIANBPD2.getCell("D11").value = daysDifference;
      worksheetRINCIANBPD2.getCell("I11").value = totalHonor;
      worksheetRINCIANBPD2.getCell("I16").value = totalHonor;
      worksheetRINCIANBPD2.getCell("B21").value = totalHonor;
      worksheetRINCIANBPD2.getCell("I21").value = totalHonor;
      worksheetRINCIANBPD2.getCell("F6").value = formatDate(keberangkatan);
      worksheetRINCIANBPD2.getCell("F5").value = nomorSuratSPD;
      worksheetRINCIANBPD2.getCell("I27").value = pegawai2Nama;
      worksheetRINCIANBPD2.getCell("I28").value = pegawai2NIP;
      worksheetRINCIANBPD2.getCell("H31").value = totalHonor;
      worksheetRINCIANBPD2.getCell("H33").value = totalHonor;
      worksheetRINCIANBPD2.getCell("D17").value = `${terbilang(
        totalHonor
      )} Rupiah`;

      worksheetRINCIANBPD2.getCell("S11").value = honor;
      worksheetRINCIANBPD2.getCell("P11").value = daysDifference;
      worksheetRINCIANBPD2.getCell("U11").value = totalHonor;
      worksheetRINCIANBPD2.getCell("U16").value = totalHonor;
      worksheetRINCIANBPD2.getCell("N21").value = totalHonor;
      worksheetRINCIANBPD2.getCell("I21").value = totalHonor;
      worksheetRINCIANBPD2.getCell("R6").value = formatDate(keberangkatan);
      worksheetRINCIANBPD2.getCell("R5").value = nomorSuratSPD;
      worksheetRINCIANBPD2.getCell("U27").value = pegawai2Nama;
      worksheetRINCIANBPD2.getCell("U28").value = pegawai2NIP;
      worksheetRINCIANBPD2.getCell("T31").value = totalHonor;
      worksheetRINCIANBPD2.getCell("T33").value = totalHonor;
      worksheetRINCIANBPD2.getCell("P17").value = `${terbilang(
        totalHonor
      )} Rupiah`;
      // ///////////////////////////////////////////

      worksheetRINCIANBPD3.getCell("G11").value = honor;
      worksheetRINCIANBPD3.getCell("D11").value = daysDifference;
      worksheetRINCIANBPD3.getCell("I11").value = totalHonor;
      worksheetRINCIANBPD3.getCell("I16").value = totalHonor;
      worksheetRINCIANBPD3.getCell("B21").value = totalHonor;
      worksheetRINCIANBPD3.getCell("I21").value = totalHonor;
      worksheetRINCIANBPD3.getCell("F6").value = formatDate(keberangkatan);
      worksheetRINCIANBPD3.getCell("F5").value = nomorSuratSPD;
      worksheetRINCIANBPD3.getCell("I27").value = pegawai3Nama;
      worksheetRINCIANBPD3.getCell("I28").value = pegawai3NIP;
      worksheetRINCIANBPD3.getCell("H31").value = totalHonor;
      worksheetRINCIANBPD3.getCell("H33").value = totalHonor;
      worksheetRINCIANBPD3.getCell("D17").value = `${terbilang(
        totalHonor
      )} Rupiah`;

      worksheetRINCIANBPD3.getCell("S11").value = honor;
      worksheetRINCIANBPD3.getCell("P11").value = daysDifference;
      worksheetRINCIANBPD3.getCell("U11").value = totalHonor;
      worksheetRINCIANBPD3.getCell("U16").value = totalHonor;
      worksheetRINCIANBPD3.getCell("N21").value = totalHonor;
      worksheetRINCIANBPD3.getCell("I21").value = totalHonor;
      worksheetRINCIANBPD3.getCell("R6").value = formatDate(keberangkatan);
      worksheetRINCIANBPD3.getCell("R5").value = nomorSuratSPD;
      worksheetRINCIANBPD3.getCell("U27").value = pegawai3Nama;
      worksheetRINCIANBPD3.getCell("U28").value = pegawai3NIP;
      worksheetRINCIANBPD3.getCell("T31").value = totalHonor;
      worksheetRINCIANBPD3.getCell("T33").value = totalHonor;
      worksheetRINCIANBPD3.getCell("P17").value = `${terbilang(
        totalHonor
      )} Rupiah`;
      ////////////////////////////////
      worksheetKWIT.getCell("D13").value = `${terbilang(totalHonor)} Rupiah`;
      worksheetKWIT.getCell("D11").value = honor;
      worksheetKWIT.getCell("G28").value = pegawai1Nama;
      worksheetKWIT.getCell("G29").value = pegawai1NIP;
      worksheetKWIT.getCell("I2").value = generateTahun(keberangkatan);

      worksheetKWIT.getCell(
        "D17"
      ).value = `Pembayaran Perjalanan dinas Dalam Kota, Dalam Rangka Distribusi Obat Ke ${puskesmas.nama}. Sub Kegiatan Distribusi Alat Kesehatan, Obat, Bahan Habis Pakai, Bahan Medis Habis Pakai, Vaksin, Makanan, Minuman ke fasilitas Kesehatan, pada UPTD Perbekalan Obat dan Alkes Kab.Paser. Sesuai Surat Tugas dan SPPD Terlampir.`;

      worksheetKWIT.getCell("Q13").value = `${terbilang(totalHonor)} Rupiah`;
      worksheetKWIT.getCell("Q11").value = honor;
      worksheetKWIT.getCell("T28").value = pegawai1Nama;
      worksheetKWIT.getCell("T29").value = pegawai1NIP;
      worksheetKWIT.getCell("V2").value = generateTahun(keberangkatan);

      worksheetKWIT.getCell(
        "Q17"
      ).value = `Pembayaran Perjalanan dinas Dalam Kota, Dalam Rangka Distribusi Obat Ke ${puskesmas.nama}. Sub Kegiatan Distribusi Alat Kesehatan, Obat, Bahan Habis Pakai, Bahan Medis Habis Pakai, Vaksin, Makanan, Minuman ke fasilitas Kesehatan, pada UPTD Perbekalan Obat dan Alkes Kab.Paser. Sesuai Surat Tugas dan SPPD Terlampir.`;
      //  ////////////////////
      worksheetKWIT2.getCell("D13").value = `${terbilang(totalHonor)} Rupiah`;
      worksheetKWIT2.getCell("D11").value = honor;
      worksheetKWIT2.getCell("G28").value = pegawai2Nama;
      worksheetKWIT2.getCell("G29").value = pegawai2NIP;
      worksheetKWIT2.getCell("I2").value = generateTahun(keberangkatan);

      worksheetKWIT2.getCell(
        "D17"
      ).value = `Pembayaran Perjalanan dinas Dalam Kota, Dalam Rangka Distribusi Obat Ke ${puskesmas.nama}. Sub Kegiatan Distribusi Alat Kesehatan, Obat, Bahan Habis Pakai, Bahan Medis Habis Pakai, Vaksin, Makanan, Minuman ke fasilitas Kesehatan, pada UPTD Perbekalan Obat dan Alkes Kab.Paser. Sesuai Surat Tugas dan SPPD Terlampir.`;

      worksheetKWIT2.getCell("Q13").value = `${terbilang(totalHonor)} Rupiah`;
      worksheetKWIT2.getCell("Q11").value = honor;
      worksheetKWIT2.getCell("T28").value = pegawai2Nama;
      worksheetKWIT2.getCell("T29").value = pegawai2NIP;
      worksheetKWIT2.getCell("V2").value = generateTahun(keberangkatan);

      worksheetKWIT2.getCell(
        "Q17"
      ).value = `Pembayaran Perjalanan dinas Dalam Kota, Dalam Rangka Distribusi Obat Ke ${puskesmas.nama}. Sub Kegiatan Distribusi Alat Kesehatan, Obat, Bahan Habis Pakai, Bahan Medis Habis Pakai, Vaksin, Makanan, Minuman ke fasilitas Kesehatan, pada UPTD Perbekalan Obat dan Alkes Kab.Paser. Sesuai Surat Tugas dan SPPD Terlampir.`;
      // //////////////////////

      worksheetKWIT3.getCell("D13").value = `${terbilang(totalHonor)} Rupiah`;
      worksheetKWIT3.getCell("D11").value = honor;
      worksheetKWIT3.getCell("G28").value = pegawai3Nama;
      worksheetKWIT3.getCell("G29").value = pegawai3NIP;
      worksheetKWIT3.getCell("I2").value = generateTahun(keberangkatan);

      worksheetKWIT3.getCell(
        "D17"
      ).value = `Pembayaran Perjalanan dinas Dalam Kota, Dalam Rangka Distribusi Obat Ke ${puskesmas.nama}. Sub Kegiatan Distribusi Alat Kesehatan, Obat, Bahan Habis Pakai, Bahan Medis Habis Pakai, Vaksin, Makanan, Minuman ke fasilitas Kesehatan, pada UPTD Perbekalan Obat dan Alkes Kab.Paser. Sesuai Surat Tugas dan SPPD Terlampir.`;

      worksheetKWIT3.getCell("Q13").value = `${terbilang(totalHonor)} Rupiah`;
      worksheetKWIT3.getCell("Q11").value = honor;
      worksheetKWIT3.getCell("T28").value = pegawai3Nama;
      worksheetKWIT3.getCell("T29").value = pegawai3NIP;
      worksheetKWIT3.getCell("V2").value = generateTahun(keberangkatan);

      worksheetKWIT3.getCell(
        "Q17"
      ).value = `Pembayaran Perjalanan dinas Dalam Kota, Dalam Rangka Distribusi Obat Ke ${puskesmas.nama}. Sub Kegiatan Distribusi Alat Kesehatan, Obat, Bahan Habis Pakai, Bahan Medis Habis Pakai, Vaksin, Makanan, Minuman ke fasilitas Kesehatan, pada UPTD Perbekalan Obat dan Alkes Kab.Paser. Sesuai Surat Tugas dan SPPD Terlampir.`;

      // Simpan perubahan ke file baru
      await workbook.xlsx.writeFile(newFilePath);
      return res.status(200).send("Data berhasil di cetak");
    } catch (error) {
      console.error("Error handling post request:", error);
      res.status(500).send("Terjadi kesalahan saat menangani permintaan.");
    }
  },

  editNomorSurat: async (req, res) => {
    console.log(req.body, `editSURATTTTTTTTTTTT`);
    const { nomorSuratTugas, nomorSuratNotaDinas, nomorSuratSPD, id } =
      req.body;
    const sql = `UPDATE keberangkatans SET nomorSuratNotaDinas = ?, nomorSuratSPD = ?, nomorSuratTugas = ? WHERE id = ?`;
    db.query(
      sql,
      [nomorSuratNotaDinas, nomorSuratSPD, nomorSuratTugas, id],
      (err, result) => {
        if (err) {
          console.error("Error updating data in database:", err);
          return res
            .status(500)
            .send("Terjadi kesalahan saat mengupdate data di database.");
        }
        res.status(200).send("Data berhasil diupdate di database.");
      }
    );
  },

  editTujuan: (req, res) => {
    const { puskesmasId, id } = req.body;
    console.log(req.body);

    const sql = `UPDATE keberangkatans SET puskesmasId = ? WHERE id = ?`;

    db.query(sql, [puskesmasId, id], (err, result) => {
      if (err) {
        console.error("Error mengganti puskesmas");
        return res
          .status(500)
          .send("terjadi kesalahan saat merubah data di database");
      }
      res.status(200).send("Data berhasil diupdate di database");
    });
  },
};
