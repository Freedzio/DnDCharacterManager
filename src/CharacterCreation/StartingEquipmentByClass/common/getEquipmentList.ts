import apiWrapper from "../../../common/functions/apiWrapper";
import { ApiConfig } from "../../../common/constants/ApiConfig";

export default async function getEquipmentList(category: string) {
  const response =  await apiWrapper(ApiConfig.equipmentCategory(category));
  const equipment = (await response).equipment
  return await equipment
};