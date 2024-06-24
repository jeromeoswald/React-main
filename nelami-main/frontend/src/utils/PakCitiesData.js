// utils/dropListFunctions.js

import { nanoid } from 'nanoid';

const generateId = () => nanoid(10);

const getAllCitiesDropList = (data) => {
  return data?.allCitiesList?.map((city) => (
    <option key={generateId()} value={city}>
      {city}
    </option>
  ));
};

const getProvinceDropList = (data) => {
  return data?.provinceList?.map((province) => (
    <option key={generateId()} value={province}>
      {province}
    </option>
  ));
};

const getPunjabCitiesDropList = (data) => {
  return data?.punjabCitiesList?.map((city) => (
    <option key={generateId()} value={city}>
      {city}
    </option>
  ));
};

const getSindhCitiesDropList = (data) => {
  return data?.sindhCitiesList?.map((city) => (
    <option key={generateId()} value={city}>
      {city}
    </option>
  ));
};

const getBalochistanCitiesDropList = (data) => {
  return data?.balochistanCitiesList?.map((city) => (
    <option key={generateId()} value={city}>
      {city}
    </option>
  ));
};

const getKPKCitiesDropList = (data) => {
  return data?.kpkCitiesList?.map((city) => (
    <option key={generateId()} value={city}>
      {city}
    </option>
  ));
};

const getAzadKashmirCitiesDropList = (data) => {
  return data?.azadKashmirCitiesList?.map((city) => (
    <option key={generateId()} value={city}>
      {city}
    </option>
  ));
};

const getNorthernAreasCitiesDropList = (data) => {
  return data?.northernAreasList?.map((city) => (
    <option key={generateId()} value={city}>
      {city}
    </option>
  ));
};

const getIslamabadSectorsDropList = (data) => {
  return data?.islamabadSectorsList?.map((sector) => (
    <option key={generateId()} value={sector}>
      {sector}
    </option>
  ));
};

export {
  getAllCitiesDropList,
  getProvinceDropList,
  getPunjabCitiesDropList,
  getSindhCitiesDropList,
  getBalochistanCitiesDropList,
  getKPKCitiesDropList,
  getAzadKashmirCitiesDropList,
  getNorthernAreasCitiesDropList,
  getIslamabadSectorsDropList,
};
