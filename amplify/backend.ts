import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

// defineBackend({
//  auth,
//  data,
// });

const backend = defineBackend({
  auth,
  data,
});

// extract L1 CfnUserPool resources
const { cfnUserPool } = backend.auth.resources.cfnResources;
// modify cfnUserPool policies directly
cfnUserPool.policies = {
  passwordPolicy: {
    minimumLength: 10,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: true,
    requireUppercase: true,
    temporaryPasswordValidityDays: 20,
  },
};

cfnUserPool.userPoolAddOns = {
  advancedSecurityMode: 'ENFORCED',
};

const { cfnUserPoolRiskConfigurationAttachment } = backend.auth.resources.cfnResources;
cfnUserPoolRiskConfigurationAttachment.riskExceptionConfiguration = {
  blockedIpRangeList: ['27.0.3.144/28'],
};

// const { cfnUserPoolRiskConfigurationAttachment } = backend.auth.resources.cfnResources;
// cfnUserPoolRiskConfigurationAttachment.addDependsOn(cfnUserPool);
//cfnUserPoolRiskConfigurationAttachment.riskExceptionConfiguration = {
//  blockedIpRangeList: ['127.0.0.1/32'],
//};


// override user pool password policies
// backend.auth.resources.cfnResources.cfnUserPool.addPropertyOverride(
//   'Policies',
//   {
//     PasswordPolicy: {
//       MinimumLength: 8,
//       RequireLowercase: true,
//       RequireNumbers: true,
//       RequireSymbols: true,
//       RequireUppercase: true,
//       TemporaryPasswordValidityDays: 20
//     }
//   }
// );

// backend.auth.resources.cfnResources.cfnUserPool.addPropertyOverride(
//   'userPoolAddOns',
//   {
//     advancedSecurityMode: 'ENFORCED'
//   }
// );