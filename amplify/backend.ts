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

// override user pool password policies
backend.auth.resources.cfnResources.cfnUserPool.addPropertyOverride(
  'Policies',
  {
    PasswordPolicy: {
      MinimumLength: 8,
      RequireLowercase: true,
      RequireNumbers: true,
      RequireSymbols: true,
      RequireUppercase: true,
      TemporaryPasswordValidityDays: 20
    }
  }
);