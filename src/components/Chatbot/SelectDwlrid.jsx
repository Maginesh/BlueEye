import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { GlobalContext } from '../../GlobalContext';

const options = {
  goa: {
      NorthGoa: {
        Bardez: ['dwlr_ga_001','dwlr_ga_002','dwlr_ga_003','dwlr_ga_004','dwlr_ga_005','dwlr_ga_006','dwlr_ga_007','dwlr_ga_008','dwlr_ga_009','dwlr_ga_010','dwlr_ga_011','dwlr_ga_012'],
        Bicholim: ['dwlr_ga_013','dwlr_ga_014','dwlr_ga_015','dwlr_ga_016','dwlr_ga_017','dwlr_ga_018','dwlr_ga_019'],
        Pernem: ['dwlr_ga_020','dwlr_ga_021','dwlr_ga_022','dwlr_ga_023','dwlr_ga_024','dwlr_ga_025','dwlr_ga_026','dwlr_ga_027','dwlr_ga_028'],
        Ponda: ['dwlr_ga_029','dwlr_ga_030','dwlr_ga_031','dwlr_ga_032','dwlr_ga_033'],
        Sattari: ['dwlr_ga_034','dwlr_ga_035','dwlr_ga_036','dwlr_ga_037','dwlr_ga_038','dwlr_ga_039','dwlr_ga_040','dwlr_ga_041','dwlr_ga_042','dwlr_ga_043'],
        Tiswadi: ['dwlr_ga_044','dwlr_ga_045','dwlr_ga_046'],
    },
    SouthGoa: {
        Canacona: ['dwlr_ga_47','dwlr_ga_048','dwlr_ga_049','dwlr_ga_050','dwlr_ga_051','dwlr_ga_052','dwlr_ga_053','dwlr_ga_054'],
        Margao: ['dwlr_ga_055','dwlr_ga_056','dwlr_ga_057','dwlr_ga_058','dwlr_ga_059','dwlr_ga_060'],
        Sanguem: ['dwlr_ga_061','dwlr_ga_062','dwlr_ga_063','dwlr_ga_064','dwlr_ga_065','dwlr_ga_066','dwlr_ga_067'],
        Quepem: ['dwlr_ga_068','dwlr_ga_069','dwlr_ga_070','dwlr_ga_071','dwlr_ga_072']
      }
  },
  arunachal: {
      Changlang: {
          ManmaoJairampurCircle: ["dwlr_ar_001"],
          MiaoCircle: ["dwlr_ar_002","dwlr_ar_003","dwlr_ar_004"]
      },
      EastSiang: {
          Pasighat: [
          "dwlr_ar_005",
          "dwlr_ar_006"
          ],
          Ruksin: [
          "dwlr_ar_007",
          "dwlr_ar_008",
          "dwlr_ar_009"
          ]
      },
      Lohit: {
          NamsaiCircle: [
          "dwlr_ar_010"
          ]
      },
      LowerDibangValley: {
          Roing: [
          "dwlr_ar_011"
          ]
      },
      LowerSubansiri: {
          "Tamen-Raga": [
          "dwlr_ar_012",
          "dwlr_ar_013"
          ]
      },
      Papumpare: {
          Balijan: [
          "dwlr_ar_014",
          "dwlr_ar_015",
          "dwlr_ar_016"
          ],
          Doimukh: [
          "dwlr_ar_017",
          "dwlr_ar_018",
          "dwlr_ar_019",
          "dwlr_ar_020",
          "dwlr_ar_021",
          "dwlr_ar_022"
          ],
          Kimin: [
          "dwlr_ar_023"
          ]
      },
      Tirap: {
          DeomaliCircle: [
          "dwlr_ar_024"
          ],
          KhonsaCircle: [
          "dwlr_ar_025",
          "dwlr_ar_026"
          ]
      }
  },
  west_bengal: {
      Alipurduar: {
          AlipurduarI: [
          "dwlr_wb_001",
          "dwlr_wb_002"
          ],
          AlipurduarIi: [
          "dwlr_wb_003",
          "dwlr_wb_004"
          ],
          Falakata: [
          "dwlr_wb_005",
          "dwlr_wb_006",
          "dwlr_wb_007"
          ],
          Kalchini: [
          "dwlr_wb_008",
          "dwlr_wb_009",
          "dwlr_wb_010",
          "dwlr_wb_011",
          "dwlr_wb_012"
          ],
          Kumargram: [
          "dwlr_wb_013",
          "dwlr_wb_014",
          "dwlr_wb_015",
          "dwlr_wb_016",
          "dwlr_wb_017",
          "dwlr_wb_018",
          "dwlr_wb_019",
          "dwlr_wb_020"
          ],
          Madarihat: [
          "dwlr_wb_021",
          "dwlr_wb_022",
          "dwlr_wb_023"
          ]
      },
      Bankura: {
          BankuraI: [
          "dwlr_wb_024",
          "dwlr_wb_025",
          "dwlr_wb_026",
          "dwlr_wb_027"
          ],
          BankuraIi: [
          "dwlr_wb_028",
          "dwlr_wb_029",
          "dwlr_wb_030",
          "dwlr_wb_031",
          "dwlr_wb_032",
          "dwlr_wb_033",
          "dwlr_wb_034"
          ],
          Barjora: [
          "dwlr_wb_035",
          "dwlr_wb_036",
          "dwlr_wb_037",
          "dwlr_wb_038",
          "dwlr_wb_039"
          ],
          Bishnupur: [
          "dwlr_wb_040",
          "dwlr_wb_041",
          "dwlr_wb_042",
          "dwlr_wb_043",
          "dwlr_wb_044",
          "dwlr_wb_045",
          "dwlr_wb_046",
          "dwlr_wb_047",
          "dwlr_wb_048",
          "dwlr_wb_049",
          "dwlr_wb_050",
          "dwlr_wb_051",
          "dwlr_wb_052",
          "dwlr_wb_053",
          "dwlr_wb_054"
          ],
          RaipurI: [
          "dwlr_wb_055"
          ],
          RaipurIi: [
          "dwlr_wb_056",
          "dwlr_wb_057"
          ],
          Ranibandh: [
          "dwlr_wb_058",
          "dwlr_wb_059",
          "dwlr_wb_060",
          "dwlr_wb_061",
          "dwlr_wb_062",
          "dwlr_wb_063"
          ],
          Saltora: [
          "dwlr_wb_064",
          "dwlr_wb_065",
          "dwlr_wb_066",
          "dwlr_wb_067",
          "dwlr_wb_068",
          "dwlr_wb_069",
          "dwlr_wb_070"
          ],
          Simlapal: [
          "dwlr_wb_071",
          "dwlr_wb_072"
          ],
          Simlipal: [
          "dwlr_wb_073"
          ],
          Sonamukhi: [
          "dwlr_wb_074",
          "dwlr_wb_075",
          "dwlr_wb_076",
          "dwlr_wb_077",
          "dwlr_wb_078",
          "dwlr_wb_079",
          "dwlr_wb_080",
          "dwlr_wb_081"
          ],
          Taldanga: [
          "dwlr_wb_082",
          "dwlr_wb_083",
          "dwlr_wb_084",
          "dwlr_wb_085"
          ],
          Taldangra: [
          "dwlr_wb_086",
          "dwlr_wb_087",
          "dwlr_wb_088"
          ]
      },
      Birbhum: {
          Bolpur: [
          "dwlr_wb_089",
          "dwlr_wb_090",
          "dwlr_wb_091",
          "dwlr_wb_092",
          "dwlr_wb_093",
          "dwlr_wb_094",
          "dwlr_wb_095",
          "dwlr_wb_096",
          "dwlr_wb_097",
          "dwlr_wb_098",
          "dwlr_wb_099",
          "dwlr_wb_100",
          "dwlr_wb_101",
          "dwlr_wb_102",
          "dwlr_wb_103"
          ],
          Dubrajpur: [
          "dwlr_wb_104",
          "dwlr_wb_105",
          "dwlr_wb_106",
          "dwlr_wb_107",
          "dwlr_wb_108",
          "dwlr_wb_109",
          "dwlr_wb_110",
          "dwlr_wb_111",
          "dwlr_wb_112",
          "dwlr_wb_113"
          ],
          Nalhati: [
          "dwlr_wb_114",
          "dwlr_wb_115",
          "dwlr_wb_116",
          "dwlr_wb_117"
          ],
          Rajnagar: [
          "dwlr_wb_118",
          "dwlr_wb_119",
          "dwlr_wb_120"
          ],
          Rampurhat: [
          "dwlr_wb_121",
          "dwlr_wb_122",
          "dwlr_wb_123"
          ],
          RampurhatI: [
          "dwlr_wb_124",
          "dwlr_wb_125",
          "dwlr_wb_126",
          "dwlr_wb_127",
          "dwlr_wb_128",
          "dwlr_wb_129",
          "dwlr_wb_130"
          ],
          Sainthia: [
          "dwlr_wb_131",
          "dwlr_wb_132"
          ],
          SiuriI: [
          "dwlr_wb_133"
          ],
          Sriniketan: [
          "dwlr_wb_134",
          "dwlr_wb_135",
          "dwlr_wb_136"
          ],
          SuriIi: [
          "dwlr_wb_137",
          "dwlr_wb_142",
          "dwlr_wb_143",
          "dwlr_wb_144",
          "dwlr_wb_145",
          "dwlr_wb_146",
          "dwlr_wb_147"
          ],
          SuriI: [
          "dwlr_wb_138",
          "dwlr_wb_139",
          "dwlr_wb_140",
          "dwlr_wb_141"
          ]
      },
      CoochBihar: {
          Sitai: [
          "dwlr_wb_148"
          ]
      },
      DakshinDinajpur: {
          Balurghat: [
          "dwlr_wb_149"
          ],
          Bansihari: [
          "dwlr_wb_150"
          ],
          Gangarampur: [
          "dwlr_wb_151"
          ],
          Harirampur: [
          "dwlr_wb_152"
          ],
          Hili: [
          "dwlr_wb_153",
          "dwlr_wb_154"
          ],
          Kumarganj: [
          "dwlr_wb_155"
          ],
          Tapan: [
          "dwlr_wb_156",
          "dwlr_wb_157",
          "dwlr_wb_158",
          "dwlr_wb_159",
          "dwlr_wb_160",
          "dwlr_wb_161"
          ]
      },
      Darjeeling: {
          Kharibari: [
          "dwlr_wb_162",
          "dwlr_wb_163",
          "dwlr_wb_164",
          "dwlr_wb_165",
          "dwlr_wb_166",
          "dwlr_wb_167",
          "dwlr_wb_168",
          "dwlr_wb_169",
          "dwlr_wb_170",
          "dwlr_wb_171"
          ]
      },
      Hugli: {
          Balagarh: [
          "dwlr_wb_172",
          "dwlr_wb_173"
          ],
          Chinsura: [
          "dwlr_wb_174"
          ],
          Chuchura: [
          "dwlr_wb_175"
          ],
          Haripal: [
          "dwlr_wb_176"
          ],
          Jirat: [
          "dwlr_wb_177"
          ],
          Magra: [
          "dwlr_wb_178"
          ],
          Pandua: [
          "dwlr_wb_179",
          "dwlr_wb_180",
          "dwlr_wb_181"
          ],
          Polba: [
          "dwlr_wb_182",
          "dwlr_wb_183",
          "dwlr_wb_184"
          ],
          Sherpur: [
          "dwlr_wb_185"
          ],
          Srirampur: [
          "dwlr_wb_186",
          "dwlr_wb_187"
          ],
          Tarakeswar: [
          "dwlr_wb_188"
          ]
      },
      Jalpaiguri: {
          Dhupguri: [
          "dwlr_wb_189",
          "dwlr_wb_190",
          "dwlr_wb_191",
          "dwlr_wb_192",
          "dwlr_wb_193",
          "dwlr_wb_194",
          "dwlr_wb_195"
          ],
          Jalpaiguri: [
          "dwlr_wb_196",
          "dwlr_wb_197",
          "dwlr_wb_198",
          "dwlr_wb_199",
          "dwlr_wb_200",
          "dwlr_wb_201",
          "dwlr_wb_202",
          "dwlr_wb_203",
          "dwlr_wb_204",
          "dwlr_wb_205"
          ],
          Mal: [
          "dwlr_wb_206",
          "dwlr_wb_207",
          "dwlr_wb_208",
          "dwlr_wb_209"
          ],
          Malbazar: [
          "dwlr_wb_210",
          "dwlr_wb_211"
          ],
          Mangalghat: [
          "dwlr_wb_212"
          ],
          Matiali: [
          "dwlr_wb_213",
          "dwlr_wb_214",
          "dwlr_wb_215"
          ],
          Maynaguri: [
          "dwlr_wb_216",
          "dwlr_wb_217",
          "dwlr_wb_218",
          "dwlr_wb_219",
          "dwlr_wb_220"
          ],
          Moynaguri: [
          "dwlr_wb_221",
          "dwlr_wb_222",
          "dwlr_wb_223"
          ],
          Nagrakata: [
          "dwlr_wb_224"
          ]
      },
      Kochbehar: {
          MathabhangaI: [
          "dwlr_wb_225",
          "dwlr_wb_226"
          ],
          MathabhangaIi: [
          "dwlr_wb_227"
          ],
          Mekhliganj: [
          "dwlr_wb_228",
          "dwlr_wb_229",
          "dwlr_wb_230",
          "dwlr_wb_231",
          "dwlr_wb_232"
          ],
          Sahebgan: [
          "dwlr_wb_233"
          ],
          Sitai: [
          "dwlr_wb_234"
          ],
          Sitalkuchi: [
          "dwlr_wb_235",
          "dwlr_wb_236"
          ],
          Tufanganj: [
          "dwlr_wb_237",
          "dwlr_wb_238",
          "dwlr_wb_239"
          ],
          TufanganjIi: [
          "dwlr_wb_240",
          "dwlr_wb_241",
          "dwlr_wb_242"
          ]
      },
      Malda: {
          Bamangola: [
          "dwlr_wb_243",
          "dwlr_wb_244",
          "dwlr_wb_245"
          ],
          Bamongola: [
          "dwlr_wb_246",
          "dwlr_wb_247",
          "dwlr_wb_248"
          ],
          EnglishBazar: [
          "dwlr_wb_249",
          "dwlr_wb_250",
          "dwlr_wb_251",
          "dwlr_wb_252"
          ],
          Gazole: [
          "dwlr_wb_253",
          "dwlr_wb_254",
          "dwlr_wb_255",
          "dwlr_wb_256",
          "dwlr_wb_257",
          "dwlr_wb_258",
          "dwlr_wb_259",
          "dwlr_wb_260"
          ],
          Gazol: [
          "dwlr_wb_261"
          ],
          Habibpur: [
          "dwlr_wb_262",
          "dwlr_wb_263"
          ],
          KaliachakI: [
          "dwlr_wb_264",
          "dwlr_wb_265"
          ],
          KaliachakIii: [
          "dwlr_wb_266"
          ],
          Malda: [
          "dwlr_wb_267"
          ],
          Manikchak: [
          "dwlr_wb_268",
          "dwlr_wb_269",
          "dwlr_wb_270"
          ],
          OldMalda: [
          "dwlr_wb_271"
          ],
          RatuaI: [
          "dwlr_wb_272",
          "dwlr_wb_273",
          "dwlr_wb_274"
          ]
      },
      Murshidabad: {
          BeldangaI: [
          "dwlr_wb_275",
          "dwlr_wb_277"
          ],
          Beldangai: [
          "dwlr_wb_276"
          ],
          Domkal: [
          "dwlr_wb_278",
          "dwlr_wb_279",
          "dwlr_wb_280"
          ],
          KarimpurI: [
          "dwlr_wb_281",
          "dwlr_wb_282"
          ],
          KarimpurII: [
          "dwlr_wb_283",
          "dwlr_wb_284"
          ],
          Krishnanagar: [
          "dwlr_wb_285"
          ]
      },
      Howrah: {
          Deulia: [
          "dwlr_wb_286"
          ],
          Narayanpur: [
          "dwlr_wb_287"
          ],
          Shibpur: [
          "dwlr_wb_288"
          ],
          Shyampur: [
          "dwlr_wb_289"
          ]
      },
      "P05-12-2024  20:05:00chim Barddhaman": {
          "05-12-2024  20:05:00ansol": [
          "dwlr_wb_290"
          ],
          Barabani: [
          "dwlr_wb_291"
          ],
          Baraboni: [
          "dwlr_wb_292",
          "dwlr_wb_293"
          ],
          Durgapur: [
          "dwlr_wb_294",
          "dwlr_wb_295",
          "dwlr_wb_296",
          "dwlr_wb_297",
          "dwlr_wb_298",
          "dwlr_wb_299"
          ],
          Hirapur: [
          "dwlr_wb_300"
          ],
          Jamuria: [
          "dwlr_wb_301"
          ],
          JamuriaI: [
          "dwlr_wb_302",
          "dwlr_wb_303",
          "dwlr_wb_304"
          ],
          JamuriaIi: [
          "dwlr_wb_305",
          "dwlr_wb_306",
          "dwlr_wb_307",
          "dwlr_wb_308",
          "dwlr_wb_309"
          ],
          Kanksa: [
          "dwlr_wb_310",
          "dwlr_wb_311",
          "dwlr_wb_312",
          "dwlr_wb_313",
          "dwlr_wb_314",
          "dwlr_wb_315",
          "dwlr_wb_316"
          ],
          Kanska: [
          "dwlr_wb_317"
          ],
          Kulti: [
          "dwlr_wb_318",
          "dwlr_wb_319",
          "dwlr_wb_320",
          "dwlr_wb_321",
          "dwlr_wb_322",
          "dwlr_wb_323"
          ],
          Raniganj: [
          "dwlr_wb_324",
          "dwlr_wb_325"
          ],
          Salanpur: [
          "dwlr_wb_326",
          "dwlr_wb_327",
          "dwlr_wb_328",
          "dwlr_wb_329",
          "dwlr_wb_330",
          "dwlr_wb_331",
          "dwlr_wb_332",
          "dwlr_wb_333"
          ]
      },
      PurbaBarddhaman: {
          Ausgram: [
          "dwlr_wb_334"
          ],
          AusgramI: [
          "dwlr_wb_335"
          ],
          AusgramIi: [
          "dwlr_wb_336"
          ],
          BarddhamanSadar: [
          "dwlr_wb_337"
          ],
          Bardhaman: [
          "dwlr_wb_338"
          ],
          Bhatar: [
          "dwlr_wb_339"
          ],
          Ekangarsarai: [
          "dwlr_wb_340",
          "dwlr_wb_341"
          ],
          Kanksha: [
          "dwlr_wb_342"
          ],
          Katwa: [
          "dwlr_wb_343",
          "dwlr_wb_344"
          ],
          Mukutmanipur: [
          "dwlr_wb_345"
          ],
          Raipur: [
          "dwlr_wb_346"
          ],
          Sriniketan: [
          "dwlr_wb_347",
          "dwlr_wb_348",
          "dwlr_wb_349"
          ],
          Vorada: [
          "dwlr_wb_350"
          ]
      },
      Purulia: {
          Barabazar: [
          "dwlr_wb_351",
          "dwlr_wb_352"
          ],
          Bundwan: [
          "dwlr_wb_353"
          ],
          Hura: [
          "dwlr_wb_354",
          "dwlr_wb_355",
          "dwlr_wb_356",
          "dwlr_wb_357",
          "dwlr_wb_358",
          "dwlr_wb_359",
          "dwlr_wb_360",
          "dwlr_wb_361"
          ]
      }
  },
  karnataka: {
      Bagalkot: {
          Badami: [
          "dwlr_ka_001",
          "dwlr_ka_002",
          "dwlr_ka_003",
          "dwlr_ka_004",
          "dwlr_ka_005",
          "dwlr_ka_006"
          ],
          Bagalkot: [
          "dwlr_ka_007"
          ],
          Bilgi: [
          "dwlr_ka_008",
          "dwlr_ka_009",
          "dwlr_ka_010"
          ],
          Hungund: [
          "dwlr_ka_011",
          "dwlr_ka_012",
          "dwlr_ka_013",
          "dwlr_ka_014",
          "dwlr_ka_015",
          "dwlr_ka_016",
          "dwlr_ka_017",
          "dwlr_ka_018"
          ],
          Jamkhandi: [
          "dwlr_ka_019",
          "dwlr_ka_020",
          "dwlr_ka_021",
          "dwlr_ka_022",
          "dwlr_ka_023"
          ],
          Mudhol: [
          "dwlr_ka_024",
          "dwlr_ka_025",
          "dwlr_ka_026"
          ]
      },
      BangaloreRural: {
          Devanhalli: [
          "dwlr_ka_027",
          "dwlr_ka_028",
          "dwlr_ka_029",
          "dwlr_ka_030",
          "dwlr_ka_031"
          ],
          Dodballapur: [
          "dwlr_ka_032",
          "dwlr_ka_033"
          ],
          Nayakanahalli: [
          "dwlr_ka_034"
          ],
          Nelamangala: [
          "dwlr_ka_035",
          "dwlr_ka_036",
          "dwlr_ka_037"
          ]
      },
      BangaloreUrban: {
          Anekal: [
          "dwlr_ka_038",
          "dwlr_ka_039",
          "dwlr_ka_040"
          ],
          BangaloreNorth: [
          "dwlr_ka_041",
          "dwlr_ka_042",
          "dwlr_ka_043",
          "dwlr_ka_044",
          "dwlr_ka_045",
          "dwlr_ka_046",
          "dwlr_ka_047",
          "dwlr_ka_048",
          "dwlr_ka_049",
          "dwlr_ka_050"
          ],
          BangaloreSouth: [
          "dwlr_ka_051",
          "dwlr_ka_052",
          "dwlr_ka_053",
          "dwlr_ka_054",
          "dwlr_ka_055",
          "dwlr_ka_056",
          "dwlr_ka_057",
          "dwlr_ka_058",
          "dwlr_ka_059",
          "dwlr_ka_060"
          ]
      },
      Belagavi: {
          Parasgad: [
          "dwlr_ka_061"
          ],
          Ramdurg: [
          "dwlr_ka_062",
          "dwlr_ka_063",
          "dwlr_ka_064"
          ],
          Raybag: [
          "dwlr_ka_065",
          "dwlr_ka_066",
          "dwlr_ka_067",
          "dwlr_ka_068",
          "dwlr_ka_69",
          "dwlr_ka_070",
          "dwlr_ka_071",
          "dwlr_ka_072",
          "dwlr_ka_073",
          "dwlr_ka_074"
          ],
          Sampgaon: [
          "dwlr_ka_075",
          "dwlr_ka_076",
          "dwlr_ka_077",
          "dwlr_ka_078"
          ]
      },
      Bellary: {
          Bellary: [
          "dwlr_ka_079",
          "dwlr_ka_080",
          "dwlr_ka_081",
          "dwlr_ka_082",
          "dwlr_ka_083",
          "dwlr_ka_084",
          "dwlr_ka_085",
          "dwlr_ka_086"
          ],
          Hadagalli: [
          "dwlr_ka_087",
          "dwlr_ka_088",
          "dwlr_ka_089"
          ],
          Hospet: [
          "dwlr_ka_090",
          "dwlr_ka_091",
          "dwlr_ka_092",
          "dwlr_ka_093",
          "dwlr_ka_094",
          "dwlr_ka_095",
          "dwlr_ka_096"
          ],
          Kudligi: [
          "dwlr_ka_097",
          "dwlr_ka_098",
          "dwlr_ka_099",
          "dwlr_ka_100",
          "dwlr_ka_101",
          "dwlr_ka_102",
          "dwlr_ka_103"
          ],
          Sandur: [
          "dwlr_ka_104",
          "dwlr_ka_105",
          "dwlr_ka_106",
          "dwlr_ka_107",
          "dwlr_ka_108",
          "dwlr_ka_109"
          ],
          Siruguppa: [
          "dwlr_ka_110",
          "dwlr_ka_111"
          ]
      },
      Bidar: {
          Aurad: [
          "dwlr_ka_112",
          "dwlr_ka_113",
          "dwlr_ka_114",
          "dwlr_ka_115",
          "dwlr_ka_116",
          "dwlr_ka_117",
          "dwlr_ka_118",
          "dwlr_ka_119",
          "dwlr_ka_120",
          "dwlr_ka_121"
          ],
          Basavakalyan: [
          "dwlr_ka_122",
          "dwlr_ka_123",
          "dwlr_ka_124",
          "dwlr_ka_125",
          "dwlr_ka_126",
          "dwlr_ka_127"
          ],
          Bhalki: [
          "dwlr_ka_128",
          "dwlr_ka_129",
          "dwlr_ka_130",
          "dwlr_ka_131",
          "dwlr_ka_132"
          ],
          Bidar: [
          "dwlr_ka_133",
          "dwlr_ka_134",
          "dwlr_ka_135",
          "dwlr_ka_136",
          "dwlr_ka_137",
          "dwlr_ka_138",
          "dwlr_ka_139",
          "dwlr_ka_140"
          ],
          Homnabad: [
          "dwlr_ka_141",
          "dwlr_ka_142",
          "dwlr_ka_143",
          "dwlr_ka_144",
          "dwlr_ka_145",
          "dwlr_ka_146",
          "dwlr_ka_147"
          ]
      },
      Bijapur: {
          BasavanaBagewadi: [
          "dwlr_ka_148",
          "dwlr_ka_149",
          "dwlr_ka_150",
          "dwlr_ka_151",
          "dwlr_ka_152",
          "dwlr_ka_153",
          "dwlr_ka_154",
          "dwlr_ka_155",
          "dwlr_ka_156",
          "dwlr_ka_157"
          ],
          Bijapur: [
          "dwlr_ka_158",
          "dwlr_ka_159",
          "dwlr_ka_160",
          "dwlr_ka_161",
          "dwlr_ka_162",
          "dwlr_ka_163",
          "dwlr_ka_164",
          "dwlr_ka_165",
          "dwlr_ka_166",
          "dwlr_ka_167",
          "dwlr_ka_168",
          "dwlr_ka_169"
          ],
          Indi: [
          "dwlr_ka_170",
          "dwlr_ka_171",
          "dwlr_ka_172",
          "dwlr_ka_173",
          "dwlr_ka_174",
          "dwlr_ka_175",
          "dwlr_ka_176",
          "dwlr_ka_177",
          "dwlr_ka_178",
          "dwlr_ka_179",
          "dwlr_ka_180",
          "dwlr_ka_181",
          "dwlr_ka_182",
          "dwlr_ka_183",
          "dwlr_ka_184"
          ],
          Muddebihal: [
          "dwlr_ka_185",
          "dwlr_ka_186",
          "dwlr_ka_187",
          "dwlr_ka_188",
          "dwlr_ka_189",
          "dwlr_ka_190",
          "dwlr_ka_191",
          "dwlr_ka_192",
          "dwlr_ka_193",
          "dwlr_ka_194",
          "dwlr_ka_195"
          ],
          Sindagi: [
          "dwlr_ka_196",
          "dwlr_ka_197",
          "dwlr_ka_198",
          "dwlr_ka_199",
          "dwlr_ka_200",
          "dwlr_ka_201",
          "dwlr_ka_202",
          "dwlr_ka_203",
          "dwlr_ka_204",
          "dwlr_ka_205",
          "dwlr_ka_206",
          "dwlr_ka_207",
          "dwlr_ka_208"
          ]
      },
      Chamarajanagar: {
          Gundlupet: [
          "dwlr_ka_209",
          "dwlr_ka_210",
          "dwlr_ka_211",
          "dwlr_ka_212",
          "dwlr_ka_213",
          "dwlr_ka_214",
          "dwlr_ka_215"
          ],
          Kollegal: [
          "dwlr_ka_216",
          "dwlr_ka_217",
          "dwlr_ka_218",
          "dwlr_ka_219",
          "dwlr_ka_220",
          "dwlr_ka_221",
          "dwlr_ka_222",
          "dwlr_ka_223",
          "dwlr_ka_224",
          "dwlr_ka_225"
          ],
          Yelandur: [
          "dwlr_ka_226",
          "dwlr_ka_227",
          "dwlr_ka_228",
          "dwlr_ka_229"
          ]
      },
      Chikballapur: {
          Chikballapur: [
          "dwlr_ka_230",
          "dwlr_ka_231"
          ],
          Chintamani: [
          "dwlr_ka_232",
          "dwlr_ka_233",
          "dwlr_ka_234",
          "dwlr_ka_235",
          "dwlr_ka_236"
          ]
      },
      Chikballapur: {
          Gaudribidanur: [
          "dwlr_ka_237",
          "dwlr_ka_238",
          "dwlr_ka_239",
          "dwlr_ka_240"
          ]
      },
      Chikkamagalur: {
          Chikkamagalur: [
          "dwlr_ka_241",
          "dwlr_ka_242",
          "dwlr_ka_243",
          "dwlr_ka_244",
          "dwlr_ka_245",
          "dwlr_ka_246",
          "dwlr_ka_247",
          "dwlr_ka_248",
          "dwlr_ka_249",
          "dwlr_ka_250",
          "dwlr_ka_251",
          "dwlr_ka_252",
          "dwlr_ka_253",
          "dwlr_ka_254",
          "dwlr_ka_255",
          "dwlr_ka_256",
          "dwlr_ka_257",
          "dwlr_ka_258",
          "dwlr_ka_259"
          ],
          Kadur: [
          "dwlr_ka_260",
          "dwlr_ka_261",
          "dwlr_ka_262",
          "dwlr_ka_263",
          "dwlr_ka_264"
          ],
          Koppa: [
          "dwlr_ka_265",
          "dwlr_ka_266",
          "dwlr_ka_267",
          "dwlr_ka_268",
          "dwlr_ka_269",
          "dwlr_ka_270",
          "dwlr_ka_271",
          "dwlr_ka_272",
          "dwlr_ka_273",
          "dwlr_ka_274",
          "dwlr_ka_275",
          "dwlr_ka_276",
          "dwlr_ka_277"
          ],
          Mudigere: [
          "dwlr_ka_278",
          "dwlr_ka_279",
          "dwlr_ka_280",
          "dwlr_ka_281",
          "dwlr_ka_282",
          "dwlr_ka_283",
          "dwlr_ka_284",
          "dwlr_ka_285",
          "dwlr_ka_286",
          "dwlr_ka_287",
          "dwlr_ka_288"
          ]
      },
      Chikkamagalur: {
          Mudigere: [
          "dwlr_ka_289",
          "dwlr_ka_290",
          "dwlr_ka_291"
          ],
          Narasimharajapura: [
          "dwlr_ka_292",
          "dwlr_ka_293",
          "dwlr_ka_294",
          "dwlr_ka_295",
          "dwlr_ka_296",
          "dwlr_ka_297",
          "dwlr_ka_298",
          "dwlr_ka_299",
          "dwlr_ka_300",
          "dwlr_ka_301",
          "dwlr_ka_302",
          "dwlr_ka_303",
          "dwlr_ka_304",
          "dwlr_ka_305",
          "dwlr_ka_306"
          ],
          Sringeri: [
          "dwlr_ka_307",
          "dwlr_ka_308",
          "dwlr_ka_309"
          ],
          Tarikere: [
          "dwlr_ka_310",
          "dwlr_ka_311",
          "dwlr_ka_312",
          "dwlr_ka_313",
          "dwlr_ka_314",
          "dwlr_ka_315",
          "dwlr_ka_316",
          "dwlr_ka_317",
          "dwlr_ka_318",
          "dwlr_ka_319",
          "dwlr_ka_320"
          ]
      },
      Chitradurga: {
          Chitradurga: [
          "dwlr_ka_321",
          "dwlr_ka_322",
          "dwlr_ka_323",
          "dwlr_ka_324",
          "dwlr_ka_325",
          "dwlr_ka_326"
          ],
          Hiriyur: [
          "dwlr_ka_327",
          "dwlr_ka_328",
          "dwlr_ka_329"
          ],
          Holalkere: [
          "dwlr_ka_330",
          "dwlr_ka_331",
          "dwlr_ka_332",
          "dwlr_ka_333",
          "dwlr_ka_334",
          "dwlr_ka_335",
          "dwlr_ka_336",
          "dwlr_ka_337"
          ],
          Hosadurga: [
          "dwlr_ka_338"
          ],
          Hosdurga: [
          "dwlr_ka_339",
          "dwlr_ka_340",
          "dwlr_ka_341",
          "dwlr_ka_342",
          "dwlr_ka_343",
          "dwlr_ka_344",
          "dwlr_ka_345"
          ],
          Molakalmuru: [
          "dwlr_ka_346",
          "dwlr_ka_347"
          ]
      },
      DakshinKannada: {
          Bantval: [
          "dwlr_ka_348",
          "dwlr_ka_349",
          "dwlr_ka_350",
          "dwlr_ka_351",
          "dwlr_ka_352",
          "dwlr_ka_353",
          "dwlr_ka_354",
          "dwlr_ka_355",
          "dwlr_ka_356",
          "dwlr_ka_357",
          "dwlr_ka_358",
          "dwlr_ka_359",
          "dwlr_ka_360",
          "dwlr_ka_361",
          "dwlr_ka_362",
          "dwlr_ka_363"
          ],
          Beltangadi: [
          "dwlr_ka_364",
          "dwlr_ka_365",
          "dwlr_ka_366",
          "dwlr_ka_367",
          "dwlr_ka_368",
          "dwlr_ka_369",
          "dwlr_ka_370",
          "dwlr_ka_371",
          "dwlr_ka_372",
          "dwlr_ka_373",
          "dwlr_ka_374",
          "dwlr_ka_375",
          "dwlr_ka_376",
          "dwlr_ka_377"
          ],
          Mangalore: [
          "dwlr_ka_378",
          "dwlr_ka_379",
          "dwlr_ka_380",
          "dwlr_ka_381",
          "dwlr_ka_382",
          "dwlr_ka_383",
          "dwlr_ka_384",
          "dwlr_ka_385",
          "dwlr_ka_386",
          "dwlr_ka_387",
          "dwlr_ka_388",
          "dwlr_ka_389",
          "dwlr_ka_390",
          "dwlr_ka_391",
          "dwlr_ka_392",
          "dwlr_ka_393",
          "dwlr_ka_394",
          "dwlr_ka_395",
          "dwlr_ka_396",
          "dwlr_ka_397",
          "dwlr_ka_398",
          "dwlr_ka_399",
          "dwlr_ka_400",
          "dwlr_ka_401",
          "dwlr_ka_402",
          "dwlr_ka_403",
          "dwlr_ka_404",
          "dwlr_ka_405",
          "dwlr_ka_406",
          "dwlr_ka_407"
          ],
          Puttur: [
          "dwlr_ka_408",
          "dwlr_ka_409",
          "dwlr_ka_410",
          "dwlr_ka_411",
          "dwlr_ka_412",
          "dwlr_ka_413",
          "dwlr_ka_414",
          "dwlr_ka_415",
          "dwlr_ka_416",
          "dwlr_ka_417",
          "dwlr_ka_418",
          "dwlr_ka_419",
          "dwlr_ka_420",
          "dwlr_ka_421",
          "dwlr_ka_422",
          "dwlr_ka_423",
          "dwlr_ka_424"
          ],
          Sulya: [
          "dwlr_ka_425",
          "dwlr_ka_426",
          "dwlr_ka_427",
          "dwlr_ka_428",
          "dwlr_ka_429",
          "dwlr_ka_430",
          "dwlr_ka_431",
          "dwlr_ka_432",
          "dwlr_ka_433",
          "dwlr_ka_434",
          "dwlr_ka_435",
          "dwlr_ka_436",
          "dwlr_ka_437",
          "dwlr_ka_438"
          ]
      },
      Davanagere: {
          Channagiri: [
          "dwlr_ka_439",
          "dwlr_ka_440",
          "dwlr_ka_441",
          "dwlr_ka_442",
          "dwlr_ka_443",
          "dwlr_ka_444",
          "dwlr_ka_445",
          "dwlr_ka_446",
          "dwlr_ka_447",
          "dwlr_ka_448"
          ],
          Davanagere: [
          "dwlr_ka_449",
          "dwlr_ka_450",
          "dwlr_ka_451",
          "dwlr_ka_452",
          "dwlr_ka_453",
          "dwlr_ka_454",
          "dwlr_ka_455",
          "dwlr_ka_456",
          "dwlr_ka_457",
          "dwlr_ka_458",
          "dwlr_ka_459",
          "dwlr_ka_460",
          "dwlr_ka_461",
          "dwlr_ka_462",
          "dwlr_ka_463",
          "dwlr_ka_464",
          "dwlr_ka_465",
          "dwlr_ka_466"
          ],
          Harapanahalli: [
          "dwlr_ka_467",
          "dwlr_ka_468",
          "dwlr_ka_469",
          "dwlr_ka_470"
          ],
          Harihar: [
          "dwlr_ka_471",
          "dwlr_ka_472",
          "dwlr_ka_473",
          "dwlr_ka_474",
          "dwlr_ka_475",
          "dwlr_ka_476"
          ],
          Honnali: [
          "dwlr_ka_477",
          "dwlr_ka_478",
          "dwlr_ka_479",
          "dwlr_ka_480",
          "dwlr_ka_481",
          "dwlr_ka_482",
          "dwlr_ka_483",
          "dwlr_ka_484",
          "dwlr_ka_485",
          "dwlr_ka_486"
          ]
      },
      Dharwad: {
          Dharwad: [
          "dwlr_ka_487",
          "dwlr_ka_488",
          "dwlr_ka_489",
          "dwlr_ka_490",
          "dwlr_ka_491",
          "dwlr_ka_492",
          "dwlr_ka_493",
          "dwlr_ka_494",
          "dwlr_ka_495"
          ],
          Hubbali: [
          "dwlr_ka_496",
          "dwlr_ka_497",
          "dwlr_ka_498",
          "dwlr_ka_499",
          "dwlr_ka_500"
          ],
          Kalghatgi: [
          "dwlr_ka_501",
          "dwlr_ka_502",
          "dwlr_ka_503",
          "dwlr_ka_504"
          ],
          Kundgol: [
          "dwlr_ka_505",
          "dwlr_ka_506"
          ],
          Navalgund: [
          "dwlr_ka_507",
          "dwlr_ka_508",
          "dwlr_ka_509"
          ]
      },
      Gadag: {
          Gadag: [
          "dwlr_ka_510",
          "dwlr_ka_511",
          "dwlr_ka_512",
          "dwlr_ka_513"
          ],
          Mundargi: [
          "dwlr_ka_514",
          "dwlr_ka_515",
          "dwlr_ka_516",
          "dwlr_ka_517"
          ],
          Nargund: [
          "dwlr_ka_518"
          ],
          Ron: [
          "dwlr_ka_519",
          "dwlr_ka_520",
          "dwlr_ka_521",
          "dwlr_ka_522",
          "dwlr_ka_523"
          ],
          Shirhatti: [
          "dwlr_ka_524",
          "dwlr_ka_525",
          "dwlr_ka_526",
          "dwlr_ka_527",
          "dwlr_ka_528",
          "dwlr_ka_529"
          ]
      },
      Gulbarga: {
          Afzalpur: [
          "dwlr_ka_530",
          "dwlr_ka_531",
          "dwlr_ka_532",
          "dwlr_ka_533",
          "dwlr_ka_534",
          "dwlr_ka_535",
          "dwlr_ka_536",
          "dwlr_ka_537"
          ],
          Aland: [
          "dwlr_ka_538",
          "dwlr_ka_539",
          "dwlr_ka_540",
          "dwlr_ka_541",
          "dwlr_ka_542",
          "dwlr_ka_543",
          "dwlr_ka_544",
          "dwlr_ka_545",
          "dwlr_ka_546",
          "dwlr_ka_547",
          "dwlr_ka_548",
          "dwlr_ka_549",
          "dwlr_ka_550",
          "dwlr_ka_551"
          ],
          Chincholi: [
          "dwlr_ka_552",
          "dwlr_ka_553",
          "dwlr_ka_554",
          "dwlr_ka_555",
          "dwlr_ka_556",
          "dwlr_ka_557",
          "dwlr_ka_558",
          "dwlr_ka_559",
          "dwlr_ka_560",
          "dwlr_ka_561"
          ],
          Chitapur: [
          "dwlr_ka_562",
          "dwlr_ka_563",
          "dwlr_ka_564",
          "dwlr_ka_565",
          "dwlr_ka_566"
          ],
          Gulbarga: [
          "dwlr_ka_567",
          "dwlr_ka_568",
          "dwlr_ka_569",
          "dwlr_ka_570",
          "dwlr_ka_571",
          "dwlr_ka_572",
          "dwlr_ka_573",
          "dwlr_ka_574",
          "dwlr_ka_575",
          "dwlr_ka_576"
          ],
          Jevargi: [
          "dwlr_ka_577",
          "dwlr_ka_578",
          "dwlr_ka_579",
          "dwlr_ka_580",
          "dwlr_ka_581",
          "dwlr_ka_582",
          "dwlr_ka_583",
          "dwlr_ka_584",
          "dwlr_ka_585"
          ],
          Sedam: [
          "dwlr_ka_586",
          "dwlr_ka_587",
          "dwlr_ka_588"
          ]
      },
      Hassan: {
          Alur: [
          "dwlr_ka_589",
          "dwlr_ka_590",
          "dwlr_ka_591",
          "dwlr_ka_592",
          "dwlr_ka_593"
          ],
          Arkalgud: [
          "dwlr_ka_594",
          "dwlr_ka_595",
          "dwlr_ka_596",
          "dwlr_ka_597",
          "dwlr_ka_598",
          "dwlr_ka_599",
          "dwlr_ka_600",
          "dwlr_ka_601",
          "dwlr_ka_602",
          "dwlr_ka_603",
          "dwlr_ka_604",
          "dwlr_ka_605",
          "dwlr_ka_606",
          "dwlr_ka_607",
          "dwlr_ka_608"
          ],
          Arsikere: [
          "dwlr_ka_609",
          "dwlr_ka_610",
          "dwlr_ka_611",
          "dwlr_ka_612",
          "dwlr_ka_613",
          "dwlr_ka_614",
          "dwlr_ka_615",
          "dwlr_ka_616",
          "dwlr_ka_617",
          "dwlr_ka_618",
          "dwlr_ka_619"
          ],
          Belur: [
          "dwlr_ka_620",
          "dwlr_ka_621",
          "dwlr_ka_622",
          "dwlr_ka_623",
          "dwlr_ka_624",
          "dwlr_ka_625",
          "dwlr_ka_626",
          "dwlr_ka_627"
          ],
          Channarayapatana: [
          "dwlr_ka_628",
          "dwlr_ka_629",
          "dwlr_ka_630",
          "dwlr_ka_631",
          "dwlr_ka_632",
          "dwlr_ka_633",
          "dwlr_ka_634",
          "dwlr_ka_635",
          "dwlr_ka_636"
          ],
          Hassan: [
          "dwlr_ka_637",
          "dwlr_ka_638",
          "dwlr_ka_639",
          "dwlr_ka_640",
          "dwlr_ka_641",
          "dwlr_ka_642",
          "dwlr_ka_643",
          "dwlr_ka_644",
          "dwlr_ka_645",
          "dwlr_ka_646",
          "dwlr_ka_647",
          "dwlr_ka_648"
          ],
          Holenarsipur: [
          "dwlr_ka_649",
          "dwlr_ka_650",
          "dwlr_ka_651",
          "dwlr_ka_652",
          "dwlr_ka_653",
          "dwlr_ka_654",
          "dwlr_ka_655"
          ],
          Manjarabad: [
          "dwlr_ka_656",
          "dwlr_ka_657",
          "dwlr_ka_658",
          "dwlr_ka_659",
          "dwlr_ka_660",
          "dwlr_ka_661",
          "dwlr_ka_662",
          "dwlr_ka_663",
          "dwlr_ka_664"
          ]
      },
      Haveri: {
          Byadgi: [
          "dwlr_ka_665"
          ],
          Hangal: [
          "dwlr_ka_666",
          "dwlr_ka_667",
          "dwlr_ka_668",
          "dwlr_ka_669",
          "dwlr_ka_670",
          "dwlr_ka_671",
          "dwlr_ka_672"
          ],
          "irekeru": [
          "dwlr_ka_673",
          "dwlr_ka_674",
          "dwlr_ka_675",
          "dwlr_ka_676",
          "dwlr_ka_677"
          ],
          Ranibennur: [
          "dwlr_ka_678",
          "dwlr_ka_679",
          "dwlr_ka_680",
          "dwlr_ka_681",
          "dwlr_ka_682"
          ],
          Shiggaon: [
          "dwlr_ka_683",
          "dwlr_ka_684",
          "dwlr_ka_685",
          "dwlr_ka_686",
          "dwlr_ka_687",
          "dwlr_ka688"
          ]
      },
      Kodagu: {
          Madikeri: [
          "dwlr_ka_689",
          "dwlr_ka_690",
          "dwlr_ka_691",
          "dwlr_ka_692",
          "dwlr_ka_693",
          "dwlr_ka_694",
          "dwlr_ka_695",
          "dwlr_ka_696",
          "dwlr_ka_697",
          "dwlr_ka_698",
          "dwlr_ka_699",
          "dwlr_ka_700",
          "dwlr_ka_701",
          "dwlr_ka_702",
          "dwlr_ka_703",
          "dwlr_ka_704",
          "dwlr_ka_705",
          "dwlr_ka_706",
          "dwlr_ka_707",
          "dwlr_ka_708",
          "dwlr_ka_709",
          "dwlr_ka_710",
          "dwlr_ka_711",
          "dwlr_ka_712",
          "dwlr_ka_713"
          ],
          Somvarpet: [
          "dwlr_ka_714",
          "dwlr_ka_715",
          "dwlr_ka_716",
          "dwlr_ka_717",
          "dwlr_ka_718",
          "dwlr_ka_719",
          "dwlr_ka_720",
          "dwlr_ka_721",
          "dwlr_ka_722",
          "dwlr_ka_723",
          "dwlr_ka_724",
          "dwlr_ka_725",
          "dwlr_ka_726",
          "dwlr_ka_727",
          "dwlr_ka_728",
          "dwlr_ka_729",
          "dwlr_ka_730",
          "dwlr_ka_731",
          "dwlr_ka_732",
          "dwlr_ka_733"
          ],
          Virajpet: [
          "dwlr_ka_734",
          "dwlr_ka_735",
          "dwlr_ka_736",
          "dwlr_ka_737",
          "dwlr_ka_738",
          "dwlr_ka_739",
          "dwlr_ka_740",
          "dwlr_ka_741",
          "dwlr_ka_742",
          "dwlr_ka_743",
          "dwlr_ka_744",
          "dwlr_ka_745",
          "dwlr_ka_746",
          "dwlr_ka_747",
          "dwlr_ka_748",
          "dwlr_ka_749",
          "dwlr_ka_750",
          "dwlr_ka_751",
          "dwlr_ka_752",
          "dwlr_ka_753",
          "dwlr_ka_754",
          "dwlr_ka_755",
          "dwlr_ka_756",
          "dwlr_ka_757",
          "dwlr_ka_758"
          ]
      },
      Kolar: {
          Bangarapet: [
          "dwlr_ka_759",
          "dwlr_ka_760",
          "dwlr_ka_761",
          "dwlr_ka_762",
          "dwlr_ka_763"
          ],
          Kolar: [
          "dwlr_ka_764",
          "dwlr_ka_765",
          "dwlr_ka_766",
          "dwlr_ka_767",
          "dwlr_ka_768",
          "dwlr_ka_769",
          "dwlr_ka_770",
          "dwlr_ka_771"
          ],
          Mulbagal: [
          "dwlr_ka_772",
          "dwlr_ka_773",
          "dwlr_ka_774",
          "dwlr_ka_775",
          "dwlr_ka_776",
          "dwlr_ka_777",
          "dwlr_ka_778",
          "dwlr_ka_779",
          "dwlr_ka_780",
          "dwlr_ka_781"
          ]
      },
      Koppal: {
          Gangavathi: [
          "dwlr_ka_782",
          "dwlr_ka_783",
          "dwlr_ka_784",
          "dwlr_ka_785",
          "dwlr_ka_786",
          "dwlr_ka_787",
          "dwlr_ka_788"
          ],
          Koppal: [
          "dwlr_ka_789",
          "dwlr_ka_790",
          "dwlr_ka_791",
          "dwlr_ka_792",
          "dwlr_ka_793"
          ],
          Kushtagi: [
          "dwlr_ka_794",
          "dwlr_ka_795",
          "dwlr_ka_796",
          "dwlr_ka_797",
          "dwlr_ka_798",
          "dwlr_ka_799",
          "dwlr_ka_800",
          "dwlr_ka_801",
          "dwlr_ka_802"
          ],
          Yelburga: [
          "dwlr_ka_803",
          "dwlr_ka_804",
          "dwlr_ka_805",
          "dwlr_ka_806",
          "dwlr_ka_807",
          "dwlr_ka_808",
          "dwlr_ka_809"
          ]
      },
      Mandya: {
          Krishnarajpet: [
          "dwlr_ka_810",
          "dwlr_ka_811",
          "dwlr_ka_812"
          ],
          Maddur: [
          "dwlr_ka_813",
          "dwlr_ka_814",
          "dwlr_ka_815",
          "dwlr_ka_816",
          "dwlr_ka_817",
          "dwlr_ka_818",
          "dwlr_ka_819",
          "dwlr_ka_820"
          ],
          Malvalli: [
          "dwlr_ka_821",
          "dwlr_ka_822",
          "dwlr_ka_823",
          "dwlr_ka_824"
          ],
          Mandya: [
          "dwlr_ka_825",
          "dwlr_ka_826",
          "dwlr_ka_827",
          "dwlr_ka_828",
          "dwlr_ka_829"
          ],
          Nagamangala: [
          "dwlr_ka_830",
          "dwlr_ka_831",
          "dwlr_ka_832",
          "dwlr_ka_833",
          "dwlr_ka_834",
          "dwlr_ka_835",
          "dwlr_ka_836"
          ],
          Pandavapura: [
          "dwlr_ka_837",
          "dwlr_ka_838",
          "dwlr_ka_839",
          "dwlr_ka_840",
          "dwlr_ka_841",
          "dwlr_ka_842",
          "dwlr_ka_843",
          "dwlr_ka_844",
          "dwlr_ka_845"
          ],
          Shrirangapattana: [
          "dwlr_ka_846",
          "dwlr_ka_847",
          "dwlr_ka_848",
          "dwlr_ka_849",
          "dwlr_ka_850",
          "dwlr_ka_851",
          "dwlr_ka_852",
          "dwlr_ka_853"
          ]
      },
      Mysore: {
          Heggadadevankote: [
          "dwlr_ka_854",
          "dwlr_ka_855",
          "dwlr_ka_856",
          "dwlr_ka_857",
          "dwlr_ka_858",
          "dwlr_ka_859",
          "dwlr_ka_860"
          ],
          Hunsur: [
          "dwlr_ka_861",
          "dwlr_ka_862",
          "dwlr_ka_863",
          "dwlr_ka_864",
          "dwlr_ka_865",
          "dwlr_ka_866",
          "dwlr_ka_867"
          ],
          Krishnarajanagara: [
          "dwlr_ka_868",
          "dwlr_ka_869",
          "dwlr_ka_870",
          "dwlr_ka_871",
          "dwlr_ka_872",
          "dwlr_ka_873"
          ],
          Mysore: [
          "dwlr_ka_874",
          "dwlr_ka_875",
          "dwlr_ka_876",
          "dwlr_ka_877",
          "dwlr_ka_878"
          ],
          Nanjangud: [
          "dwlr_ka_879",
          "dwlr_ka_880",
          "dwlr_ka_881",
          "dwlr_ka_882",
          "dwlr_ka_883",
          "dwlr_ka_884",
          "dwlr_ka_885",
          "dwlr_ka_886",
          "dwlr_ka_887",
          "dwlr_ka_888",
          "dwlr_ka_889",
          "dwlr_ka_890",
          "dwlr_ka_891",
          "dwlr_ka_892",
          "dwlr_ka_893",
          "dwlr_ka_894"
          ],
          Piriyapatna: [
          "dwlr_ka_895",
          "dwlr_ka_896",
          "dwlr_ka_897",
          "dwlr_ka_898",
          "dwlr_ka_899",
          "dwlr_ka_900",
          "dwlr_ka_901",
          "dwlr_ka_902",
          "dwlr_ka_903",
          "dwlr_ka_904",
          "dwlr_ka_905",
          "dwlr_ka_906"
          ],
          TirumakudalNarsipur: [
          "dwlr_ka_907",
          "dwlr_ka_908",
          "dwlr_ka_909"
          ]
      },
      Raichur: {
          Devadurga: [
          "dwlr_ka_910",
          "dwlr_ka_911",
          "dwlr_ka_912",
          "dwlr_ka_913",
          "dwlr_ka_914",
          "dwlr_ka_915",
          "dwlr_ka_916",
          "dwlr_ka_917",
          "dwlr_ka_918"
          ],
          Lingsugur: [
          "dwlr_ka_919",
          "dwlr_ka_920",
          "dwlr_ka_921",
          "dwlr_ka_922",
          "dwlr_ka_923",
          "dwlr_ka_924",
          "dwlr_ka_925",
          "dwlr_ka_926",
          "dwlr_ka_927",
          "dwlr_ka_928",
          "dwlr_ka_929",
          "dwlr_ka_930",
          "dwlr_ka_931",
          "dwlr_ka_932",
          "dwlr_ka_933",
          "dwlr_ka_934"
          ],
          Manvi: [
          "dwlr_ka_935",
          "dwlr_ka_936",
          "dwlr_ka_937",
          "dwlr_ka_938",
          "dwlr_ka_939",
          "dwlr_ka_940",
          "dwlr_ka_941",
          "dwlr_ka_942",
          "dwlr_ka_943",
          "dwlr_ka_944",
          "dwlr_ka_945",
          "dwlr_ka_946",
          "dwlr_ka_947",
          "dwlr_ka_948"
          ],
          Raichur: [
          "dwlr_ka_949",
          "dwlr_ka_950",
          "dwlr_ka_951",
          "dwlr_ka_952",
          "dwlr_ka_953",
          "dwlr_ka_954"
          ],
          Sindhnur: [
          "dwlr_ka_955",
          "dwlr_ka_956",
          "dwlr_ka_957",
          "dwlr_ka_958",
          "dwlr_ka_959",
          "dwlr_ka_960",
          "dwlr_ka_961",
          "dwlr_ka_962",
          "dwlr_ka_963"
          ]
      },
      Ramanagara: {
          Channapatna: [
          "dwlr_ka_964",
          "dwlr_ka_965",
          "dwlr_ka_966",
          "dwlr_ka_967"
          ],
          Kanakapura: [
          "dwlr_ka_968",
          "dwlr_ka_969",
          "dwlr_ka_970",
          "dwlr_ka_971",
          "dwlr_ka_972",
          "dwlr_ka_973",
          "dwlr_ka_974",
          "dwlr_ka_975",
          "dwlr_ka_976",
          "dwlr_ka_977",
          "dwlr_ka_978",
          "dwlr_ka_979",
          "dwlr_ka_980"
          ],
          Magadi: [
          "dwlr_ka_981",
          "dwlr_ka_982",
          "dwlr_ka_983",
          "dwlr_ka_984",
          "dwlr_ka_985",
          "dwlr_ka_986",
          "dwlr_ka_987",
          "dwlr_ka_988"
          ],
          Ramanagaram: [
          "dwlr_ka_989",
          "dwlr_ka_990",
          "dwlr_ka_991",
          "dwlr_ka_992",
          "dwlr_ka_993",
          "dwlr_ka_994"
          ]
      },
      Shimoga: {
          Bhadravati: [
          "dwlr_ka_995",
          "dwlr_ka_996",
          "dwlr_ka_997",
          "dwlr_ka_998",
          "dwlr_ka_999",
          "dwlr_ka_1000",
          "dwlr_ka_1001",
          "dwlr_ka_1002",
          "dwlr_ka_1003",
          "dwlr_ka_1004"
          ],
          Hosanagara: [
          "dwlr_ka_1005",
          "dwlr_ka_1006",
          "dwlr_ka_1007",
          "dwlr_ka_1008",
          "dwlr_ka_1009",
          "dwlr_ka_1010",
          "dwlr_ka_1011",
          "dwlr_ka_1012",
          "dwlr_ka_1013",
          "dwlr_ka_1014",
          "dwlr_ka_1015",
          "dwlr_ka_1016",
          "dwlr_ka_1017",
          "dwlr_ka_1018"
          ],
          Sagar: [
          "dwlr_ka_1019",
          "dwlr_ka_1020",
          "dwlr_ka_1021",
          "dwlr_ka_1022",
          "dwlr_ka_1023",
          "dwlr_ka_1024",
          "dwlr_ka_1025",
          "dwlr_ka_1026",
          "dwlr_ka_1027",
          "dwlr_ka_1028"
          ],
          Shikarpur: [
          "dwlr_ka_1029",
          "dwlr_ka_1030",
          "dwlr_ka_1031"
          ],
          Shimoga: [
          "dwlr_ka_1032",
          "dwlr_ka_1033",
          "dwlr_ka_1034",
          "dwlr_ka_1035",
          "dwlr_ka_1036",
          "dwlr_ka_1037",
          "dwlr_ka_1038",
          "dwlr_ka_1039",
          "dwlr_ka_1040",
          "dwlr_ka_1041"
          ],
          Sorab: [
          "dwlr_ka_1042",
          "dwlr_ka_1043",
          "dwlr_ka_1044",
          "dwlr_ka_1045",
          "dwlr_ka_1046",
          "dwlr_ka_1047",
          "dwlr_ka_1048"
          ],
          Tirthahalli: [
          "dwlr_ka_1049",
          "dwlr_ka_1050",
          "dwlr_ka_1051",
          "dwlr_ka_1052",
          "dwlr_ka_1053",
          "dwlr_ka_1054",
          "dwlr_ka_1055",
          "dwlr_ka_1056",
          "dwlr_ka_1057",
          "dwlr_ka_1058",
          "dwlr_ka_1059",
          "dwlr_ka_1060",
          "dwlr_ka_1061",
          "dwlr_ka_1062",
          "dwlr_ka_1063",
          "dwlr_ka_1064",
          "dwlr_ka_1065",
          "dwlr_ka_1066",
          "dwlr_ka_1067",
          "dwlr_ka_1068",
          "dwlr_ka_1069",
          "dwlr_ka_1070",
          "dwlr_ka_1071",
          "dwlr_ka_1072",
          "dwlr_ka_1073",
          "dwlr_ka_1074",
          "dwlr_ka_1075",
          "dwlr_ka_1076",
          "dwlr_ka_1077",
          "dwlr_ka_1078",
          "dwlr_ka_1079"
          ]
      },
      Tumkur: {
          Cnhalli: [
          "dwlr_ka_1080",
          "dwlr_ka_1081",
          "dwlr_ka_1082",
          "dwlr_ka_1083",
          "dwlr_ka_1084"
          ],
          Gubbi: [
          "dwlr_ka_1085",
          "dwlr_ka_1086",
          "dwlr_ka_1087"
          ],
          Koratagere: [
          "dwlr_ka_1088",
          "dwlr_ka_1089",
          "dwlr_ka_1090",
          "dwlr_ka_1091",
          "dwlr_ka_1092",
          "dwlr_ka_1093"
          ],
          Kunigal: [
          "dwlr_ka_1094",
          "dwlr_ka_1095",
          "dwlr_ka_1096"
          ],
          Madhugiri: [
          "dwlr_ka_1097",
          "dwlr_ka_1098",
          "dwlr_ka_1099",
          "dwlr_ka_1100",
          "dwlr_ka_1101",
          "dwlr_ka_1102",
          "dwlr_ka_1103",
          "dwlr_ka_1104"
          ],
          Pavagada: [
          "dwlr_ka_1105",
          "dwlr_ka_1106",
          "dwlr_ka_1107",
          "dwlr_ka_1108",
          "dwlr_ka_1109",
          "dwlr_ka_1110"
          ],
          Sira: [
          "dwlr_ka_1111"
          ],
          Tiptur: [
          "dwlr_ka_1112",
          "dwlr_ka_1113",
          "dwlr_ka_1114",
          "dwlr_ka_1115",
          "dwlr_ka_1116",
          "dwlr_ka_1117",
          "dwlr_ka_1118",
          "dwlr_ka_1119"
          ],
          Tumkur: [
          "dwlr_ka_1120",
          "dwlr_ka_1121",
          "dwlr_ka_1122"
          ],
          Turuvekere: [
          "dwlr_ka_1123"
          ]
      },
      Udupi: {
          Karkal: [
          "dwlr_ka_1124",
          "dwlr_ka_1125",
          "dwlr_ka_1126",
          "dwlr_ka_1127",
          "dwlr_ka_1128",
          "dwlr_ka_1129",
          "dwlr_ka_1130",
          "dwlr_ka_1131",
          "dwlr_ka_1132",
          "dwlr_ka_1133",
          "dwlr_ka_1134",
          "dwlr_ka_1135",
          "dwlr_ka_1136",
          "dwlr_ka_1137",
          "dwlr_ka_1138",
          "dwlr_ka_1139"
          ],
          Kundapura: [
          "dwlr_ka_1140",
          "dwlr_ka_1141",
          "dwlr_ka_1142",
          "dwlr_ka_1143",
          "dwlr_ka_1144",
          "dwlr_ka_1145",
          "dwlr_ka_1146",
          "dwlr_ka_1147",
          "dwlr_ka_1148",
          "dwlr_ka_1149",
          "dwlr_ka_1150",
          "dwlr_ka_1151",
          "dwlr_ka_1152",
          "dwlr_ka_1153",
          "dwlr_ka_1154",
          "dwlr_ka_1155",
          "dwlr_ka_1156",
          "dwlr_ka_1157",
          "dwlr_ka_1158",
          "dwlr_ka_1159",
          "dwlr_ka_1160",
          "dwlr_ka_1161",
          "dwlr_ka_1162",
          "dwlr_ka_1163",
          "dwlr_ka_1164",
          "dwlr_ka_1165",
          "dwlr_ka_1166",
          "dwlr_ka_1167",
          "dwlr_ka_1168",
          "dwlr_ka_1169",
          "dwlr_ka_1170"
          ],
          Udupi: [
          "dwlr_ka_1171",
          "dwlr_ka_1172",
          "dwlr_ka_1173",
          "dwlr_ka_1174",
          "dwlr_ka_1175",
          "dwlr_ka_1176",
          "dwlr_ka_1177",
          "dwlr_ka_1178",
          "dwlr_ka_1179",
          "dwlr_ka_1180",
          "dwlr_ka_1181",
          "dwlr_ka_1182",
          "dwlr_ka_1183",
          "dwlr_ka_1184",
          "dwlr_ka_1185",
          "dwlr_ka_1186",
          "dwlr_ka_1187",
          "dwlr_ka_1188",
          "dwlr_ka_1189",
          "dwlr_ka_1190",
          "dwlr_ka_1191",
          "dwlr_ka_1192",
          "dwlr_ka_1193",
          "dwlr_ka_1194",
          "dwlr_ka_1195",
          "dwlr_ka_1196",
          "dwlr_ka_1197",
          "dwlr_ka_1198"
          ]
      },
      UttaraKannada: {
          Ankola: [
          "dwlr_ka_1199",
          "dwlr_ka_1200",
          "dwlr_ka_1201"
          ],
          Bhatkal: [
          "dwlr_ka_1202",
          "dwlr_ka_1203",
          "dwlr_ka_1204",
          "dwlr_ka_1205"
          ],
          Haliyal: [
          "dwlr_ka_1206",
          "dwlr_ka_1207",
          "dwlr_ka_1208"
          ],
          Honavar: [
          "dwlr_ka_1209",
          "dwlr_ka_1210",
          "dwlr_ka_1211",
          "dwlr_ka_1212",
          "dwlr_ka_1213",
          "dwlr_ka_1214",
          "dwlr_ka_1215"
          ],
          Karwar: [
          "dwlr_ka_1216",
          "dwlr_ka_1217",
          "dwlr_ka_1218",
          "dwlr_ka_1219",
          "dwlr_ka_1220",
          "dwlr_ka_1221",
          "dwlr_ka_1222",
          "dwlr_ka_1223",
          "dwlr_ka_1224",
          "dwlr_ka_1225"
          ],
          Kumta: [
          "dwlr_ka_1226",
          "dwlr_ka_1227",
          "dwlr_ka_1228",
          "dwlr_ka_1229",
          "dwlr_ka_1230",
          "dwlr_ka_1231",
          "dwlr_ka_1232",
          "dwlr_ka_1233",
          "dwlr_ka_1234",
          "dwlr_ka_1235",
          "dwlr_ka_1236"
          ],
          Mundgod: [
          "dwlr_ka_1237",
          "dwlr_ka_1238",
          "dwlr_ka_1239",
          "dwlr_ka_1240"
          ],
          Siddapur: [
          "dwlr_ka_1241",
          "dwlr_ka_1242",
          "dwlr_ka_1243",
          "dwlr_ka_1244",
          "dwlr_ka_1245",
          "dwlr_ka_1246",
          "dwlr_ka_1247",
          "dwlr_ka_1248",
          "dwlr_ka_1249",
          "dwlr_ka_1250",
          "dwlr_ka_1251",
          "dwlr_ka_1252",
          "dwlr_ka_1253",
          "dwlr_ka_1254",
          "dwlr_ka_1255"
          ],
          Sirsi: [
          "dwlr_ka_1256",
          "dwlr_ka_1257",
          "dwlr_ka_1258",
          "dwlr_ka_1259",
          "dwlr_ka_1260",
          "dwlr_ka_1261",
          "dwlr_ka_1262",
          "dwlr_ka_1263",
          "dwlr_ka_1264",
          "dwlr_ka_1265",
          "dwlr_ka_1266"
          ],
          Supa: [
          "dwlr_ka_1267",
          "dwlr_ka_1268",
          "dwlr_ka_1269",
          "dwlr_ka_1270"
          ],
          Yellapur: [
          "dwlr_ka_1271",
          "dwlr_ka_1272",
          "dwlr_ka_1273",
          "dwlr_ka_1274",
          "dwlr_ka_1275"
          ]
      }
  },
  andhra: {
     Anantapur: {
          Amarapuram: [
          "dwlr_ap_001"
          ],
          Atmakur: [
          "dwlr_ap_002",
          "dwlr_ap_003"
          ],
          Bukkarayasamudram: [
          "dwlr_ap_004",
          "dwlr_ap_005"
          ],
          Chennakothapalle: [
          "dwlr_ap_006"
          ],
          Dharmavaram: [
          "dwlr_ap_007",
          "dwlr_ap_008",
          "dwlr_ap_009"
          ],
          Gooty: [
          "dwlr_ap_010",
          "dwlr_ap_011"
          ],
          Gudibanda: [
          "dwlr_ap_012",
          "dwlr_ap_013"
          ],
          Guntakal: [
          "dwlr_ap_014"
          ],
          Kadiri: [
          "dwlr_ap_015"
          ],
          Kalyandurg: [
          "dwlr_ap_016"
          ],
          Lepakshi: [
          "dwlr_ap_017"
          ],
          Madakasira: [
          "dwlr_ap_018",
          "dwlr_ap_019",
          "dwlr_ap_020",
          "dwlr_ap_021"
          ],
          Mudigubba: [
          "dwlr_ap_022",
          "dwlr_ap_023"
          ],
          Nallacheruvu: [
          "dwlr_ap_024"
          ],
          Nallamada: [
          "dwlr_ap_025"
          ],
          Obuladevaracheruvu: [
          "dwlr_ap_026",
          "dwlr_ap_027",
          "dwlr_ap_028"
          ],
          Penukonda: [
          "dwlr_ap_029"
          ],
          Puttaparti: [
          "dwlr_ap_030"
          ],
          Rayadurg: [
          "dwlr_ap_031"
          ],
          Rolla: [
          "dwlr_ap_032",
          "dwlr_ap_033"
          ],
          Tadipatri: [
          "dwlr_ap_034"
          ],
          Talupula: [
          "dwlr_ap_035"
          ],
          Tanakal: [
          "dwlr_ap_036"
          ],
          Uravakonda: [
          "dwlr_ap_037"
          ],
          Vajrakarur: [
          "dwlr_ap_038"
          ]
      },
      Chittoor: {
          Bangarupalem: [
          "dwlr_ap_039",
          "dwlr_ap_040",
          "dwlr_ap_041"
          ],
          BuchinaiduKandrika: [
          "dwlr_ap_042"
          ],
          Chandragiri: [
          "dwlr_ap_043"
          ],
          Chittoor: [
          "dwlr_ap_044",
          "dwlr_ap_045",
          "dwlr_ap_046"
          ],
          Gudupalle: [
          "dwlr_ap_047"
          ],
          Kalakada: [
          "dwlr_ap_048",
          "dwlr_ap_049"
          ],
          Kalikiri: [
          "dwlr_ap_050"
          ],
          Krishnapuram: [
          "dwlr_ap_051"
          ],
          Palamaner: [
          "dwlr_ap_052"
          ],
          Peddamandyam: [
          "dwlr_ap_053"
          ],
          Santhipuram: [
          "dwlr_ap_054",
          "dwlr_ap_055"
          ],
          Peddatippasamudra: [
          "dwlr_ap_056"
          ],
          Pulicherla: [
          "dwlr_ap_057"
          ],
          Punganur: [
          "dwlr_ap_058"
          ],
          Puthalapattu: [
          "dwlr_ap_059",
          "dwlr_ap_060"
          ],
          Puttur: [
          "dwlr_ap_061"
          ],
          Ramakuppam: [
          "dwlr_ap_062"
          ],
          Ramasamudram: [
          "dwlr_ap_063",
          "dwlr_ap_064"
          ],
          Renigunta: [
          "dwlr_ap_065"
          ],
          Rompicherla: [
          "dwlr_ap_066",
          "dwlr_ap_067"
          ],
          Satyavedu: [
          "dwlr_ap_068"
          ],
          Sodum: [
          "dwlr_ap_069",
          "dwlr_ap_070",
          "dwlr_ap_071"
          ],
          Somala: [
          "dwlr_ap_072",
          "dwlr_ap_073",
          "dwlr_ap_074",
          "dwlr_ap_075"
          ],
          Srikalahasthi: [
          "dwlr_ap_076",
          "dwlr_ap_077"
          ],
          Srirangarajupuram: [
          "dwlr_ap_078"
          ],
          Thambalapalle: [
          "dwlr_ap_079"
          ],
          Tirupati_R: [
          "dwlr_ap_080",
          "dwlr_ap_081",
          "dwlr_ap_082"
          ],
          Tirupati_U: [
          "dwlr_ap_083"
          ],
          Varadaiahpalem: [
          "dwlr_ap_084"
          ],
          Vayalpadu: [
          "dwlr_ap_085"
          ],
          Vedurukuppam: [
          "dwlr_ap_086"
          ],
          Venkatagirikota: [
          "dwlr_ap_087",
          "dwlr_ap_088"
          ],
          Yadamarri: [
          "dwlr_ap_089"
          ]
      },
      WestGodavari: {
          Polavaram: [
          "dwlr_ap_090",
          "dwlr_ap_110",
          "dwlr_ap_606",
          "dwlr_ap_607",
          "dwlr_ap_608",
          "dwlr_ap_609"
          ],
          Rajolu: [
          "dwlr_ap_174",
          "dwlr_ap_175"
          ],
          Rajanagaram: [
          "dwlr_ap_183"
          ],
          Serilingampalle: [
          "dwlr_ap_190"
          ],
          WestGodavari: [
          "dwlr_ap_402"
          ],
          Akiveedu: [
          "dwlr_ap_569"
          ],
          Attili: [
          "dwlr_ap_570",
          "dwlr_ap_571"
          ],
          Bhimavaram: [
          "dwlr_ap_572"
          ],
          Buttayagudem: [
          "dwlr_ap_573",
          "dwlr_ap_574",
          "dwlr_ap_575"
          ],
          Chintalapudi: [
          "dwlr_ap_576"
          ],
          Dwarakatirumala: [
          "dwlr_ap_577"
          ],
          Eluru: [
          "dwlr_ap_578",
          "dwlr_ap_579",
          "dwlr_ap_580"
          ],
          Ganapavaram: [
          "dwlr_ap_581"
          ],
          Gopalapuram: [
          "dwlr_ap_582",
          "dwlr_ap_583",
          "dwlr_ap_584"
          ],
          Iragavaram: [
          "dwlr_ap_585",
          "dwlr_ap_586",
          "dwlr_ap_587",
          "dwlr_ap_588",
          "dwlr_ap_589"
          ],
          Jangareddigudem: [
          "dwlr_ap_590",
          "dwlr_ap_591"
          ],
          Kamavarapukota: [
          "dwlr_ap_592"
          ],
          Kovvuru: [
          "dwlr_ap_593"
          ],
          Koyyalagudem: [
          "dwlr_ap_594"
          ],
          Lingapalem: [
          "dwlr_ap_595"
          ],
          Mogalturu: [
          "dwlr_ap_596",
          "dwlr_ap_597",
          "dwlr_ap_598"
          ],
          Narsapur: [
          "dwlr_ap_599",
          "dwlr_ap_600",
          "dwlr_ap_601"
          ],
          Nidadavole: [
          "dwlr_ap_602",
          "dwlr_ap_603"
          ],
          Pedapadu: [
          "dwlr_ap_604",
          "dwlr_ap_605"
          ]
      },
      Cuddapah: {
          Brahmamgarimatham: [
          "dwlr_ap_091",
          "dwlr_ap_092",
          "dwlr_ap_093",
          "dwlr_ap_094"
          ],
          Chakrayapeta: [
          "dwlr_ap_095"
          ],
          Chapad: [
          "dwlr_ap_096",
          "dwlr_ap_097",
          "dwlr_ap_098"
          ],
          Chinnamandyam: [
          "dwlr_ap_099"
          ],
          D_Kodur: [
          "dwlr_ap_100"
          ],
          Duvvur: [
          "dwlr_ap_101"
          ],
          Galiveedu: [
          "dwlr_ap_102",
          "dwlr_ap_103"
          ],
          Jammalamadugu: [
          "dwlr_ap_104"
          ],
          Kalasapadu: [
          "dwlr_ap_105"
          ],
          Pullampet: [
          "dwlr_ap_106"
          ],
          Rajampet: [
          "dwlr_ap_107",
          "dwlr_ap_108"
          ],
          Ramapuram: [
          "dwlr_ap_109"
          ],
          Sandepalle: [
          "dwlr_ap_111"
          ],
          Simhadripuram: [
          "dwlr_ap_112"
          ],
          T_Sundupalle: [
          "dwlr_ap_113"
          ],
          Veeraballe: [
          "dwlr_ap_114"
          ],
          Veerapanayanipalle: [
          "dwlr_ap_115",
          "dwlr_ap_116"
          ],
          Vempalle: [
          "dwlr_ap_117",
          "dwlr_ap_118"
          ],
          Vemula: [
          "dwlr_ap_119"
          ]
      },
      EastGodavari: {
          Addatigala: [
          "dwlr_ap_120",
          "dwlr_ap_121",
          "dwlr_ap_122"
          ],
          Ainavilli: [
          "dwlr_ap_123",
          "dwlr_ap_124",
          "dwlr_ap_125"
          ],
          Amalapuram: [
          "dwlr_ap_126",
          "dwlr_ap_127",
          "dwlr_ap_128"
          ],
          Ambajupeta: [
          "dwlr_ap_129",
          "dwlr_ap_130"
          ],
          Atreyapuram: [
          "dwlr_ap_131",
          "dwlr_ap_132",
          "dwlr_ap_133"
          ],
          Devipatnam: [
          "dwlr_ap_134"
          ],
          Gangavaram: [
          "dwlr_ap_135",
          "dwlr_ap_136"
          ],
          Gokavaram: [
          "dwlr_ap_137",
          "dwlr_ap_138"
          ],
          Gollaprolu: [
          "dwlr_ap_139"
          ],
          I_Polavaram: [
          "dwlr_ap_140",
          "dwlr_ap_141",
          "dwlr_ap_142"
          ],
          Kakinada_R: [
          "dwlr_ap_143",
          "dwlr_ap_144",
          "dwlr_ap_145"
          ],
          Kakinada_U: [
          "dwlr_ap_146",
          "dwlr_ap_147",
          "dwlr_ap_148",
          "dwlr_ap_149",
          "dwlr_ap_150",
          "dwlr_ap_151"
          ],
          Kotananduru: [
          "dwlr_ap_152"
          ],
          Kothapalle: [
          "dwlr_ap_153"
          ],
          Kothapeta: [
          "dwlr_ap_154"
          ],
          Madapeta: [
          "dwlr_ap_155",
          "dwlr_ap_156"
          ],
          Rajahmundry_U: [
          "dwlr_ap_157",
          "dwlr_ap_158"
          ],
          Rajanagaram: [
          "dwlr_ap_159",
          "dwlr_ap_160",
          "dwlr_ap_161"
          ],
          Rajavommangi: [
          "dwlr_ap_162",
          "dwlr_ap_163",
          "dwlr_ap_164",
          "dwlr_ap_165"
          ],
          Ramachandrapuram: [
          "dwlr_ap_166",
          "dwlr_ap_167",
          "dwlr_ap_168",
          "dwlr_ap_169"
          ],
          Rampachodavaram: [
          "dwlr_ap_170",
          "dwlr_ap_171",
          "dwlr_ap_172",
          "dwlr_ap_173"
          ],
          Ravulapalem: [
          "dwlr_ap_176",
          "dwlr_ap_177",
          "dwlr_ap_178"
          ],
          Razole: [
          "dwlr_ap_179"
          ],
          Sakhinetipalle: [
          "dwlr_ap_180"
          ],
          Sankhavaram: [
          "dwlr_ap_181",
          "dwlr_ap_182"
          ],
          Tallarevu: [
          "dwlr_ap_184"
          ],
          Thondangi: [
          "dwlr_ap_185"
          ],
          Tuni: [
          "dwlr_ap_186",
          "dwlr_ap_187"
          ],
          Y_Ramavaram: [
          "dwlr_ap_188",
          "dwlr_ap_189"
          ]
      },
      Guntur: {
          Amaravati: [
          "dwlr_ap_191",
          "dwlr_ap_192",
          "dwlr_ap_193",
          "dwlr_ap_194"
          ],
          Amruthaluru: [
          "dwlr_ap_195",
          "dwlr_ap_196"
          ],
          Atchampeta: [
          "dwlr_ap_197"
          ],
          Bapatla: [
          "dwlr_ap_198",
          "dwlr_ap_199"
          ],
          Battiprolu: [
          "dwlr_ap_200",
          "dwlr_ap_201",
          "dwlr_ap_202",
          "dwlr_ap_203"
          ],
          Bellamkonda: [
          "dwlr_ap_204",
          "dwlr_ap_205"
          ],
          Chebrolu: [
          "dwlr_ap_206"
          ],
          Chilakaluripet: [
          "dwlr_ap_207"
          ],
          Chirala: [
          "dwlr_ap_208"
          ],
          Chowduvalli: [
          "dwlr_ap_209",
          "dwlr_ap_210"
          ],
          Guntur: [
          "dwlr_ap_211"
          ],
          Krishna: [
          "dwlr_ap_212",
          "dwlr_ap_213",
          "dwlr_ap_214",
          "dwlr_ap_215",
          "dwlr_ap_216"
          ],
          Krosuru: [
          "dwlr_ap_217"
          ],
          Machavaram: [
          "dwlr_ap_218"
          ],
          Macherla: [
          "dwlr_ap_219",
          "dwlr_ap_220"
          ],
          Medikonduru: [
          "dwlr_ap_221"
          ],
          Muppala: [
          "dwlr_ap_222"
          ],
          Nadendla: [
          "dwlr_ap_223"
          ],
          Narsaraopet: [
          "dwlr_ap_224",
          "dwlr_ap_225",
          "dwlr_ap_226"
          ],
          Nizampatnam: [
          "dwlr_ap_227",
          "dwlr_ap_228"
          ],
          Nuzendla: [
          "dwlr_ap_229"
          ],
          Pedanandipadu: [
          "dwlr_ap_230"
          ],
          Phirangipuram: [
          "dwlr_ap_231"
          ],
          Piduguralla: [
          "dwlr_ap_232",
          "dwlr_ap_233",
          "dwlr_ap_234",
          "dwlr_ap_235",
          "dwlr_ap_236"
          ],
          Pittalavanipalem: [
          "dwlr_ap_237"
          ],
          Ponnuru: [
          "dwlr_ap_238",
          "dwlr_ap_239"
          ],
          Prathipadu: [
          "dwlr_ap_240"
          ],
          Rajupalem: [
          "dwlr_ap_241",
          "dwlr_ap_242"
          ],
          Rentachintala: [
          "dwlr_ap_243",
          "dwlr_ap_244"
          ],
          Repalle: [
          "dwlr_ap_245",
          "dwlr_ap_246",
          "dwlr_ap_247"
          ],
          Rompicherla: [
          "dwlr_ap_248",
          "dwlr_ap_249",
          "dwlr_ap_250"
          ],
          Sattenapalle: [
          "dwlr_ap_251",
          "dwlr_ap_252"
          ],
          Savalyapuram: [
          "dwlr_ap_253"
          ],
          Tadikonda: [
          "dwlr_ap_254",
          "dwlr_ap_255",
          "dwlr_ap_256",
          "dwlr_ap_257"
          ],
          Tenali: [
          "dwlr_ap_258",
          "dwlr_ap_259",
          "dwlr_ap_260",
          "dwlr_ap_261",
          "dwlr_ap_262"
          ],
          Thulluru: [
          "dwlr_ap_263",
          "dwlr_ap_264",
          "dwlr_ap_265",
          "dwlr_ap_266"
          ],
          Veldurti: [
          "dwlr_ap_267",
          "dwlr_ap_268"
          ],
          Vemuru: [
          "dwlr_ap_269",
          "dwlr_ap_270"
          ],
          Vinukonda: [
          "dwlr_ap_271",
          "dwlr_ap_272",
          "dwlr_ap_273",
          "dwlr_ap_274",
          "dwlr_ap_275"
          ],
          Winukonda: [
          "dwlr_ap_276",
          "dwlr_ap_277"
          ]
      },
      Krishna: {
          Ibrahimpatnam: [
          "dwlr_ap_278"
          ],
          Jaggayyapeta: [
          "dwlr_ap_279"
          ],
          Kaikaluru: [
          "dwlr_ap_280"
          ],
          Kalidindi: [
          "dwlr_ap_281"
          ],
          Kanchikacherla: [
          "dwlr_ap_282"
          ],
          Koduru: [
          "dwlr_ap_283",
          "dwlr_ap_284"
          ],
          Machilipatnam: [
          "dwlr_ap_285",
          "dwlr_ap_286"
          ],
          Mandavalli: [
          "dwlr_ap_287",
          "dwlr_ap_288",
          "dwlr_ap_289"
          ],
          Movva: [
          "dwlr_ap_290"
          ],
          Mudinepalle: [
          "dwlr_ap_291",
          "dwlr_ap_292",
          "dwlr_ap_293",
          "dwlr_ap_294"
          ],
          Musunuru: [
          "dwlr_ap_295"
          ],
          Mylavaram: [
          "dwlr_ap_296",
          "dwlr_ap_297"
          ],
          Nagayalanka: [
          "dwlr_ap_298"
          ],
          Nandigama: [
          "dwlr_ap_299",
          "dwlr_ap_300"
          ],
          Nuzividu: [
          "dwlr_ap_301",
          "dwlr_ap_302"
          ],
          Pamarru: [
          "dwlr_ap_303"
          ],
          Pamidimukkala: [
          "dwlr_ap_304"
          ],
          Pedana: [
          "dwlr_ap_305",
          "dwlr_ap_306",
          "dwlr_ap_307",
          "dwlr_ap_308"
          ],
          Penuganchiprolu: [
          "dwlr_ap_309"
          ],
          Reddigudem: [
          "dwlr_ap_310"
          ],
          Tiruvuru: [
          "dwlr_ap_311",
          "dwlr_ap_312"
          ],
          Vatsavai: [
          "dwlr_ap_313"
          ],
          Veerulapadu: [
          "dwlr_ap_314"
          ],
          Vissannapeta: [
          "dwlr_ap_315"
          ],
          Vuyyuru: [
          "dwlr_ap_316",
          "dwlr_ap_317",
          "dwlr_ap_318"
          ]
      },
      Kurnool: {
          Adoni: [
          "dwlr_ap_319",
          "dwlr_ap_320",
          "dwlr_ap_321",
          "dwlr_ap_322",
          "dwlr_ap_323"
          ],
          Allagadda: [
          "dwlr_ap_324"
          ],
          Alur: [
          "dwlr_ap_325"
          ],
          Atmakur: [
          "dwlr_ap_326",
          "dwlr_ap_327"
          ],
          Banaganapalle: [
          "dwlr_ap_328"
          ],
          Pattikonda: [
          "dwlr_ap_329"
          ],
          Peapalle: [
          "dwlr_ap_330",
          "dwlr_ap_331"
          ],
          Rudravaram: [
          "dwlr_ap_332"
          ],
          Srisailam: [
          "dwlr_ap_333"
          ],
          Uyyalawada: [
          "dwlr_ap_334"
          ],
          Veldurthi: [
          "dwlr_ap_335"
          ],
          Velugodu: [
          "dwlr_ap_336"
          ]
      },
      Nellore: {
          Allur: [
          "dwlr_ap_337",
          "dwlr_ap_338",
          "dwlr_ap_339",
          "dwlr_ap_340"
          ],
          Atmakur: [
          "dwlr_ap_341",
          "dwlr_ap_342",
          "dwlr_ap_343"
          ],
          Balayapalli: [
          "dwlr_ap_344"
          ],
          Bogole: [
          "dwlr_ap_345",
          "dwlr_ap_346"
          ],
          Chejerla: [
          "dwlr_ap_347",
          "dwlr_ap_348",
          "dwlr_ap_349"
          ],
          Chillakur: [
          "dwlr_ap_350",
          "dwlr_ap_351"
          ],
          Chittamur: [
          "dwlr_ap_352"
          ],
          Doravarisatram: [
          "dwlr_ap_353"
          ],
          Duttalur: [
          "dwlr_ap_354",
          "dwlr_ap_355",
          "dwlr_ap_356"
          ],
          Gudur: [
          "dwlr_ap_357"
          ],
          Jaladandi: [
          "dwlr_ap_358"
          ],
          Kaligiri: [
          "dwlr_ap_359",
          "dwlr_ap_360"
          ],
          Kavali: [
          "dwlr_ap_361"
          ],
          Koluvoya: [
          "dwlr_ap_362"
          ],
          Kondapuram: [
          "dwlr_ap_363",
          "dwlr_ap_364"
          ],
          Kondavalur: [
          "dwlr_ap_365"
          ],
          Kota: [
          "dwlr_ap_366",
          "dwlr_ap_367",
          "dwlr_ap_368"
          ],
          Kovvur: [
          "dwlr_ap_369",
          "dwlr_ap_370"
          ],
          Manubolu: [
          "dwlr_ap_371",
          "dwlr_ap_372"
          ],
          Marripadu: [
          "dwlr_ap_373"
          ],
          Muthukur: [
          "dwlr_ap_374",
          "dwlr_ap_375",
          "dwlr_ap_376",
          "dwlr_ap_377"
          ],
          Naidupeta: [
          "dwlr_ap_378"
          ],
          Nellore: [
          "dwlr_ap_379",
          "dwlr_ap_380"
          ],
          Podalakur: [
          "dwlr_ap_381",
          "dwlr_ap_382"
          ],
          Santhanuthalapadu: [
          "dwlr_ap_383"
          ],
          Srikalahasti: [
          "dwlr_ap_384",
          "dwlr_ap_385",
          "dwlr_ap_386",
          "dwlr_ap_387",
          "dwlr_ap_388"
          ],
          Varikuntapadu: [
          "dwlr_ap_389"
          ]
      },
      Prakasam: {
          Chandrasekharapura: [
          "dwlr_ap_390"
          ],
          Chimakurti: [
          "dwlr_ap_391",
          "dwlr_ap_392"
          ],
          ChinnaGanjam: [
          "dwlr_ap_393"
          ],
          Chirala: [
          "dwlr_ap_394",
          "dwlr_ap_395"
          ],
          Darsi: [
          "dwlr_ap_396",
          "dwlr_ap_397",
          "dwlr_ap_398"
          ],
          Donakonda: [
          "dwlr_ap_399",
          "dwlr_ap_400",
          "dwlr_ap_401"
          ],
          Dornala: [
          "dwlr_ap_403"
          ],
          Giddalur: [
          "dwlr_ap_404",
          "dwlr_ap_405"
          ],
          Hanumanthunipadu: [
          "dwlr_ap_406",
          "dwlr_ap_407"
          ],
          Inkollu: [
          "dwlr_ap_408",
          "dwlr_ap_409"
          ],
          JanakavaramPangullu: [
          "dwlr_ap_410",
          "dwlr_ap_411"
          ],
          Kandukur: [
          "dwlr_ap_412"
          ],
          Kanigiri: [
          "dwlr_ap_413",
          "dwlr_ap_414",
          "dwlr_ap_415",
          "dwlr_ap_416"
          ],
          Karamchedu: [
          "dwlr_ap_417",
          "dwlr_ap_418"
          ],
          Komarole: [
          "dwlr_ap_419"
          ],
          Kondepi: [
          "dwlr_ap_420"
          ],
          Korisapadu: [
          "dwlr_ap_421"
          ],
          Kurichedu: [
          "dwlr_ap_422",
          "dwlr_ap_423",
          "dwlr_ap_424"
          ],
          Lingasamudram: [
          "dwlr_ap_425"
          ],
          Maddipadu: [
          "dwlr_ap_426"
          ],
          Markapur: [
          "dwlr_ap_427",
          "dwlr_ap_428",
          "dwlr_ap_429"
          ],
          Marripudi: [
          "dwlr_ap_430",
          "dwlr_ap_431"
          ],
          Mundalamur: [
          "dwlr_ap_432",
          "dwlr_ap_433"
          ],
          Naguluppalapadu: [
          "dwlr_ap_434",
          "dwlr_ap_435"
          ],
          Ongole: [
          "dwlr_ap_436",
          "dwlr_ap_437"
          ],
          Pamuru: [
          "dwlr_ap_438",
          "dwlr_ap_439",
          "dwlr_ap_440",
          "dwlr_ap_441"
          ],
          Prakasam: [
          "dwlr_ap_442",
          "dwlr_ap_443",
          "dwlr_ap_444"
          ],
          Veligandla: [
          "dwlr_ap_445"
          ],
          Vetapalem: [
          "dwlr_ap_446",
          "dwlr_ap_447"
          ],
          Voletivaripalem: [
          "dwlr_ap_448",
          "dwlr_ap_449",
          "dwlr_ap_450"
          ],
          Yerragondapalem: [
          "dwlr_ap_451",
          "dwlr_ap_452"
          ]
      },
      Srikakulam: {
          Amudalavalasa: [
          "dwlr_ap_453"
          ],
          Gara: [
          "dwlr_ap_454",
          "dwlr_ap_455",
          "dwlr_ap_456",
          "dwlr_ap_457",
          "dwlr_ap_458",
          "dwlr_ap_459"
          ],
          Heeramandalam: [
          "dwlr_ap_460",
          "dwlr_ap_461",
          "dwlr_ap_462",
          "dwlr_ap_463"
          ],
          Ichapuram: [
          "dwlr_ap_464"
          ],
          Kanchili: [
          "dwlr_ap_465"
          ],
          Kothabommali: [
          "dwlr_ap_466",
          "dwlr_ap_467"
          ],
          Kothuru: [
          "dwlr_ap_468"
          ],
          Kunduru: [
          "dwlr_ap_469"
          ],
          Laveru: [
          "dwlr_ap_470"
          ],
          Mandasa: [
          "dwlr_ap_471"
          ],
          Meliaputti: [
          "dwlr_ap_472",
          "dwlr_ap_473",
          "dwlr_ap_474",
          "dwlr_ap_475"
          ],
          Nandigaon: [
          "dwlr_ap_476",
          "dwlr_ap_477"
          ],
          Palakonda: [
          "dwlr_ap_478",
          "dwlr_ap_479"
          ],
          Palasa: [
          "dwlr_ap_480",
          "dwlr_ap_481"
          ],
          Patapatnam: [
          "dwlr_ap_482"
          ],
          Polaki: [
          "dwlr_ap_483"
          ],
          Rajam: [
          "dwlr_ap_484"
          ],
          Santabommali: [
          "dwlr_ap_485"
          ],
          Saravakota: [
          "dwlr_ap_486"
          ],
          Seetampeta: [
          "dwlr_ap_487",
          "dwlr_ap_488"
          ],
          Sompeta: [
          "dwlr_ap_489",
          "dwlr_ap_490",
          "dwlr_ap_491",
          "dwlr_ap_492"
          ],
          Srikakulam: [
          "dwlr_ap_493",
          "dwlr_ap_494",
          "dwlr_ap_495",
          "dwlr_ap_496"
          ],
          Tekkali: [
          "dwlr_ap_497",
          "dwlr_ap_498"
          ],
          Veeraghattam: [
          "dwlr_ap_499",
          "dwlr_ap_500",
          "dwlr_ap_501",
          "dwlr_ap_502"
          ]
      },
      Visakhapatnam: {
          "Kotauratla": [
          "dwlr_ap_503",
          "dwlr_ap_504",
          "dwlr_ap_505"
          ],
          Koyyuru: [
          "dwlr_ap_506",
          "dwlr_ap_507"
          ],
          Nakkalli: [
          "dwlr_ap_508"
          ],
          Paderu: [
          "dwlr_ap_509",
          "dwlr_ap_510",
          "dwlr_ap_511",
          "dwlr_ap_512"
          ],
          Peddabayalu: [
          "dwlr_ap_513"
          ],
          Pendurti: [
          "dwlr_ap_514",
          "dwlr_ap_515",
          "dwlr_ap_516"
          ],
          Rambilli: [
          "dwlr_ap_517"
          ],
          Ravikamatam: [
          "dwlr_ap_518",
          "dwlr_ap_519"
          ],
          Rolugunta: [
          "dwlr_ap_520"
          ],
          S_Rayavaram: [
          "dwlr_ap_521",
          "dwlr_ap_522",
          "dwlr_ap_523"
          ],
          Visakhapatnam_U: [
          "dwlr_ap_524",
          "dwlr_ap_525",
          "dwlr_ap_526",
          "dwlr_ap_527",
          "dwlr_ap_528",
          "dwlr_ap_529",
          "dwlr_ap_530",
          "dwlr_ap_531",
          "dwlr_ap_532",
          "dwlr_ap_533",
          "dwlr_ap_534",
          "dwlr_ap_535"
          ],
          Yelamanchili: [
          "dwlr_ap_536"
          ]
      },
      Vizianagaram: {
          "Badangi": [
          "dwlr_ap_537",
          "dwlr_ap_538"
          ],
          Balijipeta: [
          "dwlr_ap_539",
          "dwlr_ap_540",
          "dwlr_ap_541"
          ],
          Bhogapuram: [
          "dwlr_ap_542",
          "dwlr_ap_543"
          ],
          Bobbili: [
          "dwlr_ap_544",
          "dwlr_ap_545"
          ],
          Bondapalle: [
          "dwlr_ap_546",
          "dwlr_ap_547",
          "dwlr_ap_548"
          ],
          Dattirajera: [
          "dwlr_ap_549"
          ],
          Denkada: [
          "dwlr_ap_550"
          ],
          Gantyada: [
          "dwlr_ap_551",
          "dwlr_ap_552",
          "dwlr_ap_553"
          ],
          Makkuva: [
          "dwlr_ap_554"
          ],
          Merakamudidam: [
          "dwlr_ap_555"
          ],
          Parvatipuram: [
          "dwlr_ap_556"
          ],
          Puspatirega: [
          "dwlr_ap_557",
          "dwlr_ap_558"
          ],
          Ramabhadrapuram: [
          "dwlr_ap_559"
          ],
          Saluru: [
          "dwlr_ap_560",
          "dwlr_ap_561"
          ],
          Seetanagaram: [
          "dwlr_ap_562"
          ],
          Srungavarapukota: [
          "dwlr_ap_563",
          "dwlr_ap_564"
          ],
          Therlam: [
          "dwlr_ap_565",
          "dwlr_ap_566",
          "dwlr_ap_567"
          ],
          Vizianagaram: [
          "dwlr_ap_568"
          ]
      }
  }
};

