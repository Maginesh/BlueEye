import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { GlobalContext } from '../../GlobalContext';

const options = {
  goa: {
    NorthGoa: ['Bardez', 'Bicholim', 'Pernem', 'Ponda', 'Sattari', 'Tiswadi'],
    SouthGoa: ['Canacona', 'Margao', 'Sanguem', 'Quepem'],
  },
  arunachal: {
      Changlang: [
          "Manmao-Jairampur Circle",
          "Miao Circle"
      ],
      EastSiang: [
          "Pasighat",
          "Ruksin"
      ],
      Lohit: [
          "Namsai Circle"
      ],
      LowerDibangValley: [
          "Roing"
      ],
      LowerSubansiri: [
          "Tamen-Raga"
      ],
      Papumpare: [
          "Balijan",
          "Doimukh",
          "Kimin"
      ],
      Tirap: [
          "Deomali Circle",
          "Khonsa Circle"
      ]
  },
  west_bengal: {
      Alipurduar: [
          "Alipurduar I",
          "Alipurduar Ii",
          "Falakata",
          "Kalchini",
          "Kumargram",
          "Madarihat"
      ],
      Bankura: [
          "Bankura I",
          "Bankura Ii",
          "Barjora",
          "Bishnupur",
          "Raipur I",
          "Raipur Ii",
          "Ranibandh",
          "Saltora",
          "Simlapal",
          "Simlipal",
          "Sonamukhi",
          "Taldanga",
          "Taldangra"
      ],
      Birbhum: [
          "Bolpur",
          "Dubrajpur",
          "Nalhati",
          "Rajnagar",
          "Rampurhat",
          "Rampurhat I",
          "Sainthia",
          "Siuri I",
          "Sriniketan",
          "Suri Ii",
          "Suri I"
      ],
      CoochBihar: [
          "Sitai"
      ],
      DakshinDinajpur: [
          "Balurghat",
          "Bansihari",
          "Gangarampur",
          "Harirampur",
          "Hili",
          "Kumarganj",
          "Tapan"
      ],
      Darjeeling: [
          "Kharibari"
      ],
      Hugli: [
          "Balagarh",
          "Chinsura",
          "Chuchura",
          "Haripal",
          "Jirat",
          "Magra",
          "Pandua",
          "Polba",
          "Sherpur",
          "Srirampur",
          "Tarakeswar"
      ],
      Jalpaiguri: [
          "Dhupguri",
          "Jalpaiguri",
          "Mal",
          "Malbazar",
          "Mangalghat",
          "Matiali",
          "Maynaguri",
          "Moynaguri",
          "Nagrakata"
      ],
      Kochbehar: [
          "Mathabhanga I",
          "Mathabhanga Ii",
          "Mekhliganj",
          "Sahebgan",
          "Sitai",
          "Sitalkuchi",
          "Tufanganj",
          "Tufanganj Ii"
      ],
      Malda: [
          "Bamangola",
          "Bamongola",
          "English Bazar",
          "Gazole",
          "Gazol",
          "Habibpur",
          "Kaliachak I",
          "Kaliachak Iii",
          "Malda",
          "Manikchak",
          "Old Malda",
          "Ratua I"
      ],
      Murshidabad: [
          "Beldanga I",
          "Beldangai",
          "Domkal",
          "Karimpur I",
          "Karimpur II",
          "Krishnanagar"
      ],
      Howrah: [
          "Deulia",
          "Narayanpur",
          "Shibpur",
          "Shyampur"
      ],
      "P05-12-2024  20:05:00chim Barddhaman": [
          "05-12-2024  20:05:00ansol",
          "Barabani",
          "Baraboni",
          "Durgapur",
          "Hirapur",
          "Jamuria",
          "Jamuria I",
          "Jamuria Ii",
          "Kanksa",
          "Kanska",
          "Kulti",
          "Raniganj",
          "Salanpur"
      ],
      PurbaBarddhaman: [
          "Ausgram",
          "Ausgram I",
          "Ausgram Ii",
          "Barddhaman Sadar",
          "Bardhaman",
          "Bhatar",
          "Ekangarsarai",
          "Kanksha",
          "Katwa",
          "Mukutmanipur",
          "Raipur",
          "Sriniketan",
          "Vorada"
      ],
      Purulia: [
          " Barabazar",
          " Bundwan",
          " Hura"
      ]
  },
  karnataka: {
      Bagalkot: [
          "Badami",
          "Bagalkot",
          "Bilgi",
          "Hungund",
          "Jamkhandi",
          "Mudhol"
      ],
      BangaloreRural: [
          "Devanhalli",
          "Dodballapur",
          "Nayakanahalli",
          "Nelamangala"
      ],
      BangaloreUrban: [
          "Anekal",
          "Bangalore North",
          "Bangalore South"
      ],
      Belagavi: [
          "Parasgad",
          "Ramdurg",
          "Raybag",
          "Sampgaon"
      ],
      Bellary: [
          "Bellary",
          "Hadagalli",
          "Hospet",
          "Kudligi",
          "Sandur",
          "Siruguppa"
      ],
      Bidar: [
          "Aurad",
          "Basavakalyan",
          "Bhalki",
          "Bidar",
          "Homnabad"
      ],
      Bijapur: [
          "Basavana Bagewadi",
          "Bijapur",
          "Indi",
          "Muddebihal",
          "Sindagi"
      ],
      Chamarajanagar: [
          "Gundlupet",
          "Kollegal",
          "Yelandur"
      ],
      Chikballapur: [
          "Chikballapur",
          "Chintamani"
      ],
      Chikballapur: [
          " Gaudribidanur"
      ],
      Chikkamagalur: [
          " Chikkamagalur",
          " Kadur",
          " Koppa",
          " Mudigere"
      ],
      Chikkamagalur: [
          "Mudigere",
          "Narasimharajapura",
          "Sringeri",
          "Tarikere"
      ],
      Chitradurga: [
          "Chitradurga",
          "Hiriyur",
          "Holalkere",
          "Hosadurga",
          "Hosdurga",
          "Molakalmuru"
      ],
      DakshinKannada: [
          "Bantval",
          "Beltangadi",
          "Mangalore",
          "Puttur",
          "Sulya"
      ],
      Davanagere: [
          "Channagiri",
          "Davanagere",
          "Harapanahalli",
          "Harihar",
          "Honnali"
      ],
      Dharwad: [
          "Dharwad",
          "Hubbali",
          "Kalghatgi",
          "Kundgol",
          "Navalgund"
      ],
      Gadag: [
          "Gadag",
          "Mundargi",
          "Nargund",
          "Ron",
          "Shirhatti"
      ],
      Gulbarga: [
          "Afzalpur",
          "Aland",
          "Chincholi",
          "Chitapur",
          "Gulbarga",
          "Jevargi",
          "Sedam"
      ],
      Hassan: [
          "Alur",
          "Arkalgud",
          "Arsikere",
          "Belur",
          "Channarayapatana",
          "Hassan",
          "Holenarsipur",
          "Manjarabad"
      ],
      Haveri: [
          "Byadgi",
          "Hangal",
          "Hirekerur",
          "Ranibennur",
          "Shiggaon"
      ],
      Kodagu: [
          "Madikeri",
          "Somvarpet",
          "Virajpet"
      ],
      Kolar: [
          "Bangarapet",
          "Kolar",
          "Mulbagal"
      ],
      Koppal: [
          "Gangavathi",
          "Koppal",
          "Kushtagi",
          "Yelburga"
      ],
      Mandya: [
          "Krishnarajpet",
          "Maddur",
          "Malvalli",
          "Mandya",
          "Nagamangala",
          "Pandavapura",
          "Shrirangapattana"
      ],
      Mysore: [
          "Heggadadevankote",
          "Hunsur",
          "Krishnarajanagara",
          "Mysore",
          "Nanjangud",
          "Piriyapatna",
          "TirumakudalNarsipur"
      ],
      Raichur: [
          "Devadurga",
          "Lingsugur",
          "Manvi",
          "Raichur",
          "Sindhnur"
      ],
      Ramanagara: [
          "Channapatna",
          "Kanakapura",
          "Magadi",
          "Ramanagaram"
      ],
      Shimoga: [
          "Bhadravati",
          "Hosanagara",
          "Sagar",
          "Shikarpur",
          "Shimoga",
          "Sorab",
          "Tirthahalli"
      ],
      Tumkur: [
          "Cnhalli",
          "Gubbi",
          "Koratagere",
          "Kunigal",
          "Madhugiri",
          "Pavagada",
          "Sira",
          "Tiptur",
          "Tumkur",
          "Turuvekere"
      ],
      Udupi: [
          "Karkal",
          "Kundapura",
          "Udupi"
      ],
      UttaraKannada: [
          "Ankola",
          "Bhatkal",
          "Haliyal",
          "Honavar",
          "Karwar",
          "Kumta",
          "Mundgod",
          "Siddapur",
          "Sirsi",
          "Supa",
          "Yellapur"
      ]
  },
  andhra: {
      Anantapur: [
          "Amarapuram",
          "Atmakur",
          "Bukkarayasamudram",
          "Chennakothapalle",
          "Dharmavaram",
          "Gooty",
          "Gudibanda",
          "Guntakal",
          "Kadiri",
          "Kalyandurg",
          "Lepakshi",
          "Madakasira",
          "Mudigubba",
          "Nallacheruvu",
          "Nallamada",
          "Obuladevaracheruvu",
          "Penukonda",
          "Puttaparti",
          "Rayadurg",
          "Rolla",
          "Tadipatri",
          "Talupula",
          "Tanakal",
          "Uravakonda",
          "Vajrakarur"
      ],
      Chittoor: [
          "Bangarupalem",
          "Buchinaidu-Kandrika",
          "Chandragiri",
          "Chittoor",
          "Gudupalle",
          "Kalakada",
          "Kalikiri",
          "Krishnapuram",
          "Palamaner",
          "Peddamandyam",
          "Santhipuram",
          "Peddatippasamudra",
          "Pulicherla",
          "Punganur",
          "Puthalapattu",
          "Puttur",
          "Ramakuppam",
          "Ramasamudram",
          "Renigunta",
          "Rompicherla",
          "Satyavedu",
          "Sodum",
          "Somala",
          "Srikalahasthi",
          "Srirangarajupuram",
          "Thambalapalle",
          "Tirupati(R)",
          "Tirupati(U)",
          "Varadaiahpalem",
          "Vayalpadu",
          "Vedurukuppam",
          "Venkatagirikota",
          "Yadamarri"
      ],
      WestGodavari: [
          "Polavaram",
          "Rajolu",
          "Rajanagaram",
          "Serilingampalle",
          "West Godavari",
          "Akiveedu",
          "Attili",
          "Bhimavaram",
          "Buttayagudem",
          "Chintalapudi",
          "Dwarakatirumala",
          "Eluru",
          "Ganapavaram",
          "Gopalapuram",
          "Iragavaram",
          "Jangareddigudem",
          "Kamavarapukota",
          "Kovvuru",
          "Koyyalagudem",
          "Lingapalem",
          "Mogalturu",
          "Narsapur",
          "Nidadavole",
          "Pedapadu"
      ],
      Cuddapah: [
          "Brahmamgarimatham",
          "Chakrayapeta",
          "Chapad",
          "Chinnamandyam",
          "D.Kodur",
          "Duvvur",
          "Galiveedu",
          "Jammalamadugu",
          "Kalasapadu",
          "Pullampet",
          "Rajampet",
          "Ramapuram",
          "Sandepalle",
          "Simhadripuram",
          "T.Sundupalle",
          "Veeraballe",
          "Veerapanayanipalle",
          "Vempalle",
          "Vemula"
      ],
      EastGodavari: [
          "Addatigala",
          "Ainavilli",
          "Amalapuram",
          "Ambajupeta",
          "Atreyapuram",
          "Devipatnam",
          "Gangavaram",
          "Gokavaram",
          "Gollaprolu",
          "I.Polavaram",
          "Kakinada(R)",
          "Kakinada(U)",
          "Kotananduru",
          "Kothapalle",
          "Kothapeta",
          "Madapeta",
          "Rajahmundry(U)",
          "Rajanagaram",
          "Rajavommangi",
          "Ramachandrapuram",
          "Rampachodavaram",
          "Ravulapalem",
          "Razole",
          "Sakhinetipalle",
          "Sankhavaram",
          "Tallarevu",
          "Thondangi",
          "Tuni",
          "Y.Ramavaram"
      ],
      Guntur: [
          "Amaravati",
          "Amruthaluru",
          "Atchampeta",
          "Bapatla",
          "Battiprolu",
          "Bellamkonda",
          "Chebrolu",
          "Chilakaluripet",
          "Chirala",
          "Chowduvalli",
          "Guntur",
          "Krishna",
          "Krosuru",
          "Machavaram",
          "Macherla",
          "Medikonduru",
          "Muppala",
          "Nadendla",
          "Narsaraopet",
          "Nizampatnam",
          "Nuzendla",
          "Pedanandipadu",
          "Phirangipuram",
          "Piduguralla",
          "Pittalavanipalem",
          "Ponnuru",
          "Prathipadu",
          "Rajupalem",
          "Rentachintala",
          "Repalle",
          "Rompicherla",
          "Sattenapalle",
          "Savalyapuram",
          "Tadikonda",
          "Tenali",
          "Thulluru",
          "Veldurti",
          "Vemuru",
          "Vinukonda",
          "Winukonda"
      ],
      Krishna: [
          "Ibrahimpatnam",
          "Jaggayyapeta",
          "Kaikaluru",
          "Kalidindi",
          "Kanchikacherla",
          "Koduru",
          "Machilipatnam",
          "Mandavalli",
          "Movva",
          "Mudinepalle",
          "Musunuru",
          "Mylavaram",
          "Nagayalanka",
          "Nandigama",
          "Nuzividu",
          "Pamarru",
          "Pamidimukkala",
          "Pedana",
          "Penuganchiprolu",
          "Reddigudem",
          "Tiruvuru",
          "Vatsavai",
          "Veerulapadu",
          "Vissannapeta",
          "Vuyyuru"
      ],
      Kurnool: [
          "Adoni",
          "Allagadda",
          "Alur",
          "Atmakur",
          "Banaganapalle",
          "Pattikonda",
          "Peapalle",
          "Rudravaram",
          "Srisailam",
          "Uyyalawada",
          "Veldurthi",
          "Velugodu"
      ],
      Nellore: [
          "Allur",
          "Atmakur",
          "Balayapalli",
          "Bogole",
          "Chejerla",
          "Chillakur",
          "Chittamur",
          "Doravarisatram",
          "Duttalur",
          "Gudur",
          "Jaladandi",
          "Kaligiri",
          "Kavali",
          "Koluvoya",
          "Kondapuram",
          "Kondavalur",
          "Kota",
          "Kovvur",
          "Manubolu",
          "Marripadu",
          "Muthukur",
          "Naidupeta",
          "Nellore",
          "Podalakur",
          "Santhanuthalapadu",
          "Srikalahasti",
          "Varikuntapadu"
      ],
      Prakasam: [
          "Chandrasekharapura",
          "Chimakurti",
          "Chinna Ganjam",
          "Chirala",
          "Darsi",
          "Donakonda",
          "Dornala",
          "Giddalur",
          "Hanumanthunipadu",
          "Inkollu",
          "JanakavaramPangullu",
          "Kandukur",
          "Kanigiri",
          "Karamchedu",
          "Komarole",
          "Kondepi",
          "Korisapadu",
          "Kurichedu",
          "Lingasamudram",
          "Maddipadu",
          "Markapur",
          "Marripudi",
          "Mundalamur",
          "Naguluppalapadu",
          "Ongole",
          "Pamuru",
          "Prakasam",
          "Veligandla",
          "Vetapalem",
          "Voletivaripalem",
          "Yerragondapalem"
      ],
      Srikakulam: [
          "Amudalavalasa",
          "Gara",
          "Heeramandalam",
          "Ichapuram",
          "Kanchili",
          "Kothabommali",
          "Kothuru",
          "Kunduru",
          "Laveru",
          "Mandasa",
          "Meliaputti",
          "Nandigaon",
          "Palakonda",
          "Palasa",
          "Patapatnam",
          "Polaki",
          "Rajam",
          "Santabommali",
          "Saravakota",
          "Seetampeta",
          "Sompeta",
          "Srikakulam",
          "Tekkali",
          "Veeraghattam"
      ],
      Visakhapatnam: [
          "Kotauratla",
          "Koyyuru",
          "Nakkalli",
          "Paderu",
          "Peddabayalu",
          "Pendurti",
          "Rambilli",
          "Ravikamatam",
          "Rolugunta",
          "S.Rayavaram",
          "Visakhapatnam(U)",
          "Yelamanchili"
      ],
      Vizianagaram: [
          "Badangi",
          "Balijipeta",
          "Bhogapuram",
          "Bobbili",
          "Bondapalle",
          "Dattirajera",
          "Denkada",
          "Gantyada",
          "Makkuva",
          "Merakamudidam",
          "Parvatipuram",
          "Puspatirega",
          "Ramabhadrapuram",
          "Saluru",
          "Seetanagaram",
          "Srungavarapukota",
          "Therlam",
          "Vizianagaram"
      ]
  },
};

const SelectBlock = ({ id, triggerNextStep }) => {
  const [blockOptions, setBlockOptions] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const { district, state , setBlock} = useContext(GlobalContext);

  useEffect(() => {
    if (state && district && options[state] && options[state][district]) {
      const blocks = options[state][district].map((block) => ({
        value: block,
        label: block,
      }));
      setBlockOptions(blocks);
    } else {
      setBlockOptions([]);
    }
    setSelectedBlock(null); 
  }, [state, district]);

  const handleChange = (selectedOption) => {
    setSelectedBlock(selectedOption ? selectedOption.value : null);
  };

  const handleSubmit = () => {
    if (selectedBlock) {
      setIsDisabled(true);
      setBlock(selectedBlock)
      if(id === 1)
        triggerNextStep({ value: selectedBlock, trigger: '7' });
      else  
        triggerNextStep({ value: selectedBlock, trigger: '18' });
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
        options={blockOptions}
        value={blockOptions.find((option) => option.value === selectedBlock)}
        onChange={handleChange}
        isClearable={true}
        isDisabled={isDisabled || blockOptions.length === 0}
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
export default SelectBlock;
