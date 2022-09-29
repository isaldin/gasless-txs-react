import { ContractName } from './call-contract';
import { AccountAddress } from '../../types/common';

export const contractAddressesMap: { [key in ContractName]: AccountAddress } = {
  minERC20: '',
  disperse: '0xD152f549545093347A162Dce210e7293f1452150',
  biconomy_disperse: '0x9906c29F66C7688B71D481B115cb9B3e46f6F7aD',
};