const SelectDwlrid = ({ id, triggerNextStep }) => {
  const [dwlrOptions, setDwlrOptions] = useState([]);
  const [selectedDwlr, setSelectedDwlr] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const { district, state , setDwlrid, block} = useContext(GlobalContext);

  useEffect(() => {
    if (state && district && options[state] && options[state][district] && options[state][district][block]) {
      const dwlrs = options[state][district][block].map((dwlr) => ({
        value: dwlr,
        label: dwlr,
      }));
      setDwlrOptions(dwlrs);
    } else {
      setDwlrOptions([]);
    }
    setSelectedDwlr(null); 
  }, [state, district, block]);

  const handleChange = (selectedOption) => {
    setSelectedDwlr(selectedOption ? selectedOption.value : null);
  };

  const handleSubmit = () => {
    if (selectedDwlr) {
      setIsDisabled(true);
      setDwlrid(selectedDwlr)
      if(id === 1)
        triggerNextStep({ value: selectedDwlr, trigger: '9' });
      else  
        triggerNextStep({ value: selectedDwlr, trigger: '22' });
    } else {
      alert('Please select a DWLR before submitting.');
    }
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      width: '250px',
      minWidth: '200px',
    }),
  };

  const buttonStyle = {
    padding: '9px 20px',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    backgroundColor: isDisabled ? '#d6d6d6' : '#00994C',
    color: isDisabled ? '#6c757d' : 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '14px',
    boxShadow: isDisabled ? 'none' : '0px 4px 6px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Select
        options={dwlrOptions}
        value={dwlrOptions.find((option) => option.value === selectedDwlr)}
        onChange={handleChange}
        isClearable={true}
        isDisabled={isDisabled || dwlrOptions.length === 0}
        placeholder="Select a DWLR"
        styles={customStyles}
      />
      <button
        onClick={handleSubmit}
        disabled={isDisabled}
        style={buttonStyle}
      >
        Get Details
      </button>
    </div>
  );
};
export default SelectDwlrid;
